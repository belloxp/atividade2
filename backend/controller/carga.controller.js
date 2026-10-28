const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if (!valores.descricao || !valores.peso || !valores.volume || !valores.codRastreio || !valores.idMotorista) {
        return res.status(400).json({ message: 'Todos os campos (descricao, peso, volume, codRastreio, idMotorista) são obrigatórios!' })
    }
    if (!Number.isInteger(Number(valores.codRastreio))) {
        return res.status(400).json({ message: 'O código de rastreio deve ser numérico!' })
    }
    if (valores.peso <= 0 || valores.volume <= 0) {
        return res.status(400).json({ message: 'Peso e volume devem ser maiores que zero!' })
    }
    try{
        const motorista = await Motorista.findByPk(valores.idMotorista)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista informado não existe!' })
        }

        const rastreio = await Carga.findOne({ where: { codRastreio: valores.codRastreio } })
        if (rastreio) {
            return res.status(409).json({ message: 'Código de rastreio já cadastrado!' })
        }

        await Carga.create({
            descricao: valores.descricao,
            peso: valores.peso,
            volume: valores.volume,
            codRastreio: valores.codRastreio,
            idMotorista: valores.idMotorista
        })
        return res.status(201).json({ message: 'Carga cadastrada com sucesso!' })
    }catch(err){
        console.error('Erro ao cadastrar carga:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar carga!' })
    }
}

const listar = async (req, res) => {
    try {
        const cargas = await Carga.findAll()
        let resultado = []

        cargas.forEach((el)=>{
            resultado.push({
                codCarga: el.codCarga,
                descricao: el.descricao,
                peso: el.peso,
                volume: el.volume,
                codRastreio: el.codRastreio,
                idMotorista: el.idMotorista
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar cargas:', err)
        return res.status(500).json({ message: 'Erro ao listar cargas!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const carga = await Carga.findByPk(id)
        if (!carga) {
            return res.status(404).json({ message: 'Carga não encontrada!' })
        }

        return res.status(200).json({
            codCarga: carga.codCarga,
            descricao: carga.descricao,
            peso: carga.peso,
            volume: carga.volume,
            codRastreio: carga.codRastreio,
            idMotorista: carga.idMotorista
        })
    } catch (err) {
        console.error('Erro ao consultar carga:', err)
        return res.status(500).json({ message: 'Erro ao consultar carga!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const carga = await Carga.findByPk(id)
        if (!carga) {
            return res.status(404).json({ message: 'Carga não encontrada!' })
        }

        if (valores.idMotorista) {
            const motorista = await Motorista.findByPk(valores.idMotorista)
            if (!motorista) {
                return res.status(404).json({ message: 'Motorista informado não existe!' })
            }
        }

        if (valores.codRastreio && !Number.isInteger(Number(valores.codRastreio))) {
            return res.status(400).json({ message: 'O código de rastreio deve ser numérico!' })
        }

        const dadosAtualizados = { ...valores }

        await Carga.update(dadosAtualizados, { where: { codCarga: id } })
        return res.status(200).json({ message: 'Carga atualizada com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar carga:', err)
        return res.status(500).json({ message: 'Erro ao atualizar carga!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const carga = await Carga.findByPk(id)
        if (!carga) {
            return res.status(404).json({ message: 'Carga não encontrada!' })
        }

        await Carga.destroy({ where: { codCarga: id } })
        return res.status(200).json({ message: 'Carga excluída com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar carga:', err)
        return res.status(500).json({ message: 'Erro ao apagar carga!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }
