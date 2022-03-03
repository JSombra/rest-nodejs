module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Rota de atendimentos, e está realizando um GET'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.send('Você está na rota de antendimentos, e está realizando um POST')
        
    })
    
}