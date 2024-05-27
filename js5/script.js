const botao = document.tamanho.obter;
const barra1 = document.querySelector(".barra1");
const barra2 = document.querySelector(".barra2");
const barra3 = document.querySelector(".barra3");
const barra4 = document.querySelector(".barra4");
const barra5 = document.querySelector(".barra5");



botao.onclick = function(){
    const altura1 = document.tamanho.altura1.value;
    const altura2 = document.tamanho.altura2.value;
    const altura3 = document.tamanho.altura3.value;
    const altura4 = document.tamanho.altura4.value;
    const altura5 = document.tamanho.altura5.value;
    
    const largura = document.tamanho.largura.value;

    barra1.style.setProperty("width", `${largura}px`);
    barra1.style.setProperty("height", `${altura1}px`);
    barra1.style.setProperty("border", `1px solid red`);
    barra1.style.setProperty("background-color", "red");
    
    barra2.style.setProperty("width", `${largura}px`);
    barra2.style.setProperty("height", `${altura2}px`);
    barra2.style.setProperty("border", `1px solid red`);
    barra2.style.setProperty("background-color", "green");
    
    barra3.style.setProperty("width", `${largura}px`);
    barra3.style.setProperty("height", `${altura3}px`);
    barra3.style.setProperty("border", `1px solid red`);
    barra3.style.setProperty("background-color", "blue");
    
    barra4.style.setProperty("width", `${largura}px`);
    barra4.style.setProperty("height", `${altura4}px`);
    barra4.style.setProperty("border", `1px solid red`);
    barra4.style.setProperty("background-color", "black");

    barra5.style.setProperty("width", `${largura}px`);
    barra5.style.setProperty("height", `${altura5}px`);
    barra5.style.setProperty("border", `1px solid red`);
    barra5.style.setProperty("background-color", "yellow");
    
}