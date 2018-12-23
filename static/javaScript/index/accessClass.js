function searchBtnClick() {
  let searchName = $('#search-value').val();
  if(searchName.trim() === ""){return false;}
  window.location.href = `/page/searchClass?className=${searchName}&page=2`;
}
$(()=>{
  $('#class-nav').on('click',(event)=>{
    event.preventDefault();
    let className = event.target.innerText;
    window.location.href = `/page/searchClass?className=${className}`;
  });
  $('#search-btn').on('click',searchBtnClick);
});