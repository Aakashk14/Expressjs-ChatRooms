function html(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
module.exports=function(io){
    var Sv = require('../app.js');
    io.use(function(socket, next) {
       
        sessionMiddleware(socket.request, {}, next);
    })
 
    
    io.on('connection',(socket)=>{
        socket.join(socket.request.session.room_name);
    
socket.on("message",(message)=>{
    msg = html(message);
socket.broadcast.to(socket.request.session.room_name).emit("message",{message:msg,name:socket.request.session.name});

})})
}

