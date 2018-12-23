function pageChange(e) {
  e.preventDefault();
  let pageEle = e.target;
  if($(pageEle).hasClass('active')){return false;}

  let pageValue = $(pageEle).text();
  let queryUrl = window.location.href.split('?')[1];
  let searchName = queryUrl.split('=')[1].split('&')[0];

  window.location.href = `/page/searchClass?className=${searchName}&page=${pageValue}`;
}
$(()=>{
  $('.page-btn').on('click',pageChange);
  $('#pre-page-btn').on('click',()=>{
    let queryUrl = window.location.href.split('?')[1];
    let curPage = queryUrl.split('=')[2].split('#')[0];
    let searchName = queryUrl.split('=')[1].split('&')[0];
    let curPageNum = parseInt(curPage);

    if(curPageNum === 1){return false;}
    else{
      window.location.href = `/page/searchClass?className=${searchName}&page=${curPageNum-1}`;
    }
  });
  $('#next-page-btn').on('click',()=>{
    let queryUrl = window.location.href.split('?')[1];
    let curPage = queryUrl.split('=')[2].split('#')[0];
    let searchName = queryUrl.split('=')[1].split('&')[0];
    let curPageNum = parseInt(curPage);

    let maxPageNum = parseInt($('.allPageNum').text());
    if(curPageNum === maxPageNum){return false;}
    else{
      window.location.href = `/page/searchClass?className=${searchName}&page=${curPageNum+1}`;
    }
  })
});