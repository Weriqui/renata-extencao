
async function pesquisa_telefone(telefone) {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "__cf_bm=toff7lGalgTjSlHTJtrbRAglaQJw_.ePBqwO5R8PZSs-1729504956-1.0.1.1-mQsH3iuyXYqHFKI7rPrmh2Iraw_xCOrDqPwEhCM0HNOlXDNv4OJHV50LPKUpKNcI9Rrm7ud6sLW4bES02oFU9Q");
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    
    try {
        const response = await fetch(`https://api.pipedrive.com/v1/persons/search?term=${telefone}&api_token=6c7d502747be67acc199b483803a28a0c9b95c09`, requestOptions);
        const result = await response.json();
        const items = result.data.items;

        for (const element of items) {
            const deal = await detalhes_negocio(element.item.id);
            if (deal.data[0].user_id.name === "ADMINISTRATIVO") {
                return deal;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function detalhes_negocio(id) {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "__cf_bm=toff7lGalgTjSlHTJtrbRAglaQJw_.ePBqwO5R8PZSs-1729504956-1.0.1.1-mQsH3iuyXYqHFKI7rPrmh2Iraw_xCOrDqPwEhCM0HNOlXDNv4OJHV50LPKUpKNcI9Rrm7ud6sLW4bES02oFU9Q");
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    
    const response = await fetch(`https://api.pipedrive.com/v1/persons/${id}/deals?status=open&api_token=6c7d502747be67acc199b483803a28a0c9b95c09`, requestOptions);
    return response.json();
}

async function busca_usuarios(){
  let myHeaders = new Headers();
  const select = document.querySelector('#prop_negocio');
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Cookie", "__cf_bm=uZLXsan3EYIr0jXLITKQvw2diO7swzKAuu11ClJqL8Y-1707158030-1-ATQv7mQdA2TBU1bCrsLXh8Ggq/xnMpFiZ0nG3sCLUIe8wMEZvP/mUo25grW940UiyOM3V2gwLdB2QaFEKJ1wWag=");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
  const response = await fetch("https://api.pipedrive.com/v1/users?api_token=6c7d502747be67acc199b483803a28a0c9b95c09", requestOptions)
  const result = await response.json()
  const data = await result.data
  let option = '<option value="">Selecione</option>\n '
    for(usuario of data){
        if(usuario.active_flag){
          option+=`<option value="${usuario.id}">${usuario.name}</option>\n`
        }
    }
  select.innerHTML =  option
}

async function busca_etapas(){
  let myHeaders = new Headers();
  const select = document.querySelector('#type_negocio');
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Cookie", "__cf_bm=uZLXsan3EYIr0jXLITKQvw2diO7swzKAuu11ClJqL8Y-1707158030-1-ATQv7mQdA2TBU1bCrsLXh8Ggq/xnMpFiZ0nG3sCLUIe8wMEZvP/mUo25grW940UiyOM3V2gwLdB2QaFEKJ1wWag=");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
  const response = await fetch("https://api.pipedrive.com/v1/stages?pipeline_id=11&api_token=6c7d502747be67acc199b483803a28a0c9b95c09", requestOptions)
  const result = await response.json()
  const data = await result.data
  let option = '<option value="">Selecione</option>\n '
    for(etapa of data){
        if(etapa.active_flag){
          option+=`<option value="${etapa.id}">${etapa.name}</option>\n`
        }
    }
  select.innerHTML =  option
}


document.addEventListener('DOMContentLoaded', async function() {
  const botao = document.getElementById('submit');
  const conteudo = document.getElementById('conteudo');
  const alterar = document.getElementById('alterar');
  const modal = document.querySelector('dialog')
  const tudo = document.getElementById('tudo')
  document.getElementById('busca').value = localStorage.getItem('busca');

    document.getElementById('busca').addEventListener('input', function() {
        localStorage.setItem('busca', this.value);
    });
    botao.addEventListener('click', async function() {
        let input = document.getElementById('busca');
        let titulo = document.getElementById('titulo');
        let nome = document.getElementById('nome');
        let telefone = document.getElementById('telefone');
        modal.innerHTML = '<img src="https://usagif.com/wp-content/uploads/loading-63.gif" alt=""></img>'
        modal.setAttribute('id','carregando')
        tudo.style.opacity = '30%'
        modal.showModal()

        const resultado = await pesquisa_telefone(input.value)
      
        if (typeof resultado === "undefined") {
            conteudo.style.display = 'none';
            modal.innerHTML = '<h1 id="alerta">NEGÓCIO NÃO ENCONTRADO</h1> <button>OK</button>';
            const buttonClose = document.querySelector("dialog button");
            modal.removeAttribute('id')
            tudo.style.opacity = '100%'
            buttonClose.onclick = function () {
                modal.close()
            }
        } else {
            titulo.textContent = resultado['data'][0]['title'];
            console.log(resultado['data'][0])
            nome.textContent = resultado['data'][0]['person_id']['name'];
            telefone.textContent = resultado['data'][0]['person_id']['phone'][0]['value'];
            conteudo.style.display = 'block';
            localStorage.setItem('dados', JSON.stringify(resultado)); // Armazena os dados como uma string JSON
            busca_etapas()
            busca_usuarios()
            modal.close()
            modal.innerHTML = '<h1 id="alerta"></h1> <button>OK</button>'
            modal.removeAttribute('id')
            tudo.style.opacity = '100%'
        }
    });

    alterar.addEventListener('click', async () => {
        let anuncio_origem = document.querySelector("#anuncio_origem").value
        let etapa = document.querySelector("#type_negocio").value
        let proprietario = document.querySelector("#prop_negocio").value
        let notas = document.querySelector("#mensagem").value
        modal.innerHTML = '<img src="https://usagif.com/wp-content/uploads/loading-63.gif" alt=""></img>'
        modal.setAttribute('id','carregando')
        tudo.style.opacity = '30%'
        modal.showModal()
        if(notas =='' && proprietario ==''){
            modal.innerHTML = '<h1 id="alerta">Você não selecionou nenhum dado para alteração</h1> <button>OK</button>';
            const buttonClose = document.querySelector("dialog button");
            modal.removeAttribute('id')
            tudo.style.opacity = '100%'
            buttonClose.onclick = function () {
                modal.close()
            }
        } else if (proprietario != ''| notas ==''){
            // Recupere os dados armazenados no localStorage
            let dados = JSON.parse(localStorage.getItem('dados'));
            let id_negocio = dados['data'][0]["id"]; // Corrigido para acessar a propriedade correta
            let pessoa_id = dados['data'][0]['person_id']["value"]; // Corrigido para acessar a propriedade correta
        
            const alterar = await alterar_pessoa_negocio(pessoa_id,anuncio_origem,id_negocio,etapa,proprietario,notas)

            if(alterar) {
                modal.innerHTML = '<h1 id="alerta">Alterações realizadas com sucesso</h1> <button>OK</button>';
                const buttonClose = document.querySelector("dialog button");
                modal.removeAttribute('id')
                tudo.style.opacity = '100%'
                buttonClose.onclick = function () {
                    modal.close()
                }                    
            } else {
                modal.innerHTML = '<h1 id="alerta">As alterações não foram realizadas</h1> <button>OK</button>';
                const buttonClose = document.querySelector("dialog button");
                modal.removeAttribute('id')
                tudo.style.opacity = '100%'
                buttonClose.onclick = function () {
                    modal.close()
                }
            }
        } else {
            modal.innerHTML = '<h1 id="alerta">Selecione o Assessor</h1> <button>OK</button>';
            const buttonClose = document.querySelector("dialog button");
            modal.removeAttribute('id')
            tudo.style.opacity = '100%'
            buttonClose.onclick = function () {
                modal.close()
            }
        }
    });
});

async function alterar_pessoa_negocio(id_pessoa, anuncio_origem, id_negocio, stage_id, user_id, notes) {
    try {
        const [resposta1, resposta2,resposta3] = await Promise.all([ // Correção de Promisse para Promise
            alterar_anuncio(id_pessoa, anuncio_origem),
            atualizar_negocio(id_negocio, stage_id, user_id),
            criar_nota(id_negocio,notes)
        ]);

        if (resposta1.ok && resposta2.ok && resposta3.ok) { // Corrigido de response1 para resposta1
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erro ao alterar pessoa ou negócio:", error);
        return false;
    }
}

async function alterar_anuncio(id, anuncio_origem) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    
    const raw = JSON.stringify({
        "1320e7360c43412735fb62d93f5d12de24efe8f6": anuncio_origem
    });
    
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    
    const resposta = await fetch(`https://api.pipedrive.com/v1/persons/${id}?api_token=6c7d502747be67acc199b483803a28a0c9b95c09`, requestOptions);
    return resposta;
}

async function atualizar_negocio(id, stage_id, user_id, notes) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "__cf_bm=FxRguduQJm5D.F_v_EcNDPhlRpM7M7uXhYA7dfLcMJ8-1729533123-1.0.1.1-HDlKITt.jSJCfjiSZr1zdK1Znpe6AfGdSXSxbeQ9tEeo5eLcYtKBJt5PpYfYrbIPDHjcuZhS5V9aAW7XDD0lQw");
    
    const raw = JSON.stringify({
      "stage_id": stage_id,
      "user_id": user_id,
    });
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    const resposta = await fetch(`https://api.pipedrive.com/v1/deals/${id}?api_token=6c7d502747be67acc199b483803a28a0c9b95c09`, requestOptions);
    return resposta;
}


async function criar_nota(id_negocio,mensagem){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "__cf_bm=KkWOVCkPqiJROjrv9KMCWJP5SkPaeKmA2Hi.fO3yHyc-1729535985-1.0.1.1-m_pZo_Ogr6at2vLASCd.ZTyETpDA99eBSx9ho0XcU8WfkfASSdm4dBAUFf3TEy3EeIsYIZMaij9BzGyT0Y4kzg");
    
    const raw = JSON.stringify({
      "content": mensagem,
      "deal_id": id_negocio
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    const resposta = await fetch("https://api.pipedrive.com/v1/notes?api_token=6c7d502747be67acc199b483803a28a0c9b95c09", requestOptions)
    return resposta;

}