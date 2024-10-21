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
            if (deal.data[0].creator_user_id.name === "ADMINISTRATIVO") {
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

// Use a função async corretamente para imprimir o resultado
(async () => {
    const resultado = await pesquisa_telefone("+5511995056549");
    console.log(resultado);
})();



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


