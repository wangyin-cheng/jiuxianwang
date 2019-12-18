
import{bufferMove,$,ajax} from './toolbar.js';
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
            this.nwLi[i].onmouseout = function () {
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
        this.Lbtime = null;
        this.index=0;

    }
    init() {
        //   按钮
       
        let _this = this;
        for (let i = 0; i < this.Lbspan.length; i++) {
            this.Lbspan[i].abc = i;  //添加自定义属性
            this.Lbspan[i].onmouseover = function () {
                
                clearInterval(this.Lbtime);
                for (let j = 0; j < _this.Lbspan.length; j++) {
                    _this.Lbspan[j].className = "";
                    _this.Lbli[j].id = "";
                }
                this.className = "on";
                _this.Lbli[i].id = "hL";
                _this.index = this.abc;

                _this.zd( _this.index)
            }
        }
        this.zd(_this.index)
        this.asjaxa()
        // console.log(_this.index)
        this.Lbul.onmouseout = function (index) {
            index = _this.index
            _this.zd(index)
        }
    }
    // 自动运动
    zd(index) {
        clearInterval(this.Lbtime);
        var _this = this;
        this.Lbtime = setInterval(() => {
            index++;
            // console.log(index)
            if (index > 9) {
                index = 0;
            }
            for (let j = 0; j < this.Lbspan.length; j++) {
                this.Lbspan[j].className = "";
                this.Lbli[j].id = "";
            }
            this.Lbspan[index].className = "on";
            this.Lbli[index].id = "hL";
        }, 1000);

        this.Lbul.onmouseenter = function () {
            clearInterval(_this.Lbtime);
            
        }
    }
    asjaxa(){
        let aList=document.querySelector("#mainWrap .list");
        let aclearfix=document.querySelector("#mainWrap .spiritWrap .clearfix");
        
        let htmlstr="";
        let htmlstr2="";
        ajax({
            url:"http://localhost//kejian/jiuxianwang/php/picmiaoshu.php",
            dataType:'json',
        }).then(function(data){
            console.log(data);
            htmlstr="<ul>"
            htmlstr2="";
            for(let i=0;i<data.length;i++){
              htmlstr+= ` 
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
                htmlstr2+=`
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
            htmlstr+="</ul>"
            aList.innerHTML=htmlstr;
            aclearfix.innerHTML=htmlstr2;
        })
    }
}


export {
    Mouseout,
    Lbp
};