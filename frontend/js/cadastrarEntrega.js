const cadastrar = document.getElementById('cadastrar')
const resposta = document.getElementById('resposta')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        cidadeDestino: document.getElementById('cidadeDestino').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: Number(document.getElementById('idCarga').value)
    }

    fetch('http://localhost:3000/entrega', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
        .then(res => verificarSessao(res))
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
