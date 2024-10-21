if (resultado['resposta'] === 'Lead não encontrado') {
    conteudo.style.display = 'none';
    modal.innerHTML = '<h1 id="alerta">LEAD NÃO ENCONTRADO</h1> <button>OK</button>';
    const buttonClose = document.querySelector("dialog button");
    modal.removeAttribute('id')
    tudo.style.opacity = '100%'
    buttonClose.onclick = function () {
        modal.close()
    }
} else {
    titulo.textContent = resultado['titulo-lead'];
    produto.textContent = resultado['produto'];
    nome.textContent = resultado['nome'];
    email.textContent = resultado['email'];
    telefone.textContent = resultado['telefone'];
    nome_empresa.textContent = resultado['titulo-lead']; // Corrigido o nome da chave
    endereco.textContent = resultado['endereco'];
    cnpj.textContent = resultado['cnpj']
    document.getElementById(resultado['tipo-contato']).selected = true;
    conteudo.style.display = 'block';
    localStorage.setItem('dados', JSON.stringify(resultado)); // Armazena os dados como uma string JSON
    modal.close()
    modal.innerHTML = '<h1 id="alerta"></h1> <button>OK</button>'
    modal.removeAttribute('id')
    tudo.style.opacity = '100%'
}
});