
const exec=require('child_process').exec;
module.exports=(url)=>{
  switch(process.platform){
   case 'darwin':
   exec('open '+url);
   break;
   case 'linux':
   exec('xdg-open '+url);
   break;
   case 'win32':
   exec('start '+url);
   break;
  }
}