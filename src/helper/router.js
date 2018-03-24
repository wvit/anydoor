
const fs=require('fs');
const path=require('path');
const handlebars=require('handlebars');
const promisify=require('util').promisify;
const contentType=require('./mime');
const compress=require('./compress');
const range=require('./range');
//const config=require('../config/defaultConfig');
const isFresh=require('./cache');

const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
const tplPath=path.join(__dirname,'../template/dir.html');
const source=fs.readFileSync(tplPath);
const template=handlebars.compile(source.toString());

module.exports=async function(req,res,filePath,config){
  try{
    const stats=await stat(filePath);
    if(stats.isFile()){
      res.statusCode=200;
      res.setHeader('Content-Type',contentType(filePath)+';charset=UTF-8');
      if(isFresh(stats,req,res)){
        res.statusCode=304;
        res.end();
        return;
      }

      let fr=null;
      const code=range(stats.size,req,res).code;
      const start=range(stats.size,req,res).start;
      const end=range(stats.size,req,res).end;
      if(code===200){
        res.statusCode=200;
        fr=fs.createReadStream(filePath);
      }else{
        res.statusCode=206;
        fr=fs.createReadStream(filePath,{start:start,end:end});
      }

      if(filePath.match(config.compress)){
        fr=compress(fr,req,res);
      }
      fr.pipe(res);
     }else if(stats.isDirectory()){
      const files=await readdir(filePath);
      res.statusCode=200;
      res.setHeader('Content-Type','text/html');
      const dir=path.relative(config.root,filePath);
      const data={
        files:files,
        dir:dir?'/'+dir:'',
        title:path.basename(filePath)
      }
      res.end(template(data));
     }
  }catch(err){
    if(err){
      res.statusCode=404;
      res.setHeader('Content-Type',contentType(filePath)+';charset=UTF-8');
      res.end('出错了');
      console.log(err)
    }
  }
}