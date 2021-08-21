
const sql = require("mysql");
const { room_name } = require("../app");
console.log(room_name)

var database = sql.createConnection({
  host:'127.0.0.1',
  user:'',
  database:'',
  password:'',
  port:3306,

})
database.connect((err)=>{
   if(err) throw err;
   console.log("connected")
});

function entry(unique_room,username){
  database.query("Select * from private where username=?",[username],(err,rows)=>{

    if(rows.length!=0){
      database.query("update private set rooms=? where username=?",[unique_room,username])
    }else{
database.query("Insert into private(rooms,username)values(?,?)",[unique_room,username],(err)=>{
  
  if(err) console.log(err)
})}})};

function unique(str){
  return new Promise(function(resolve,reject){

  database.query('Select users from online where users=?',[str],(err,rows)=>{
    console.log(rows);
    if(rows.length > 0 ){
      resolve(0);

    }else{

      resolve(1);
    }
    if(err){ 
      console.log(err);
      reject();
    }})})
};

function search(username){
  return new Promise(function(resolve,reject){
  database.query("Select rooms from private where username=?",[username],(err,rows)=>{
  if(rows.length==0){
    resolve(0)
  }else { 
  resolve(rows[0].rooms)

  }
if(err){ reject()}
})})}


function check(username,password){

  return new Promise(function(resolve,reject){

    database.query('Select * from login where name=?',[username],(err,rows)=>{

      if(rows.length > 0){
        database.query('Select * from login where name=? and password=?',[username,password],(err,rows)=>{
          if(rows.length>0){
            resolve(1)
          }else{
            resolve(0)
          }})
      }else{
        database.query("Insert into login(name,password)values(?,?)",[username,password],(err)=>{
          if(err)console.log(err)})
        resolve(1)
      }
    })
  })
}


module.exports={
  entry:entry,
  check:check,
  search:search,
  unique:unique
}