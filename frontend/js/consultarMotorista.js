const consultar = document.getElementById('consultar')
const resposta = document.getElementById('resposta')

consultar.addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/motorista/${id}`, {
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
        corpo += `<td>${el.codMotorista}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.CNH}</td>`
        corpo += `<td>${el.CPF}</td>`
        corpo += `<td>${el.telefone}</td>`
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
                <th>Nome</th>
                <th>CNH</th>
                <th>CPF</th>
                <th>Telefone</th>
            </tr>
        </thead>
    `
}
