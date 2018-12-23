$(function(){
  $("a[orderStatus]").on('click',function(){
    const orderStatus = $(this).attr("orderStatus");
    if('all' === orderStatus){
      $("table[orderStatus]").show();
    }
    else{
      $("table[orderStatus]").hide();
      $("table[orderStatus="+orderStatus+"]").show();
    }
    $("div.orderType div").removeClass("selectedOrderType");
    $(this).parent("div").addClass("selectedOrderType");
  });
  $('#cancelBtn').on('click',cancelOrder);

});

// 只有待付款订单有取消订单的功能
function cancelOrder(e){
  e.preventDefault();
  let orderId = $(e.target).parents('.orderListItemFirstTR').find('#orderId').text();
  let token = window.localStorage.getItem('token');
  if(token === null){
    alert('请先登录');
    window.location.href = '/page/login.html';
    return;
  }

  let option = {
    url : '/reqData/cancelOrder',
    method : 'POST',
    data : JSON.stringify({'id' : orderId}),
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : token
    },
    success: (result)=>{
      if(result === 'logOut'){
        alert('登录身份过期,请重新登录');
        window.location.href = '/page/login.html';
      }
      else if(result === 'false'){
        alert('出错了，请重新尝试');
      }
      else if(result === '200'){
        alert('取消订单成功');
        window.location.reload();
      }
    },
    error:()=>{
      alert('出错了，请重新尝试');
    }
  };
  $.ajax(option).then(()=>{});

  console.log(orderId);
}