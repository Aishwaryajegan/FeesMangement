const express = require('express');
const mongoose = require('mongoose');


 const cors = require('cors');
 const path = require('path');
const StudentRouter = require('./StudentRouter');
const  StudentdRouter =require('./StudentdetRouter');

const app= express()
port =3003
app.use(express.json());
app.use(cors());

app.use('/studentuploads', express.static(path.join(__dirname, 'studentuploads')));

app.listen(port,()=>{
    console.log("your server is connected",port)
})

main().catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/online');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.use('/students',StudentRouter)
app.use('/studentdetail',StudentdRouter)

 