const token = localStorage.getItem('token')
const nomeFuncionario = localStorage.getItem('nomeFuncionario')

// sistema de uso interno: sem login não acessa a página principal
if (!token) {
    location.href = './html/login.html'
}

document.getElementById('funcionario_logado').innerText = nomeFuncionario
document.getElementById('boas_vindas').innerText = `Bem-vindo(a), ${nomeFuncionario}!`

document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.clear()
    location.href = './html/login.html'
})
