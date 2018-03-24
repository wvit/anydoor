
const cache=require('../config/defaultConfig').cache;
function refreshRes(stats,res){
  const maxAge=cache.maxAge;
  const cacheControl=cache.cacheControl;
  const etag=cache.etag;
  const expires=cache.expires;
  const lastModified=cache.lastModified;

  if(expires){
    res.setHeader('expires',(new Date(Date.now()+maxAge*1000)).toUTCString());
  }
  if(cacheControl){
    res.setHeader('Cache-Control','public,max-age='+maxAge);
  }
  if(lastModified){
    res.setHeader('Last-Modified',stats.mtime.toUTCString());
  }
  if(etag){
    res.setHeader('Etag',stats.size+'-'+stats.mtime);
  }
}
module.exports=function isFresh(stats,req,res){
  refreshRes(stats,res);

  const lastModified=req.headers['if-modified-since'];
  const etag=req.headers['if-none-match'];

  if(!lastModified&&!etag||lastModified&&lastModified !== res.getHeader('Last-Modified')||etag&&etag !== res.getHeader('ETag')){
    return false;
  }

  return true;
}