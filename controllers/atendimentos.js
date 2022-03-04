const atendimentos = require('../models/atendimentos')
const Atendimentos = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimentos.listar(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimentos.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimentos = req.body

        Atendimentos.criar(atendimentos, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimentos.altera(id, valores, res)
    })
    app.delete('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id)

        Atendimentos.deletaDado(id, res)
    })    
}