const botao = document.calculo.botao;
botao.onclick = function(){
    const raio = parseFloat(document.calculo.raio.value);
    const area = Math.pow(raio, 2) * 3
    const circunferencia = 2 * 3 * raio;

    document.calculo.area.value = `${area}`;
    document.calculo.circunferencia.value = `${circunferencia}`;
}
