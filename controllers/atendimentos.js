const Atendimentos = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Rota de atendimentos, e está realizando um GET'))

    app.post('/atendimentos', (req, res) => {
        const atendimentos = req.body

        Atendimentos.criar(atendimentos)
        res.send('POST Atendimentos')
        
    })
    
}