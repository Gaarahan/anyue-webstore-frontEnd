let token = window.localStorage.getItem('token');
function resolveToken(){
  if(token !== null)
    return window.atob(token.split('.')[1]);
  else
    return false;
}
let payload = resolveToken();
let loginEle = $('#un-login');
if(loginEle && payload){
  let data = JSON.parse(payload);

  loginEle.hide();
  $("#in-login").html(

      ` 欢迎你，<span>${data['userName']}</span>
      <ul class="login-menu">
        <li id="messagePage"><a href="/page/message.html">个人信息</a></li>
        <li id="myCart"><a href='/page/myCart?token=${token}'>我的购物车</li>
        <li id="myOrder"><a href="/page/myOrder?token=${token}">我的订单</a></li>
        <li id="exitLogin"><a href="#">退出登录</a></li>
      </ul>`);
}

/**
 * 展示购物车
 * 点击按钮，get跳转页面，url为/myCart?token=token...
 */
/**
 * 退出登录
 */
function exitLogin(){
  console.log('exit');
  window.localStorage.clear();
  window.location.reload();
}
$(()=>{
  let loginSpan = $('#in-login span');
  loginSpan.on('mouseover',(e)=>{
    e.target.style.textDecoration = 'underline';
  });
  loginSpan.on('mouseout',(e)=>{
    e.target.style.textDecoration = 'none';
  });
  loginSpan.on('click',()=>{
    $('#in-login ul').toggle(500);
  });
  $('#exitLogin').on('click',exitLogin);
});
