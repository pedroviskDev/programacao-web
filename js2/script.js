function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function jokenpo(usuario, computador){
    if(usuario === computador){
        return -1;
    }
    if(usuario === 1 && computador === 2 || usuario === 2 && computador === 3 || usuario === 3 && computador === 1){
        return 1;
    }
    else{
        return 0;
    }
}

const opcoes = ["Papel", "Pedra", "Tesoura"];
let derrota = false;
let pontucaoUsuario = 0;

do{
    console.log("Escolha sua jogada:")
    for (let i = 0 ; i < opcoes.length; i++){
        console.log(`${i + 1} - ${opcoes[i]}`)
    }
    const usuario = parseInt(prompt());
    

    if (usuario){
        const computador = sortearNumero(1,3);
        console.log(`O computador jogou ${opcoes[computador - 1]}`);
        const resultado = jokenpo(usuario, computador);
        if (resultado === 1){
            pontucaoUsuario += 1;
        }
        else if(!resultado){
            console.log(`Voce Perdeu! A sua pontuacao foi de ${pontucaoUsuario}`);
            derrota = true;
        }

    }
    else{
        derrota = true;
    }
    
}
while(!derrota)



