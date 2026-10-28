const cadastrar = document.getElementById('cadastrar')
const resposta = document.getElementById('resposta')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        descricao: document.getElementById('descricao').value,
        peso: Number(document.getElementById('peso').value),
        volume: Number(document.getElementById('volume').value),
        codRastreio: Number(document.getElementById('codRastreio').value),
        idMotorista: Number(document.getElementById('idMotorista').value)
    }

    fetch('http://localhost:3000/carga', {
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
