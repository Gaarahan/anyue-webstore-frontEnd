const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const frontEnd =require('./route/frontEnd');
const backEnd = require('./route/backEnd');

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/static/page/index.html'));
});

// front-end pages
app.use('/page',frontEnd);

//request Data
app.use('/reqData',backEnd);
app.listen(8848,()=>{
  console.log("server on http://localhost:8848  ...");
});