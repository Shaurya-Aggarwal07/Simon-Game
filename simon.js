let useq=[];
let gseq=[];
let btns=['red','yellow','green','purple'];
let started=false;
let level=0;
let h2=document.querySelector("h2");
let btn=document.querySelectorAll(".btn");
let hscore=0;

//1.press any key 
//2. random button chosen by pc and flashed, gseq updated
//3.user presses button and it flashes, useq updated
//4.last button USER pressed checked and until useq length !-= gseq level not updated
//5.level up and useq reset and h1 updated.
//6.on wrong key press game over, red flash and reset

function btnFlash(btn){                            //3
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
};

function LevelUp(){                                 //2
    useq=[];                                        //7
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randCol=btns[randIdx];
    let randBtn=document.querySelector(`.${randCol}`);

    gseq.push(randCol);
    // console.log(gseq);                            CHEATCODE
    
    btnFlash(randBtn);
};

document.addEventListener("keypress",function(){    //1
    if(started==false){
        h3=document.querySelector("h3");
        h3.innerHTML=`High Score: ${hscore}`;
        started=true;
        LevelUp();
    }
});

function checkAns(idx){                               //6
    // let idx=level-1;
    if(useq[idx] === gseq[idx]){
        if(useq.length==gseq.length){//it means we checked last btn in seq
            setTimeout(LevelUp,1000);
        }
     }
     else {
        h2.innerHTML=`Game Over ! Your score was ${level}<br>Press any key to Continue`;
        if(hscore<level)
            hscore=level;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";            
        },150);
        reset();
    }
};

function btnPress(){                              //5
    let btn=this;
    btnFlash(btn);

    userCol=btn.getAttribute("id");
    useq.push(userCol);

    // console.log(useq);                       //CHEATCODE

    checkAns(useq.length-1);
}
 
let allBtns=document.querySelectorAll('.btn');    //4
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};

function reset(){                                 //8
    gseq=[];                                 
    useq=[];
    level=0;
    started=false;
};