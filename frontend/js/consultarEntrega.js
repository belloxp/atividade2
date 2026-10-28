const consultar = document.getElementById('consultar')
const resposta = document.getElementById('resposta')

consultar.addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/entrega/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => verificarSessao(res))
        .then(dados => {
            if (dados.message) {
                resposta.innerHTML = `<p>${dados.message}</p>`
                return
            }
            resposta.innerHTML = `
            <table>
                ${criarThead()}
                ${criarTbody([{ ...dados, dataFormatada: formatarData(dados.data) }])}
            </table>
            `
        })
        .catch(err => {
            console.error('Erro:', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codEntrega}</td>`
        corpo += `<td>${el.cidadeDestino}</td>`
        corpo += `<td>${el.status}</td>`
        corpo += `<td>${el.dataFormatada}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.idCarga}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Cidade Destino</th>
                <th>Status</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Carga</th>
            </tr>
        </thead>
    `
}

function formatarData(data) {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}
