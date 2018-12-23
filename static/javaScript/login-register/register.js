$(()=>{
  //检测用户名可用性
  $("#username").on('blur',()=>{
    let userName = $('#username').val();
    if(userName.trim() === "" || userName.trim() === null){ return false; };
    let nameData= {
      userName
    };
    $.post('/reqData/nameExist',nameData,(data)=>{
      if(data === "exist"){
        addTips($("#username"),"用户名已被使用,换一个试试吧");
      }
      else if(data === "noExist"){
        $(".tips").remove();
      }
    })
  });

  //检测两次密码是否相等
  $("#secPasswd").on('blur',()=>{
    let passWordEle = $("#password");
    let secPassWordEle = $("#secPasswd");

    let passWord = passWordEle.val().trim();
    let secPassWord = secPassWordEle.val().trim();

    if(passWord !== secPassWord){
      addTips(passWordEle,"前后密码不一致");
    }
    else if(passWord === secPassWord){
      $('.tips').remove();
    }
  });

  //检测表单,并提交
  $("#submit").on('click',()=>{
    let userNameEle = $("#username");
    let userSexEle = $("#sex");
    let passWordEle = $("#password");
    let secPassWordEle = $("#secPasswd");
    let userEmailEle = $("#email");
    let userPhoneEle = $("#telephone");

    let userName = userNameEle.val().trim();
    let userSex = userSexEle.val().trim();
    let passWord = passWordEle.val().trim();
    let secPassWord = secPassWordEle.val().trim();
    let userEmail = userEmailEle.val().trim();
    let userPhone = userPhoneEle.val().trim();
    let userAge = Math.ceil(Math.random()*25) + 20; //20~45

    let emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    let nameReg = /[^a-zA-Z0-9_]/;
    let phoneReg = /^1[34578]\d{9}$/;

    if(userName.length < 5 || userName.length > 15 || userName === "" ||
        userName === null || nameReg.test(userName)){
      addTips(userNameEle,"用户名必须为5~15位的数字字母下划线组成,且不为空");
      userNameEle.trigger('focus');
    }
    else if(passWord === "" || passWord === null){
      addTips(passWordEle,"密码不能为空");
      passWordEle.trigger('focus');
    }
    else if(secPassWord === "" || secPassWord === null){
      addTips(secPassWordEle,"确认密码不能为空");
      secPassWordEle.trigger('focus');
    }
    else if(userEmail.length >20 || !emailReg.test(userEmail)){
      addTips(passWordEle,"请填写正确的邮箱");
      userEmailEle.trigger('focus');
    }
    else if( !phoneReg.test(userPhone)){
      addTips(userPhoneEle,"请填写正确的手机号码格式");
      userPhoneEle.trigger('focus');
    }
    else if(passWord !== secPassWord){
      addTips(passWordEle,"前后密码不一致");
      secPassWordEle.trigger('focus');
    }
    else{
      $('.tips').remove();
      let formData = {
        userName,
        passWord,
        userEmail,
        userAge,
        userSex,
        userPhone
      };
      $.post("/reqData/register",formData,(data,status)=>{
        if(status !== "success"){
          addTips(userName,"注册失败，请重试");
        }
        else{
          if(data === "true"){
            $(".form-container").html("<h3 style='text-align: center'>您已经成功提交注册信息，请在10分钟内前往邮箱激活帐号</h3>");
          }
          else{
            $(".form-container").html("<h3 style='text-align: center'>注册失败，请重试</h3>");
          }
        }
      });
    }
  });
});