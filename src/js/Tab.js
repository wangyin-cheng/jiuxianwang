
import { bufferMove, $, ajax } from './toolbar.js';
class Mouseout {
    constructor() {
        this.topA = $("#topHeader li .xa", "all")
        this.mjxb = $("#topHeader .myjiuxianbox", "all")
        this.mhinp = $("#wd");
        this.mhaul = $("#searchCon ul");
        this.mhsearchCon = $("#searchCon");
        this.nwLi = $("#navwrap .commodity .innerLi", "all");
        this.nwmB = $("#navwrap .commodity .menuBox");
    }
    init() {
        this.topAout()
        this.inpG()
        this.CountDown()
    }
    // 导航条移入移出效果
    inpG() {
        let _this = this;
        for (let i = 0; i < this.nwLi.length; i++) {
            this.nwLi[i].onmouseover = function () {
                _this.nwLi[i].style.borderLeftColor = "red";
                _this.nwmB.style.display = "block";
              
            }
            this.nwLi[i].onmouseout = function (ev) {
                    var ev= ev ||event;
                _this.nwLi[i].style.borderLeftColor = "#e4e4e4";
                _this.nwmB.style.display = "none";
            
            }
        }
    }
    topAout() {
        //头部移入移出效果
        let _this = this;
        for (let i = 0; i < this.topA.length; i++) {
            this.topA[i].onmouseover = function () {
                _this.mjxb[i].style.display = "block";
                _this.mjxb[i].onmouseover=function(){
                    _this.mjxb[i].style.display = "block";
                }
                _this.mjxb[i].onmouseout=function(){
                    _this.mjxb[i].style.display = "none";
                }
            }
            this.topA[i].onmouseout = function () {
                _this.mjxb[i].style.display = "none";
            }
            
        }
    }
    // 广告倒计时效果
    CountDown() {
        let AnewADBox = $("#newADBox");
        let Astrong = $("#newADBox p strong");
        let Ai = $("#newADBox i");
        let Atime = null;
        let num = parseInt(Astrong.innerHTML.substr(parseInt(Astrong.innerHTML.indexOf(";")) + 1, 1))

        Ai.onclick = function () {
            this.parentNode.style.display = "none";
            clearInterval(Atime);
        }
        window.onscroll = function () {
            if (document.documentElement.scrollTop > 800) {
                clearInterval(Atime);
                Atime = setInterval(() => {
                    AnewADBox.style.display = "block"
                    console.log(num)
                    if (num > 1) {

                        num--;
                        Astrong.innerHTML = num;

                    } else {
                        num = 0;
                        console.log("lishi")
                        AnewADBox.style.display = "none";
                        clearInterval(Atime);
                    }
                }, 1000);

            } else {
                AnewADBox.style.display = "none";
                clearInterval(Atime);
            }
        }

    }

}
// 轮播图片
class Lbp {
    constructor() {
        this.luobowrap = $(".luobowrap");
        this.Lbul = $(".luobowrap .bigImg ul");
        this.Lbli = $(".luobowrap .bigImg li", "all")
        this.Lbspan = $("#mainWrap .imgBnt span", "all")
        this.index = 0;

    }
    init() {
        //   按钮
        let _this = this;
        let timer=null;
        for (let i = 0; i < this.Lbspan.length; i++) {
            this.Lbspan[i].onmouseover = function () {
                _this.index = i;
                _this.change();
            }
        }


        this.Lbul.onmouseenter = function () {
            clearInterval(timer); 
        }
        this.Lbul.onmouseout = function (index) {
            timer=setInterval(function(){
                _this.zd();
            },2000);
        }

        timer=setInterval(function(){
            _this.zd();
        },2000);
        
        // 获取数据
        this.asjaxa();
    }
    // 切换
    change() {
        for (let j = 0; j < this.Lbspan.length; j++) {
            this.Lbspan[j].className = "";
            this.Lbli[j].id = "";
        }
            this.Lbspan[this.index].className = "on";
            this.Lbli[this.index].id = "hL";
        }
    // 自动运动
    zd() {
        this.index++;
        if(this.index>this.Lbli.length-1){
            this.index=0;
        }
        this.change();
    }
    asjaxa() {
        let aList = document.querySelector("#mainWrap .list");
        let Tbwz=document.querySelectorAll(".MianTab .titie li");
        let aclearfix = document.querySelector("#mainWrap .spiritWrap .clearfix");
        let Alist= document.querySelector("#mainWrap .content .list");
        
        let htmlstr = "";
        let htmlstr2 = "";
        let htmlstr3Ul="";
        ajax({
            url: "http://localhost//kejian/jiuxianwang/php/picmiaoshu.php",
            dataType: 'json',
        }).then(function (data) {
            htmlstr = "<ul style='display:none;'>"
            htmlstr2 = "";
            for (let i = 0; i < data.length; i++) {
                htmlstr += ` 
                <li>
                    <div class="indexTabPic">
                        <a href="#"target="_blank" title="">
                            <img src="${data[i].picSrc}"
                                width="160" height="160">
                        </a>
                    </div>
                    <div class="indexTabTit">
                        <a href="#" target="_blank">
                            ${data[i].prcesent}
                        </a>
                    </div>
                    <div class="indexTabPrice homegoodPrice">
                        ￥ <strong class="jxIndex_nowPrice_54855">${data[i].price}</strong>
                    </div>
                </li>
                            `
                htmlstr2 += `
                        <li>
                        <div class="spiritListPic">
                            <a href="#" target="_blank">
                                <img src="${data[i].picSrc}"
                                    width="160" height="160" alt="52°汾酒集团贵宾窖藏（红）1500ml">
                            </a>
                        </div>
                        <div class="spiritListTit">
                            <a href="#" target="_blank">
                            ${data[i].prcesent}
                            </a>
                        </div>
                        <div class="spiritListPrice">
                            <strong class="jxIndex_nowPrice_93181">￥${data[i].price}</strong>
                        </div>
                    </li>
                            `
            }
            htmlstr += "</ul>"
            aList.innerHTML = htmlstr;
            aclearfix.innerHTML = htmlstr2;
            
           for(let i=0;i<Tbwz.length;i++){
                htmlstr3Ul+=htmlstr;
           }
           Alist.innerHTML=htmlstr3Ul;
          
           Alist.children[0].style.display="block";
        })
    }

}

class tab {
    constructor() {

    }
    init() {
        this.dtab();
    }
    over(ele,atter,i){
        for (let j = 0; j < ele.length; j++) {
            let className2 = ele[j].className.split(" ");
            if(className2.indexOf(atter)!==-1){
                className2.splice(className2.indexOf(atter),1)
                ele[j].className=className2.join(" ")
            }else{
                ele[j].className=className2.join(" ");
            }
        }
      let className1= ele[i].className.split(" ")
            className1.push(atter);
        ele[i].className= className1.join(" ");
    
    }
    dtab() {
        let atitle = document.querySelectorAll(".MianTab .titie li");
        let Alist= document.querySelector("#mainWrap .content .list");
        let _this=this;
            for (let i = 0; i < atitle.length; i++) {
                atitle[i].onmouseover = function () { 
                _this.over(atitle,"on",i);
                for(let j=0;j<Alist.children.length;j++){
                    Alist.children[j].style.display="none";
                }
                Alist.children[i].style.display="block";
            }
        }
    }

}


export {
    Mouseout,
    Lbp,
    tab
};