const db= require('./db');
const socket = require('./socket');
var Sv = require('../app.js');  

var rnd;
// Random  String generator
const generaterand = async()=>{
var string = "abcdefghijklmnopqrstuvwxyz1234567890"
var str="";
              
      for(let i=0;i<10;i++){
         var rand = (Math.random()*36).toString().split(".");
         str = str + string[rand[0]];
}
let value;
 await db.unique(str).then(function(result){ value = result;});
if(value==1){
return str;
}else{
   generaterand()
}
}



   module.exports.change=async(req,res)=>{
      generaterand().then(function(result){
         req.session.room_name=result;
         db.entry(req.session.room_name,req.session.name);
         res.redirect(`/index/${req.session.room_name}`);
      })
   }

module.exports.auth=async(req,res)=>{
   let val;
   await db.search(req.session.name).then(
      function(result){val=result})
      if(val!=0){
         req.session.room_name=val
         res.redirect(`/index/${val}`);
      }else{
         generaterand().then(function(result){
            req.session.room_name=result;
            db.entry(req.session.room_name,req.session.name);
            res.redirect(`/index/${req.session.room_name}`);
         })
      }

}
    module.exports.check=async(req,res,next)=>{
       req.session.name=req.query.username;
       await db.check(req.query.username,req.query.password)
       .then(function(result){
          if(result==0){
             res.send("error");
          }else {
             if(req.session.room_name){
                res.redirect(`/index/${req.session.room_name}`)
             }else{
                next();
             }

            }})};
   