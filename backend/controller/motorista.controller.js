// motorista deve constar os dados dele, além de CNH e cpf criptografados.
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Motorista = require('../models/Motorista')
const { Op } = require('sequelize')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if(!valores.nome || !valores.CNH || !valores.CPF || !valores.telefone){
        return res.status(400).json({message : "Todos os campos (nome, CNH, CPF, telefone) são obrigatórios!"})
    }
    if(valores.CPF.length !== 11){
        return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
    }
    try{
        const CNHcript = cryptoJS.AES.encrypt(valores.CNH, CHAVE_SECRETA).toString()
        const CPFcript = cryptoJS.AES.encrypt(valores.CPF, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            CNH : CNHcript,
            CPF :  CPFcript,
            telefone: valores.telefone
        })
        return res.status(201).json({message : "Motorista cadastrado com sucesso!"})
    }catch(err){
        console.error('Erro ao cadastrar motorista:', err)
        return res.status(500).json({message : "Erro ao cadastrar motorista!" })
    }
}

const listar = async (req, res) => {
    try {
        const motoristas = await Motorista.findAll()
        let resultado = []

        motoristas.forEach((el)=>{
            let CNHdecrypt = ''
            let CPFdecrypt = ''
            try{
                CNHdecrypt = cryptoJS.AES.decrypt(el.CNH, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
                CPFdecrypt = cryptoJS.AES.decrypt(el.CPF, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
            }catch(err){
                CNHdecrypt = 'Erro ao descriptografar'
                CPFdecrypt = 'Erro ao descriptografar'
                console.error('Erro ao descriptografar', err)
            }
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                CNH: CNHdecrypt,
                CPF: CPFdecrypt,
                telefone: el.telefone
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar motoristas:', err)
        return res.status(500).json({ message: 'Erro ao listar motoristas!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        const CNHdecrypt = cryptoJS.AES.decrypt(motorista.CNH, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        const CPFdecrypt = cryptoJS.AES.decrypt(motorista.CPF, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            CNH: CNHdecrypt,
            CPF: CPFdecrypt,
            telefone: motorista.telefone
        })
    } catch (err) {
        console.error('Erro ao consultar motorista:', err)
        return res.status(500).json({ message: 'Erro ao consultar motorista!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        const dadosAtualizados = { ...valores }

        if (valores.CPF) {
            if (valores.CPF.length !== 11) {
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }
            dadosAtualizados.CPF = cryptoJS.AES.encrypt(valores.CPF, CHAVE_SECRETA).toString()
        }

        if (valores.CNH) {
            dadosAtualizados.CNH = cryptoJS.AES.encrypt(valores.CNH, CHAVE_SECRETA).toString()
        }

        await Motorista.update(dadosAtualizados, { where: { codMotorista: id } })
        return res.status(200).json({ message: 'Motorista atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar motorista:', err)
        return res.status(500).json({ message: 'Erro ao atualizar motorista!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        await Motorista.destroy({ where: { codMotorista: id } })
        return res.status(200).json({ message: 'Motorista excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar motorista:', err)
        return res.status(500).json({ message: 'Erro ao apagar motorista!' })
    }
}

// busca por nome (aceita parte do nome)
const consultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const motoristas = await Motorista.findAll({ where: { nome: { [Op.like]: `%${nome}%` } } })

        if (motoristas.length === 0) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        let resultado = []

        motoristas.forEach((el)=>{
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                CNH: cryptoJS.AES.decrypt(el.CNH, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8),
                CPF: cryptoJS.AES.decrypt(el.CPF, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8),
                telefone: el.telefone
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao consultar motorista por nome:', err)
        return res.status(500).json({ message: 'Erro ao consultar motorista por nome!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar, consultarNome }
