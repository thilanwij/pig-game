var scores,roundScore,activePlayer,dice;scores=[0,0],roundScore=0,activePlayer=0,dice=Math.floor(6*Math.random())+1,document.querySelector("#current-"+activePlayer).textContent=dice;var x=document.querySelector("#current-0").innerHTML,i=0;document.querySelector(".btn-roll").addEventListener("click",(function(){alert("Hello "+i),i++}));