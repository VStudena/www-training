'use strict';

const score0Element=document.querySelector("#score--0");
const score1Element=document.querySelector("#score--1");
const diceElement=document.querySelector(".dice");
score0Element.textContent=0;
score1Element.textContent=0;
diceElement.classList.add("hidden");


const btnNew=document.querySelector(".btn--new");
const btnRoll=document.querySelector(".btn--roll");
const btnHold=document.querySelector(".btn--hold");

const current0Score=document.querySelector("#current--0");
const current1Score=document.querySelector("#current--1");

let currentScore=0;
let activePlayer=0; //hlídání aktivního hráče
let totalScore=[0,0];

const player0Element=document.querySelector(".player--0");
const player1Element=document.querySelector(".player--1");

btnRoll.addEventListener("click", function(){
    let diceNum=Math.floor(Math.random()*6)+1;
    diceElement.classList.remove("hidden");
    diceElement.src=`dice-${diceNum}.png`;
    if(diceNum!==1){
        currentScore+=diceNum;
        document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
    }
    else{
        document.querySelector(`#current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer=activePlayer===0?1:0;
        player0Element.classList.toggle("player--active");
        player1Element.classList.toggle("player--active");
    }
});