function addTips(tagEle,tips){
  $('.tips').remove();
  let tipEle = document.createElement('div');
  tipEle.innerHTML = '<i class="iconfont icon-cuowu"></i>' + tips;
  tipEle.className = "tips";
  tagEle.parent().append(tipEle);
}
