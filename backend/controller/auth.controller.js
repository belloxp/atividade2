const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async(req,res)=>{
    const valores = req.body
    if(!valores.email || !valores.senha){
        return res.status(400).json({message : "preencha todos os campos para realizar o login"})
    }
    try{
        const funcionario = await Funcionario.findOne({where : {email : valores.email}})
        if(!funcionario){
            return res.status(401).json({message : "email ou senha incorretos"})
        }

        const bytes = cryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDB = bytes.toString(cryptoJS.enc.Utf8)

        if(senhaDB !== valores.senha){
            return res.status(401).json({message : "email ou senha incorretos"})
        }

        const centoOitentaMinutos = 180*60*1000
        const tempoLimite = Date.now()+centoOitentaMinutos

        const payload ={
            email: valores.email,
            expiraEm : tempoLimite
        }
        const token = cryptoJS.AES.encrypt(JSON.stringify(payload),CHAVE_SECRETA).toString()
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: funcionario.nome
        })
    }catch(err){
        console.error('Erro ao tentar fazer o login:', err)
        return res.status(500).json({ message: 'Erro ao tentar fazer o login!' })
    }
}
module.exports = {login}
