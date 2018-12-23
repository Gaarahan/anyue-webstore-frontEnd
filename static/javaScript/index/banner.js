const oConten = document.getElementsByClassName("content")[0];
const oLi = oConten.getElementsByTagName("li");
const oTab = document.getElementsByClassName("tab")[0];
const sPans = oTab.getElementsByTagName("span");
const bannerContent = document.getElementById("banner-content");
let num = 0;

const backColors = ["rgb(0,111,119)", "rgb(122,38,0)", "rgb(112,120,132)", "rgb(233,233,233)",
  "rgb(57,31,7)", "rgb(135,102,79)", "rgb(171,221,238)", "rgb(239,32,12)"];

oLi[0].style.opacity = 1;
sPans[0].className = "oSpan";

/* 点击轮播 */
for(let i = 0; i < sPans.length; i++) {
    sPans[i].index = i;
    sPans[i].onclick = function() {
        num = this.index;
        for(let j = 0; j<sPans.length; j++) {
            sPans[j].className = "";
            oLi[j].style.opacity = 0;
        }
        bannerContent.style.backgroundColor = backColors[num];
        this.className = "oSpan";
        oLi[num].style.opacity = 1;
    }
}

/* 自动轮播 */
setInterval(function() {
    num++;
    num = num%8;
    for(let j = 0; j<sPans.length; j++) {
        sPans[j].className = "";
        oLi[j].style.opacity = 0;
    }
    bannerContent.style.backgroundColor = backColors[num];
    sPans[num].className = "oSpan";
    oLi[num].style.opacity = 1;
},3000);
