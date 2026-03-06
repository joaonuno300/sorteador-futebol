let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
let sorteios = JSON.parse(localStorage.getItem("sorteios")) || [];

function guardar(){
localStorage.setItem("jogadores", JSON.stringify(jogadores));
localStorage.setItem("sorteios", JSON.stringify(sorteios));
}

function adicionarJogador(){

let nome = document.getElementById("nome").value;
let nivel = parseInt(document.getElementById("nivel").value);

jogadores.push({
nome:nome,
nivel:nivel,
ativo:true
});

guardar();
mostrarJogadores();
}

function mostrarJogadores(){

let div = document.getElementById("listaJogadores");
div.innerHTML="";

jogadores.forEach((j,i)=>{

div.innerHTML += `
<div class="jogador">
<input type="checkbox" ${j.ativo?"checked":""}
onclick="toggle(${i})">
${j.nome} (nível ${j.nivel})
</div>
`;

});

}

function toggle(i){

jogadores[i].ativo=!jogadores[i].ativo;
guardar();
}

function sortear(){

let ativos = jogadores.filter(j=>j.ativo);

if(ativos.length<8){
alert("mínimo 8 jogadores");
return;
}

let embaralhados = [...ativos].sort(()=>Math.random()-0.5);

let equipas=[];
let equipa=[];

embaralhados.forEach(j=>{

equipa.push(j);

if(equipa.length==5){
equipas.push(equipa);
equipa=[];
}

});

if(equipa.length>0){
equipas.push(equipa);
}

let chave = JSON.stringify(equipas.map(e=>e.map(j=>j.nome)));

if(sorteios.includes(chave)){
alert("combinação já usada");
return;
}

sorteios.push(chave);
guardar();

mostrarEquipas(equipas);
}

function mostrarEquipas(equipas){

let div = document.getElementById("resultado");
div.innerHTML="";

equipas.forEach((e,i)=>{

div.innerHTML += `<h3>Equipa ${i+1}</h3>`;

e.forEach(j=>{
div.innerHTML += j.nome+" ("+j.nivel+")<br>";
});

});

}

mostrarJogadores();
