const cadastrar = document.getElementById('cadastrar')
const resposta = document.getElementById('resposta')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch('http://localhost:3000/funcionario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar funcionario:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})