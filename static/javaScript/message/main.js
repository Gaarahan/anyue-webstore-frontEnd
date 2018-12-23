document.getElementById("edit-info").style.height = document.documentElement.clientHeight+"px";
document.getElementById("edit-out").onclick = () => {
  document.getElementById("edit-info").style.display = "none";
  document.getElementById("edit-address-info").style.display = "none";
};
let userInfo = document.querySelector("#user-info"),
    userInfoList = null,      // 保存用户信息
    addressId = [],     // 保存地址id
    addrId,
    userInfoBtn = document.querySelector("#user-info-btn"),
    addressInfoList = document.querySelector("#address-info-list"),
    userAddress = document.querySelector("#user-address");

// 渲染用户个人基本信息
let showUserInfo = () => {
  let userId = document.querySelector("#user-id"),
      userName = document.querySelector("#user-name"),
      userEmail = document.querySelector("#user-email"),
      userAge = document.querySelector("#user-age"),
      userSex = document.getElementsByName("sex"),
      userTime = document.querySelector("#user-time"),
      userPhone = document.querySelector("#user-phone");

  userId.innerText = userInfoList.id;
  userName.innerText = userInfoList.userName;
  userEmail.innerText = userInfoList.userEmail;
  userAge.value = userInfoList.userAge;
  userTime.innerText = (new Date(userInfoList['userRegistTime'])).toLocaleString();
  userPhone.value = userInfoList.userPhone;
  (userInfoList.userSex === "男")? (userSex[0].checked ="checked") : (userSex[1].checked = "checked");
};

// 获取用户信息
let getUserInfo = () => {
  let token = window.localStorage.getItem('token');

  $.ajax({
    method: 'GET',
    type: 'JSON',
    url: '/reqData/showInfo',
    headers: {
      'authorization': token
    },
    success: function(res) {
      if(res === "logOut"){
        alert('用户登录过期');
        window.location.href = ('/page/login.html');
        return ;
      }
      userInfoList = res;
      showUserInfo();
    },
    error: function(msg) {
      console.log(msg);
    }
  });
};

getUserInfo();

// 编辑个人基本信息
let editUserInfo = () => {
  let userId = parseInt(document.querySelector("#user-id").innerText),
      userAge = parseInt(document.querySelector("#user-age").value),
      userSexList = document.getElementsByName("sex"),
      userPhone = document.querySelector("#user-phone").value,
      userSex = userSexList[0].checked ? userSexList[0].value : userSexList[1].value;

  let token = window.localStorage.getItem('token');
  let editUserXhr = new XMLHttpRequest();
  editUserXhr.onreadystatechange = () => {
    if(editUserXhr.readyState === 4 && editUserXhr.status === 200) {
      alert("个人信息修改成功");
    }
  };

  editUserXhr.open("POST","/reqData/updateAddress",true);
  editUserXhr.setRequestHeader("Authorization",token);
  editUserXhr.setRequestHeader('Content-Type','application/json');
  editUserXhr.send(JSON.stringify({"id":userId,
    "userAge":userAge,
    "userSex":userSex,
    "userPhone":userPhone}
    ));
};

// 渲染地址列表
let showAddressList = (addrList) => {
  let address = ``;
  for(let i = 0,item;item = addrList[i++];) {
    addressId.push(item.id);
    address += `<li>
                          <div class="address-info">
                              <div class="base-user-info address">
                                  <div class="info-title">
                                      <span>收货人：</span>
                                  </div>
                                  <div class="info-content">
                                      <span>${ item.cnee }</span>
                                  </div>
                              </div>
                              <div class="base-user-info address">
                                  <div class="info-title">
                                      <span>收货地址：</span>
                                  </div>
                                  <div class="info-content">
                                      <span>${ item.addrName }</span>
                                  </div>
                              </div>
                              <div class="base-user-info address">
                                  <div class="info-title">
                                      <span>手机：</span>
                                  </div>
                                  <div class="info-content">
                                      <span>${ item.addrPhone }</span>
                                  </div>
                              </div>
                              <div class="base-user-info edit">
                                  <a href="javascript:void(0)" class="delete-address">删除</a>
                              </div>
                          </div>
                      </li>`;
  }
  addressInfoList.innerHTML = address;
};

// 编辑收货地址弹窗页面
let modifiAddress = () => {
  let editInfo = document.querySelector("#edit-info"),
      editAddressInfo = document.querySelector("#edit-address-info"),
      editAddress  = document.querySelectorAll(".edit-address"),
      addressInfoList = document.querySelector("#address-info-list"),
      addressList = [],
      btnPrimary = document.querySelector(".add-address").querySelectorAll(".btn-primary"),
      deleteAddress = document.getElementsByClassName("delete-address");

  for(let item of addressInfoList.childNodes.values()) {
    if(typeof item.nodeType === 'number' && item.nodeType === 1) {
      addressList.push(item);
    }
  }

  let showEdit = () => {
    editInfo.style.display = "block";
    editAddressInfo.style.display = "block";
  };
  // 编辑收货地址
  for(let i = 0;i < editAddress.length;i++) {
    editAddress[i].onclick = () => {
      showEdit();
      document.querySelector("#add").style.display = "none";
      document.querySelector("#edit").style.display = "block";
      addrId = addressId[i];
    };
  }
  // 删除地址
  for(let i = 0;i < deleteAddress.length;i++) {
    deleteAddress[i].onclick = () => {
      let token = window.localStorage.getItem('token');
      let url = '/reqData/delAddress';

      let deleteXhr = new XMLHttpRequest();
      deleteXhr.onreadystatechange = () => {
        if(deleteXhr.readyState === 4 && deleteXhr.status === 200) {
          let addrStatus = JSON.parse(deleteXhr.responseText);
          if(parseInt(addrStatus) === 200) {
            addressInfoList.removeChild(addressList[i]);
            alert("删除地址成功");
          }
        }
      };
      deleteXhr.open("POST",url,true);
      deleteXhr.setRequestHeader("Authorization",token);
      deleteXhr.setRequestHeader("Content-Type",'application/json');
      deleteXhr.send(JSON.stringify({id:addressId[i]}));
    };
  }

  // 添加收货地址
  for(let i = 0;i < btnPrimary.length;i++) {
    btnPrimary[i].onclick = () => {
      showEdit();
      document.querySelector("#edit").style.display = "none"
      document.querySelector("#add").style.display = "block";
    };
  }

}

// 切换至基本信息
userInfo.onclick = () => {
  document.getElementById("all-address").style.display = "none";
  userAddress.style.color = "#999";
  userInfo.style.color = "orangered";
  document.getElementById("base-info").style.display = "block";

};

// 切换至收货地址
userAddress.onclick = () => {
  document.getElementById("base-info").style.display = "none";
  userInfo.style.color = "#999";
  userAddress.style.color = "orangered";
  document.getElementById("all-address").style.display = "block";
  showAddressList(userInfoList.addressList);
  modifiAddress();
};

// 保存个人基本信息
userInfoBtn.onclick = () => {
  editUserInfo();
};

// 添加地址
document.querySelector("#add").onclick = () => {
  let inputNameValue = document.querySelector("#input-name").value,
      inputAddressValue = document.querySelector("#input-address").value,
      inputPhoneValue = document.querySelector("#input-phone").value;

  let token = window.localStorage.getItem('token');

  let editAddrXhr = new XMLHttpRequest();

  editAddrXhr.onreadystatechange = () => {
    if(editAddrXhr.readyState === 4 && editAddrXhr.status) {
      let addStatus = JSON.parse(editAddrXhr.responseText);
      if(parseInt(addStatus) === 200) {
        alert("地址添加成功");
        window.location.reload();
      }
    }
  };
  editAddrXhr.open("POST","/reqData/addAddress",true);
  editAddrXhr.setRequestHeader("Authorization",token);
  editAddrXhr.setRequestHeader('Content-Type','application/json');
  editAddrXhr.send(JSON.stringify({
    addrName:inputAddressValue,
    cnee:inputNameValue,
    addrPhone:inputPhoneValue
  }));

  document.getElementById("edit-info").style.display = "none";
  document.getElementById("edit-address-info").style.display = "none";
};
