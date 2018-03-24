
const path=require('path');

const fileType={
  'txt':'text/plain',
  'html':'text/html',
  'js':'text/javascript',
  'css':'text/css',
  'json':'application/json'
}
module.exports=(filename)=>{
  let ext=path.extname(filename).split('.').pop().toLowerCase();
  if(!ext){
    ext=filename;
  }
  return fileType[ext]||fileType.txt;
}