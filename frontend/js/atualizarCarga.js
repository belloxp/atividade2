const atualizar = document.getElementById('atualizar')
const resposta = document.getElementById('resposta')

atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.getElementById('id').value

    const valores = {
        descricao: document.getElementById('descricao').value,
        peso: Number(document.getElementById('peso').value),
        volume: Number(document.getElementById('volume').value),
        codRastreio: Number(document.getElementById('codRastreio').value),
        idMotorista: Number(document.getElementById('idMotorista').value)
    }

    // envia apenas os campos preenchidos
    Object.keys(valores).forEach((campo) => {
        if (valores[campo] === '' || valores[campo] === 0) {
            delete valores[campo]
        }
    })

    fetch(`http://localhost:3000/carga/${id}`, {
        method: 'PUT',
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
