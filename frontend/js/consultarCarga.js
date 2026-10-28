const consultar = document.getElementById('consultar')
const resposta = document.getElementById('resposta')

consultar.addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/carga/${id}`, {
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
                ${criarTbody([dados])}
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
        corpo += `<td>${el.codCarga}</td>`
        corpo += `<td>${el.descricao}</td>`
        corpo += `<td>${el.peso}</td>`
        corpo += `<td>${el.volume}</td>`
        corpo += `<td>${el.codRastreio}</td>`
        corpo += `<td>${el.idMotorista}</td>`
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
                <th>Descrição</th>
                <th>Peso (kg)</th>
                <th>Volume (m³)</th>
                <th>Rastreio</th>
                <th>Motorista</th>
            </tr>
        </thead>
    `
}
