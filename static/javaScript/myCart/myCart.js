$(function(){
  let selectAllBtn = $("img.selectAll");
  $("img.selectSingle").on('click',function(){
    const select = $(this).attr("select");
    if(select === "select"){
      $(this).attr("src", "../resource/img/myCart/cartNotSelected.jpg");
      $(this).attr("select", "false");
      $("a.allProduct").css("color", "#C40000");
      $("div.cartProductItemDIV").css("background-color", "#fff");
    }
    else{
      $(this).attr("src", "../resource/img/myCart/cartSelected.jpg");
      $(this).attr("select", "select");
      $("div.cartProductItemDIV").css("background-color", "#FFF8E1");
    }
    isSelectAll();
    synSettleButton();
    countPrice();
  });
  selectAllBtn .on('click',function(){
    const select = $(this).attr("select");
    if("select" === select){
      selectAllBtn .attr("src", "../resource/img/myCart/cartNotSelected.jpg");
      $("img.selectAll").attr("select", "false");
      $(".selectSingle").each(function(){
        $(this).attr("src", "../resource/img/myCart/cartNotSelected.jpg");
        $(this).attr("select", "false");
        $("div.cartProductItemDIV").css("background-color", "#fff");
      });
    }
    else{
      selectAllBtn .attr("src", "../resource/img/myCart/cartSelected.jpg");
      selectAllBtn .attr("select", "select");
      $(".selectSingle").each(function(){
        $(this).attr("src", "../resource/img/myCart/cartSelected.jpg");
        $(this).attr("select", "select");
        $("div.cartProductItemDIV").css("background-color", "#FFF8E1");
      });
    }
    synSettleButton();
    countPrice();
  });

  // TODO 去结算
  $('.settleButton').on('click',()=>{
    let ele = countPrice();
    let itemList = [];
    ele.each((index,item)=>{
      let singleItem = {};
      let parEle = $(item).parent();
      singleItem.commId = parEle.find('#commId').text();
      singleItem.commColor = parEle.find('.c3 ul li:nth-child(1)').text().split(':')[1];
      singleItem.commSize = parEle.find('.c3 ul li:nth-child(2)').text().split(':')[1];
      singleItem.itemNum = parseInt(parEle.find('#num-input').val());
      singleItem.itemPrice = parseInt(parEle.find('.singleOrderSumPrice').text().replace('￥',''));

      itemList.push(singleItem);
    });
    let token = window.localStorage.getItem('token');
    let dataStr = JSON.stringify({itemList});

    let option = {
      url : '/reqData/addOrder',
      data :dataStr,
      method : 'POST',
      headers : {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      },
      error : ()=>{ alert(`出错了，请刷新重试`); },
      success: (result)=>{
        console.log(result);
        if(result === 'logOut'){
          alert('登录过期');
          window.localStorage.clear();
          window.location.href = '/page/login.html';
        }
        else if(result === 'false'){
          alert('出错了，请刷新重试');
        }
        else{
          alert('正在前往支付页面');
          document.cookie = `orderID=${result}`;
          window.location.href = '/page/buy.html';
        }
      }
    };
    $.ajax(option).then(()=>{});
  });
});

function countPrice(){
  let eleSelected = $('#m4 img').filter((index,item)=>{
    return $(item).attr('select') === "select";
  });
  let priceCount = 0;
  eleSelected.each((index,item)=>{
    let priceC =  $(item).parent();
    let priceNum = priceC.find('.singleOrderSumPrice').text().replace('￥','');
    priceCount += parseInt(priceNum);
  });
  $('.cartSumPrice').text(`￥ ${formatMoney(priceCount)}`);

  return eleSelected;
}
function formatMoney(num){
  num = num.toString().replace(/[$,]/g,'');
  if(isNaN(num))
    num = "0";
  num = Math.floor(num*100+0.50000000001);
  let cents = num % 100;
  num = Math.floor(num/100).toString();
  if(cents<10)
    cents = "0" + cents;
  for (let i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
        num.substring(num.length-(4*i+3));
  return (num + '.' + cents);
}
function isSelectAll(){
  let selectAll = true;
  let selectAllBtn = $("img.selectAll");
  $(".selectSingle").each(function(){
    if("false" === $(this).attr("select")){
      selectAll = false;
    }
  });
  if(selectAll){
    selectAllBtn.attr("src", "../resource/img/myCart/cartSelected.jpg");
  }
  else{
    selectAllBtn.attr("src", "../resource/img/myCart/cartNotSelected.jpg");
  }
}
function synSettleButton(){
  let selectAny = false;
  let settleBtn = $('button.settleButton');
  $(".selectSingle").each(function(){
    if("select" === $(this).attr("select")){
      selectAny = true;
    }
  });
  if(selectAny){
    settleBtn.css("background-color", "#C40000");
    settleBtn.removeAttr("disabled");
  }
  else{
    settleBtn.css("background-color", "#AAAAAA");
    settleBtn.attr("disabled", "disabled");
  }
}

