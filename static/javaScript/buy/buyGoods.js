function draw(result,address) {
  console.log(address);
  $('#orderId').text(result['id']);
  $('#userId').text(result['userId']);
  // 地址
  let addrBody = '';
  if(address.length !== 0) {
    for (let i = 0; i <address.length; i++) {
      if (i === 0) {
        addrBody += `
        <tr>
          <td >
            <input type="radio" name="select" title="" checked="checked">
            <span class="addrId" style="display: none;">${address[i]['id']}</span>
            <span>${address[i]['addrName']}</span>
            (<span>${address[i]['cnee']}</span>收)
            <b>${address[i]['addrPhone']}</b>
            <span style="display: inline-block;margin-left: 10px;opacity: .5">默认地址</span>
            <span style="display: inline-block;margin-left: 80px;"></span>
          </td>
        </tr>
      `;
      } else {
        addrBody += `
        <tr>
          <td >
            <input type="radio" name="select" title="" >
            <span> 陕西省 西安市 长安区 </span>
            (<span>小红红</span>收)
            <b>13423567832</b>
            <span style="display: inline-block;margin-left: 80px;"></span>
          </td>
        </tr>
      `;
      }
    }
  }else{
    addrBody =`<h3 style="text-align: center">您还没有收货地址，请前往个人信息页面填写</h3>`
  }
  $('#showAddress').html(addrBody);

  // 信息
  let commBody = '';
  let itemList = result['itemList'];
  let priceSum = 0;
  for(let i=0; i <itemList.length;i++){
    let priceCount = parseInt(itemList[i]['itemPrice'])*parseInt(itemList[i]['itemNum']);
    priceSum += priceCount;
    commBody += `
      <tr>
        <td style="width: 200px;padding: 5px"> <span id="commName">${itemList[i]['commName']}</span> </td>
        <td style="vertical-align:middle;"><span id="color">${itemList[i]['commColor']}</span></td>
        <td style="vertical-align:middle;"><span id="size">${itemList[i]['commSize']}</span></td>
        <td style="vertical-align:middle;"><span id="price">${itemList[i]['itemPrice']}</span></td>
        <td style="vertical-align:middle;"><span id="num">${itemList[i]['itemNum']}</span></td>
        <td style="vertical-align:middle;" class="money"><span id="priceCount">${priceCount}</span></td>
      </tr>
    `;
  }
  $('#commShow').append(commBody);
  $('#sum').text(`￥${priceSum}`);
}

function getAddressMes(orderMes) {
  let token = window.localStorage.getItem('token');
  if(token === null){
    alert('请先登录');
    window.location.href = '/page/login.html';
  }

  let option = {
    url: `/reqData/showInfo`,
    method: 'get',
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': token,
    },
    success: (result) => {
      if (result === 'logOut') {
        alert('登录身份过期,请重新登录');
        window.location.href = '/page/login.html';
      } else if (result === 'false') {
        alert('出错了，请重新尝试');
      } else {
        draw(orderMes,result['addressList']);
      }
    },
    error: () => {
      alert('出错了，请刷新重试');
    }
  };
  $.ajax(option).then(()=>{});
}

function getOrderMessage() {
  let token = window.localStorage.getItem('token');
  if(token === null){
    alert('请先登录');
    window.location.href = '/page/login.html';
  }
  //获取订单ID
  let orderID = CookieUtil.get('orderID');

  let option = {
    url:`/reqData/perOrder?orderID=${orderID}`,
    method : 'get',
    headers : {
      'Content-Type' : 'Application/json',
      'Authorization' : token,
    },
    success : (result)=>{
      if(result === 'logOut'){
        alert('登录身份过期,请重新登录');
        window.location.href = '/page/login.html';
      }
      else if(result === 'false'){
        alert('出错了，请重新尝试');
      }
      else{
        getAddressMes(result);
      }
    },
    error : ()=>{
      alert('出错了，请刷新重试');
    }
  };

  $.ajax(option).then(()=>{});
}

$(()=>{
  getOrderMessage();
  $('#submit').on('click',(e)=>{
    e.preventDefault();
    let token = window.localStorage.getItem('token');
    if(token === null){
      alert('请先登录');
      window.location.href = '/page/login.html';
    }
    let addrID =  0;
    $('.addrId').each((index,item)=>{
      let par = $(item).parent().find('input');
      if(par.attr('checked') === 'checked'){
        addrID = $(item).text();
        //获取订单ID
        let orderID = CookieUtil.get('orderID');

        //发送请求
        let option = {
          url:`/reqData/buyOrder?orderID=${orderID}&addressId=${addrID}`,
          method : 'get',
          headers : {
            'Content-Type' : 'Application/json',
            'Authorization' : token,
          },
          success : (result)=>{
            if(result === 'logOut'){
              alert('登录身份过期,请重新登录');
              window.location.href = '/page/login.html';
            }
            else if(result === 'false'){
              alert('出错了，请重新尝试');
            }
            else{
              alert('购买成功');
              let token = window.localStorage.getItem('token');
              window.location.href = `/page/myOrder?token=${token}`;
            }
          },
          error : ()=>{
            alert('出错了，请刷新重试');
          }
        };

        console.log(option);
        $.ajax(option).then(()=>{});


      }
    });
  })
});

//cookie
let CookieUtil = {
  get: function (name) {
    let cookieName = encodeURIComponent(name)+"=";
    let cookieStart = document.cookie.indexOf(cookieName);
    let cookieValue = null;
    if(cookieStart > -1) {
      let  cookieEnd = document.cookie.indexOf(";",cookieStart);

      if(cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
    }
    return cookieValue;
  },
  set:function (name,value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  }
};

//dom操作
function  setAddress(){
  //地址信息
  //收货人
  let Div = document.getElementById("showAddress");
  let td = Div.getElementsByTagName("td");
  let inputs = Div.getElementsByTagName("input");
  let getUser = document.getElementsByClassName("getUser")[0];
  let getAddress = document.getElementsByClassName("getAddress")[0];
  for(let i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
      for(let j = 0; j < inputs.length; j++) {
        inputs[j].checked = false;
      }
      this.checked = true;
      for (let i =0; i < inputs.length; i++) {
        if(inputs[i].checked === true) {
          let sendFormation = td[i].getElementsByTagName("span");
          getAddress.innerText = sendFormation[0].innerText;
          getUser.innerText = sendFormation[1].innerText;
        }
      }
    };
  }
}


