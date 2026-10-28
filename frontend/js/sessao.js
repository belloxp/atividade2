// usado em todas as páginas protegidas (pasta html)
const token = localStorage.getItem('token')
const nomeFuncionario = localStorage.getItem('nomeFuncionario')

if (!token) {
    location.href = './login.html'
}

document.getElementById('funcionario_logado').innerText = nomeFuncionario

document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.clear()
    location.href = './login.html'
})

// token expirado (180 minutos) ou inválido: o backend responde 401 e o funcionário volta para o login
function verificarSessao(res) {
    if (res.status === 401) {
        localStorage.clear()
        alert('Sessão expirada! Faça login novamente.')
        location.href = './login.html'
    }
    return res.json()
}
