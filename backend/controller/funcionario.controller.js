const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if (!valores.nome || !valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Todos os campos nome, email, senha, são obrigatórios!' })
    }
    try{
        const senhaCriptografada = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCriptografada
        })
        return res.status(201).json({ message: 'Funcionario cadastrado com sucesso!' })
    }catch(err){
        console.error('Erro ao cadastrar Funcionario:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar Funcionario!' })
    }
}

const listar = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll()
        let resultado = []

        funcionarios.forEach((el)=>{
            resultado.push({
                codFuncionario: el.codFuncionario,
                nome: el.nome,
                email: el.email
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar funcionarios:', err)
        return res.status(500).json({ message: 'Erro ao listar funcionarios!' })
    }
}

module.exports = {cadastrar,listar}
