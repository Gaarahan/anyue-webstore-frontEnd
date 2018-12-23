const express = require('express');
const router = express.Router();
const http = require('http');
const ejs = require('ejs');

const backEndCon = require('../util/backEndConnect');

//分类查询
router.get('/searchClass',(req,res)=>{
  let searchName = req.url.split('=')[1].split('&')[0];
  let urlNum = req.url.split('=')[2];
  let pageNum = urlNum?urlNum:1;
  //发起查询请求
  let option = backEndCon(`/ayms/search/goodsList?goodsName=${searchName}&page=${pageNum}`,"GET");
  let request = http.request(option,(response)=>{
    let resData  = "";
    response.on('data',(chunk)=>{resData+=chunk});
    response.on('end',()=>{
      //获取查询，并渲染查询页面
      resData = JSON.parse(resData);
      if(resData['status'] === '302'){
        res.redirect('/page/login.html');
        return;
      }
      resData['pageBean'].className = req.query['className'];
      ejs.renderFile("./static/page/searchClass.ejs",{data:resData['pageBean']},(err,str)=>{
        if(err) {
          console.log(`renderFile err:\n`);
          throw err;
        }
        res.send(str);
      });
    });
    response.on('err',(err)=>{
      console.log(`something error :\n ${err.errorCode}`);
      throw err;
    })
  });

  request.end();
});
//商品详情
router.get("/detail",(req,res)=>{
  let goodID = req.query['goodId'];
  let option = backEndCon(`/ayms/comm/getCommInfo?id=${goodID}`);

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode !== 200){
      console.log("something wrong when get goods info");
    }
    else{
      //获取信息状态
      let goodData = "";
      response.on('data',(chunk)=>{goodData += chunk;});
      response.on('end',()=>{
        goodData = JSON.parse(goodData);
        //处理返回的商品数据
        let {commodity,status} = goodData;
        if(status !== 200){
          //返回无对应商品信息
          res.send(`<h2 style="text-align: center">无对应商品信息</h2>`)
        }
        else{
          //渲染并返回商品详情页
          ejs.renderFile('./static/page/detail.ejs',{data:commodity},(err,str)=>{
            if(err){
              console.log(`${err}`);
            }
            res.send(str);
          });
        }
      });
      response.on('error',(err)=>{
        console.log(`error when get good Info:${err}`);
      })
    }
  });
  request.end();
});
//购物车
router.get('/myCart',(req,res)=>{
  let token = req.query['token'];
  if(token === null || token === undefined){
    res.redirect('/page/login.html');
  }

  let option = backEndCon('/ayms/cart/getAllGoods','GET');
  option.headers.Authorization = token;
  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode !== 200){
      res.send(`someThing was Wrong: ${statusCode}`);
    }
    let cartData = "";
    response.on('data',(chunk)=>{ cartData+=chunk; });
    response.on('end',()=>{
      cartData = JSON.parse(cartData);
      let {status} = cartData;
      if(status === '302'){
        res.redirect('/page/login.html');
        return ;
      }
      let cartGoods = cartData['cart']['cartGoods'];
      ejs.renderFile('./static/page/myCart.ejs',{data:cartGoods},(err,str)=>{
        if(err){
          console.log(`${err}`);
        }
        res.send(str);
      })
    });
    response.on('error',(err)=>{
      res.send(`someThing was Wrong: ${err.code}`);
    })
  });
  request.end();
});
//我的订单
router.get('/myOrder',(req,res)=>{
  let token = req.query['token'];
  if(token === null || token === undefined){
    res.redirect('/page/login.html');
  }

  let option = backEndCon('/ayms/order/showOrder','GET');
  option.headers.Authorization = token;
  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode !== 200){
      res.send(`someThing was Wrong: ${statusCode}`);
    }
    let orderData= "";
    response.on('data',(chunk)=>{orderData+=chunk; });
    response.on('end',()=>{
      orderData = JSON.parse(orderData);
      let {status} = orderData;
      if(status === '302'){
        res.redirect('/page/login.html');
        return ;
      }
      let orderList = orderData['orderList'];
      ejs.renderFile('./static/page/order.ejs',{data:orderList},(err,str)=>{
        if(err){
          console.log(`${err}`);
        }
        res.send(str);
      })
    });
    response.on('error',(err)=>{
      res.send(`someThing was Wrong: ${err.code}`);
    })
  });
  request.end();
});

module.exports = router;
