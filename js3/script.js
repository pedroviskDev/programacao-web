class ConjuntoDeInteiros {
    constructor(valorMaximo) {
      this.valorMaximo = valorMaximo;
      this.conjunto = new Array(valorMaximo + 1).fill(false);
    }
  
    inserir(elemento) {
      if (elemento >= 0 && elemento <= this.valorMaximo) {
        this.conjunto[elemento] = true;
      } else {
        console.log(`Elemento fora do intervalo: 0 a ${this.valorMaximo}`);
      }
    }

    remover(elemento) {
      if (elemento >= 0 && elemento <= this.valorMaximo) {
        this.conjunto[elemento] = false;
      } else {
        console.log(`Elemento fora do intervalo: 0 a ${this.valorMaximo}`);
      }
    }
  
    uniao(outroConjunto) {
      const novoValorMaximo = Math.max(this.valorMaximo, outroConjunto.valorMaximo);
      const resultadoConjunto = new ConjuntoDeInteiros(novoValorMaximo);
      for (let i = 0; i <= novoValorMaximo; i++) {
        resultadoConjunto.conjunto[i] = (this.conjunto[i] || outroConjunto.conjunto[i]) || false;
      }
      return resultadoConjunto;
    }
  
    intersecao(outroConjunto) {
      const novoValorMaximo = Math.min(this.valorMaximo, outroConjunto.valorMaximo);
      const resultadoConjunto = new ConjuntoDeInteiros(novoValorMaximo);
      for (let i = 0; i <= novoValorMaximo; i++) {
        resultadoConjunto.conjunto[i] = this.conjunto[i] && outroConjunto.conjunto[i];
      }
      return resultadoConjunto;
    }
  
    diferenca(outroConjunto) {
      const novoValorMaximo = Math.max(this.valorMaximo, outroConjunto.valorMaximo);
      const resultadoConjunto = new ConjuntoDeInteiros(novoValorMaximo);
      for (let i = 0; i <= novoValorMaximo; i++) {
        resultadoConjunto.conjunto[i] = this.conjunto[i] && !outroConjunto.conjunto[i];
      }
      return resultadoConjunto;
    }
  
    paraString() {
      const elementos = [];
      for (let i = 0; i <= this.valorMaximo; i++) {
        if (this.conjunto[i]) {
          elementos.push(i);
        }
      }
      return `{ ${elementos.join(', ')} }`;
    }
  }
  
  const conjuntoA = new ConjuntoDeInteiros(10);
  conjuntoA.inserir(1);
  conjuntoA.inserir(3);
  conjuntoA.inserir(5);
  console.log('Conjunto A:', conjuntoA.paraString());
  
  const conjuntoB = new ConjuntoDeInteiros(15);
  conjuntoB.inserir(2);
  conjuntoB.inserir(3);
  conjuntoB.inserir(6);
  console.log('Conjunto B:', conjuntoB.paraString());
  
  const conjuntoUniao = conjuntoA.uniao(conjuntoB);
  console.log('União de A e B:', conjuntoUniao.paraString());
  
  const conjuntoIntersecao = conjuntoA.intersecao(conjuntoB);
  console.log('Interseção de A e B:', conjuntoIntersecao.paraString());
  
  const conjuntoDiferenca = conjuntoA.diferenca(conjuntoB);
  console.log('Diferença de A e B:', conjuntoDiferenca.paraString());  