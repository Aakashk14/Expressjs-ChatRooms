const express = require('express');

const host='0.0.0.0';
const app = require('express')();

const server = app.listen(3000,host);
const session= require('express-session');
const path = require("path");

app.use(express.static("css"));
const db= require('./Main/db.js');
const sql = require("mysql");
const main = require('./Main/main');

global.sessionMiddleware=(session({
    secret:"my app",
    resave:false,
    cookie:{save:true},
    saveUninitialized:false


}))
app.use(sessionMiddleware);
var Host = '0.0.0.0';

 const io = require("socket.io")(server);
 var name;
 var room_name=0;
 var reference;


app.get("/", async function(req,res){
    res.sendFile(path.join(__dirname,"view","index.html"));
})


var join=0;

module.exports={
    name,reference,room_name
}

app.use("/auth",main.check);
app.get("/auth",main.auth);
app.get("/ChangePage",main.change);
app.get("/home",(req,res)=>{
    res.redirect("/")

})
app.use("/index/:room",(req,res,next)=>{
    if(!req.session.room_name){
        req.session.reference=11;
        req.session.room_name=req.params.room
        res.redirect("/")
    }else{
        next();
    }

});
app.get("/index/:room",(req,res)=>{
    req.session.room_name=req.params.room
    
    res.sendFile(path.join(__dirname,"view","chat.html"));
})

require("./Main/socket")(io);
