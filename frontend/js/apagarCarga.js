const apagar = document.getElementById('apagar')
const resposta = document.getElementById('resposta')

apagar.addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/carga/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
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
