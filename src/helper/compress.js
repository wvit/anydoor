
const zlib=require('zlib');
const fileGzip=zlib.createGzip;
const fileDeflate=zlib.createDeflate;

module.exports=(file,req,res)=>{
  const acceptEncoding=req.headers['accept-encoding'];
  if(!acceptEncoding||!acceptEncoding.match(/\b(gzip|deflate)\b/)){
    return file;
  }else if(acceptEncoding.match(/\bgzip\b/)){
    res.setHeader('Content-Encoding','gzip');
    return file.pipe(fileGzip());
  }else if(acceptEncoding.match(/\bdeflate\b/)){
    res.setHeader('Content-Encoding','deflate');
    return file.pipe(fileDeflate());
  }
}