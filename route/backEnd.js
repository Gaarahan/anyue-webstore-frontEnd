const express = require('express');
const router = express.Router();

const http = require('http');
const backEndCon = require('../util/backEndConnect');

//back-end data
router.post('/register',(req,res)=>{
  //获取需要转发的数据
  let data = JSON.stringify(req.body);

  let option = backEndCon("/ayms/user/register");
  let request = http.request(option, (response) => {
    const {statusCode} = res;
    if(statusCode === 200){
      let responseData = ""; response.on('data',(chunk)=>{ responseData += chunk; });
      response.on("end",()=>{
        responseData = JSON.parse(responseData);

        if(responseData['message'] === "true"){
          res.send(responseData['message']);
        }
        else res.send("false");
      });
    }
    else{
      res.send("error");
    }
  });

  request.write(data);
  request.end();
});
router.post('/nameExist',(req,res)=>{
  let data = JSON.stringify(req.body);

  let option = backEndCon("/ayms/user/isNameExist");
  let request = http.request(option,(response)=>{
    const {statusCode} = response;
    if(statusCode === 200){
      let responseData = "";
      response.on('data',(chunk)=>{ responseData += chunk; });
      response.on("end",()=>{
        responseData = JSON.parse(responseData);
        if(responseData['status'] === 201){
          res.send('exist');
        }else res.send('noExist');
      });
    }
    else{
      res.send("error");
    }
  });

  request.write(data);
  request.end();
});
router.post('/login',(req,res)=>{
  let loginData = JSON.stringify(req.body);
  let option =  backEndCon("/ayms/user/login");

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = '';
      response.on('data',(chunk)=>{ resData += chunk; });
      response.on('end',()=>{
        resData = JSON.parse(resData);
        let {status} = resData;
        if(status === 202){
          res.send({status:'false',mes:resData['message']});
        }
        //获取token并处理
        else if(status === 200){
          let {token} = resData;
          res.send(token);
        }
      })
    }
  });
  request.write(loginData);
  request.end();
});
router.post('/addCart',(req,res)=>{
  let data = JSON.stringify(req.body);
  let token = req.header('Authorization');

  let option = backEndCon('/ayms/cart/addGoods');
  option['headers'].Authorization = token;

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      //加入购物车成功
      res.send('true');
    }
    else if(statusCode === 302){
      res.send('logOut');
    }
    else{
      res.send('false');
    }
  });
  request.write(data);
  request.end();
});
router.post('/addOrder',(req,res)=>{
  let data = JSON.stringify(req.body);
  let token = req.header('Authorization');

  let option = backEndCon('/ayms/order/createOrder');
  option['headers'].Authorization = token;

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        let {status} = resData;
        if(status === 302){
          res.send('logOut');
        }
        if(status === 200){
          res.send(`${resData['orderId']}`);
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.write(data);
  request.end();
});
router.post('/addAddress',(req,res)=>{
  let data = JSON.stringify(req.body);
  let token = req.header('Authorization');

  let option = backEndCon('/ayms/address/addAddress');
  option['headers'].Authorization = token;

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        let {status} = resData;
        if(status === 302){
          res.send('logOut');
        }
        if(status === 200){
          res.send('200');
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.write(data);
  request.end();
});
router.post('/delAddress',(req,res)=>{
  let data = JSON.stringify(req.body);
  let token = req.header('Authorization');

  let option = backEndCon('/ayms/address/deleteAddress');
  option['headers'].Authorization = token;

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        let {status} = resData;
        if(status === 302){
          res.send('logOut');
        }
        if(status === 200){
          res.send('200');
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.write(data);
  request.end();
});
router.post('/updateAddress',(req,res)=>{
  let data = JSON.stringify(req.body);
  let token = req.header('Authorization');

  let option = backEndCon('/ayms/user/updateAllInfo');
  option['headers'].Authorization = token;

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        let {status} = resData;
        if(status === 302){
          res.send('logOut');
        }
        if(status === 200){
          res.send('200');
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.write(data);
  request.end();
});
router.post('/cancelOrder',(req,res)=>{
  let data = JSON.stringify(req.body);
  let token = req.header('Authorization');

  console.log(data);
  let option = backEndCon('/ayms/order/cancelOrder');
  option['headers'].Authorization = token;

  console.log(option);
  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    console.log(statusCode);
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        console.log(resData);
        let {status} = resData;
        if(status === '302'){
          res.send('logOut');
        }
        if(status === 200){
          res.send('200');
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.write(data);
  request.end();
});

router.get('/showInfo',(req,res)=>{
  let token = req.header('Authorization');

  let option = backEndCon('/ayms/user/showAllInfo');
  option['headers'].Authorization = token;

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        let {status} = resData;
        if(status === '302'){
          res.send('logOut');
        }
        if(status === 200){
          res.send(resData['userInfo']);
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.end();
});
router.get('/perOrder',(req,res)=>{
  let data = req.query;
  let token = req.header('Authorization');

  let option = backEndCon(`/ayms/order/showOneOrder?orderId=${data['orderID']}`,'GET');
  option['headers'].Authorization = token;

  console.log(option);

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        console.log(resData);
        let {status} = resData;
        if(status === '302'){
          res.send('logOut');
        }
        if(status === 200){
          res.send(resData['order']);
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.end();
});
router.get('/buyOrder',(req,res)=>{
  let data = req.query;
  let token = req.header('Authorization');

  let option = backEndCon(`/ayms/order/paidOrder?orderId=${data['orderID']}&addressId=${data['addressId']}`,'GET');
  option['headers'].Authorization = token;

  console.log(option);

  let request = http.request(option,(response)=>{
    let {statusCode} = response;
    if(statusCode === 200){
      let resData = "";
      response.on('data',(chunk)=>{resData+=chunk});
      response.on('end',()=>{
        resData = JSON.parse(resData);
        console.log(resData);
        let {status} = resData;
        if(status === '302'){
          res.send('logOut');
        }
        if(status === 200){
          res.send(resData['order']);
        }
      });
      response.on('error',()=>{
        res.send('false');
      });
    }
  });
  request.end();
});



module.exports = router;