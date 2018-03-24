
const http=require('http');
const defaultConfig=require('./config/defaultConfig');
const chalk=require('chalk');
const path=require('path');
const route=require('./helper/router');
const openUrl=require('./helper/openUrl');

class Server{
  constructor (config){
    this.conf=Object.assign({},defaultConfig,config);
  }
  start(){
    const server=http.createServer((req,res)=>{
      let filePath=path.join(this.conf.root,req.url);
      route(req,res,filePath,this.conf);
    })
    server.listen(this.conf.port,this.conf.hostname,()=>{
      const info='http://'+this.conf.hostname+':'+this.conf.port;
      console.log(chalk.green(info));
      openUrl(info);
    });
  }

}
module.exports=Server;