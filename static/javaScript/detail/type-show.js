/**
 *  点击ｓｉｚｅ时，选择对应的ｓｉｚｅ,并显示想对应的库存
 * @param e
 */
function selectSize(e) {
  let targetSizeEle = e.target;
  $('.size').removeClass('select-active');
  $(targetSizeEle).addClass('select-active');

  let targetIndex = getSizeEleIndex(targetSizeEle);
  if(targetIndex === -1){return false}
  $('.store').hide();
  let select = `.store:nth-child(${targetIndex + 2})`;
  $(select).show();
}
/**
 * 点击商品缩略图时，将当前的图片展示为缩略图所指向图片
 * @param e 点击事件
 */
function showDetailImg(e) {
  let targetImgEle = e.target;
  let imgUrl = targetImgEle.src;
  let detailImg = $('.mask img');

  detailImg.attr('src',imgUrl);
  $('.detailShow').removeClass('select-active');
  $(targetImgEle.parentElement).addClass('select-active');
}
/**
 *  传入一个元素，输出该元素在其父元素中是第几个元素
 * @param Ele  需要判断的元素
 * @returns {number} 返回数字，代表传入元素的位序
 */
function getColorEleIndex(Ele) {
  let colorEle = $('.color');
  let eleIndex = -1;
  colorEle.each((index,item)=>{
    if(item === Ele){
      eleIndex = index;
    }
  });
  return eleIndex;
}
function getSizeEleIndex(Ele) {
  let sizeEle = $('.size');
  let eleIndex = -1;
  sizeEle.each((index,item)=>{
    if(item === Ele){
      eleIndex = index;
    }
  });
  return eleIndex;

}
/**
 * 点击选择颜色时，将对应按钮转为高亮，将该颜色对应的图片展示在左侧
 * @param e
 */
function selectColor(e) {
  let targetColorEle = e.target;
  $('.color').removeClass('select-active');
  $(targetColorEle).addClass('select-active');

  //获取该元素的次序
  let targetIndex =getColorEleIndex(targetColorEle);
  if(targetIndex === -1){return false}
  //获取对应的缩略元素
  let thumbImg = $(`.detailShow:nth-child(${targetIndex + 1}) img`);
  $('.detailShow').removeClass('select-active');
  thumbImg.addClass('select-active');

  let imgUrl = thumbImg.attr("src");
  $('.mask img').attr("src",imgUrl);
}
/**
 * 点击数量按钮，点击加号时，文本框内数值加一,数量不能超过当前显示库存,
 * 点击减号时，数值减一
 * @param e
 */
function countBtnClick(e){
  let clickEle = $(e.target);
  let inputEle = $('#input-num');
  let eleValue = inputEle.val();
  if (clickEle.attr('id') === 'inc') {
    let storeCur = $('.store').filter((index,ele)=>{
      return ele.style.display !== "none";
    }).text();

    if(eleValue === storeCur) {return false;}

    inputEle.val(++eleValue);
    if(eleValue > 1){ $('#dec').show(); }
  }else{
    inputEle.val(--eleValue);
    if(eleValue === 1){
      $('#dec').hide();
    }
  }
}
/**
 * 点击按钮，将当前选择加入购物车
 */
function addCart(){
  let token = window.localStorage.getItem('token');
  if(token === null){alert('请先登录');return false;}
  let commId = $('#goodId').text();
  let goodsSize = $('.size').filter('.select-active').text().trim();
  let goodsColor = $('.color').filter('.select-active').text().trim();
  let goodsSum = $('#input-num').val().trim();
  let option = {
    url:'/reqData/addCart',
    method : 'POST',
    data : {
      commId,
      goodsSize,
      goodsColor,
      goodsSum
    },
    headers : {
      'Authorization':token
    },
    success: (result)=>{
      if(result === 'true'){
        alert('加入购物车成功');
      }
      else if(result === 'logOut'){
        alert('登录过期，请重新登录');
        window.localStorage.clear();
        window.location.href = '/page/login.html';
      }
    },
    error : ()=>{
      alert('出错了，请重试');
    }
  };
  $.ajax(option).then(()=>{});
}
$(()=>{
  //为缩略图添加点击事件
  $(".detailShow").on('click',showDetailImg);
  //为尺码颜色添加点击事件
  $('.size').on('click',selectSize);
  $('.color').on('click',selectColor);
  $('#inc,#dec').on('click',countBtnClick);
  $('#add-cart').on('click',addCart);
});
