$(()=>{
  window.localStorage.clear();
  $("#submit").on('click',()=>{
    let userNameEle = $('#username');
    let passWordEle = $('#password');
    let userName = userNameEle.val().trim();
    let passWord = passWordEle.val().trim();
    let titleEle = $('.form-group').last();

    if(userName === "" || userName === null){
      userNameEle.trigger('focus');
    }
    else if(passWord === "" || passWord === null){
      passWordEle.trigger('focus');
    }
    else{
      let data = {
        userName,
        passWord
      };

      $.post("/reqData/login",data,(data,status)=>{
        if(status !== "success"){
          alert("登录失败，请重试");
        }
        else{
          if(data['status'] === "false"){
            addTips(titleEle,data['mes']);
          }
          else{
            //将token存储在localStorage中
            window.localStorage.setItem('token',data);
            window.location.href = "/page/index.html";
          }
        }
      });
    }
  })
});
