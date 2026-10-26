const Entrega = require('../models/Entrega')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if (!valores.cidadeDestino || !valores.status || !valores.data || !valores.hora || !valores.idCarga) {
        return res.status(400).json({ message: 'Todos os campos (cidadeDestino, status, data, hora, idCarga) são obrigatórios!' })
    }
    if (valores.status !== 'ENTREGUE' && valores.status !== 'TRANSITO') {
        return res.status(400).json({ message: 'O status deve ser ENTREGUE ou TRANSITO!' })
    }
    try{
        await Entrega.create({
            cidadeDestino: valores.cidadeDestino,
            status: valores.status,
            data: valores.data,
            hora: valores.hora,
            idCarga: valores.idCarga
        })
        return res.status(201).json({ message: 'Entrega cadastrada com sucesso!' })
    }catch(err){
        console.error('Erro ao cadastrar entrega:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar entrega!' })
    }
}

const listar = async (req, res) => {
    try {
        const entregas = await Entrega.findAll({ order: [['data', 'DESC'], ['hora', 'DESC']] })
        let resultado = []

        entregas.forEach((el)=>{
            resultado.push({
                codEntrega: el.codEntrega,
                cidadeDestino: el.cidadeDestino,
                status: el.status,
                data: el.data,
                hora: el.hora,
                idCarga: el.idCarga
            })
        })
        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar entregas:', err)
        return res.status(500).json({ message: 'Erro ao listar entregas!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) {
            return res.status(404).json({ message: 'Entrega não encontrada!' })
        }

        return res.status(200).json({
            codEntrega: entrega.codEntrega,
            cidadeDestino: entrega.cidadeDestino,
            status: entrega.status,
            data: entrega.data,
            hora: entrega.hora,
            idCarga: entrega.idCarga
        })
    } catch (err) {
        console.error('Erro ao consultar entrega:', err)
        return res.status(500).json({ message: 'Erro ao consultar entrega!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) {
            return res.status(404).json({ message: 'Entrega não encontrada!' })
        }

        const dadosAtualizados = { ...valores }

        if (valores.status) {
            if (valores.status !== 'ENTREGUE' && valores.status !== 'TRANSITO') {
                return res.status(400).json({ message: 'O status deve ser ENTREGUE ou TRANSITO!' })
            }
        }

        await Entrega.update(dadosAtualizados, { where: { codEntrega: id } })
        return res.status(200).json({ message: 'Entrega atualizada com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar entrega:', err)
        return res.status(500).json({ message: 'Erro ao atualizar entrega!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) {
            return res.status(404).json({ message: 'Entrega não encontrada!' })
        }

        await Entrega.destroy({ where: { codEntrega: id } })
        return res.status(200).json({ message: 'Entrega excluída com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar entrega:', err)
        return res.status(500).json({ message: 'Erro ao apagar entrega!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }
