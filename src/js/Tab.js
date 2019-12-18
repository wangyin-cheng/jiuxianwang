function $(ele, all) {
    if (all !== "all") {
        return document.querySelector(ele);
    } else {
        return document.querySelectorAll(ele);
    }
}
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
        
        Ai.onclick=function(){
            this.parentNode.style.display="none";
            clearInterval(Atime);
        }
        window.onscroll = function () {
            if (document.documentElement.scrollTop > 800) {
                clearInterval(Atime);
                Atime = setInterval(() => {
                    AnewADBox.style.display = "block"
                    console.log(num)
                    if(num>1){
                        
                            num--;
                            Astrong.innerHTML = num;
                           
                    }else{
                        num=0;
                        console.log("lishi")
                        AnewADBox.style.display = "none";
                        clearInterval(Atime);
                        }
                }, 1000);
                // console.log(num)
                //     if(num>0){
                //     Atime = setInterval(() => {
                //         num--;
                //          Astrong.innerHTML = num;
                //           AnewADBox.style.display = "block";
                //     },1000)
                //     }else{
                //         num=0;
                //         console.log("lishi")
                //         AnewADBox.style.display = "none";
                //         clearInterval(Atime);
                //     }


            } else {
                AnewADBox.style.display = "none";
                clearInterval(Atime);
            }
        }
       
    }

}
class Lbp{
    constructor(){

    }
    init(){
        alert(1);
    }
}
export {
    Mouseout,
    Lbp
};