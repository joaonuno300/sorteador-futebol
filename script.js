let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
let ultimoResultado = null;

function guardar(){

localStorage.setItem("jogadores", JSON.stringify(jogadores));

}

function adicionarJogador(){

let nome = document.getElementById("nome").value;

let nivel = parseInt(document.getElementById("nivel").value);

if(nome==="") return;

jogadores.push({

nome:nome,
nivel:nivel,
ativo:true

});

document.getElementById("nome").value="";

guardar();
mostrarJogadores();

}

function removerJogador(i){

jogadores.splice(i,1);

guardar();
mostrarJogadores();

}

function toggle(i){

jogadores[i].ativo=!jogadores[i].ativo;

guardar();

}

function mostrarJogadores(){

let div = document.getElementById("listaJogadores");

div.innerHTML="";

jogadores.forEach((j,i)=>{

div.innerHTML+=`

<div class="jogador">

<div>

<input type="checkbox"

${j.ativo?"checked":""}

onclick="toggle(${i})">

${j.nome} (⭐${j.nivel})

</div>

<button class="remover"

onclick="removerJogador(${i})">

remover

</button>

</div>

`;

});

}

function sortear(){

let ativos = jogadores.filter(j=>j.ativo);

if(ativos.length<8){

alert("mínimo 8 jogadores");

return;

}

let mistura=[...ativos].sort(()=>Math.random()-0.5);

let equipas=[];
let equipa=[];

mistura.forEach(j=>{

equipa.push(j);

if(equipa.length===5){

equipas.push(equipa);
equipa=[];

}

});

if(equipa.length>0){

equipas.push(equipa);

}

ultimoResultado=equipas;

mostrarEquipas(equipas);

}

function novoSorteio(){

if(!ultimoResultado) return;

sortear();

}

function mostrarEquipas(equipas){

let div = document.getElementById("resultado");

div.innerHTML="<h2>Equipas</h2>";

equipas.forEach((e,i)=>{

div.innerHTML+=`<div class="equipa">

<h3>Equipa ${i+1}</h3>

`;

e.forEach(j=>{

div.innerHTML+=`${j.nome} ⭐${j.nivel}<br>`;

});

div.innerHTML+="</div>";

});

}

mostrarJogadores();
