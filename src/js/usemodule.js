let sid=document.querySelector("#topHeader");
import { Mouseout,Lbp,tab } from './Tab.js';
//判断
if(sid !==""){
    new Mouseout().init();
    new Lbp().init();
    new tab().init();
}else{

}

