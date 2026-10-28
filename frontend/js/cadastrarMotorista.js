const cadastrar = document.getElementById('cadastrar')
const resposta = document.getElementById('resposta')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        CNH: document.getElementById('cnh').value,
        CPF: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch('http://localhost:3000/motorista', {
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
