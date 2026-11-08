const crypto=require('crypto');
function sign(){return crypto.createHmac('sha256',process.env.SESSION_SECRET||process.env.ADMIN_PASSWORD||'change-this-secret').update('streamingarg-admin').digest('hex')}
function setCookie(res){res.setHeader('Set-Cookie',`streamarg_session=${sign()}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`)}
function isAdmin(req){const c=(req.headers.cookie||'').split(';').map(x=>x.trim());const token=c.find(x=>x.startsWith('streamarg_session='))?.split('=')[1]||'';return token.length===sign().length&&crypto.timingSafeEqual(Buffer.from(token),Buffer.from(sign()))}
module.exports={setCookie,isAdmin};
