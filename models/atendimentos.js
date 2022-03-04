const moment = require('moment')

const conexao = require('../infraestrutura/conexao')
class Atendimentos {
    criar(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataEValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEValido = atendimento.cliente.length >= 3

        const validacoes = [
            {
                nome: 'data',
                valido: dataEValida,
                mensagem: 'Data deve ser maior ou igual que a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEValido,
                mensagem: 'Cliente deve ter pelo menos 3 caracteres'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
            conexao.query(sql, atendimentoDatado, (err, resultados) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(resultados);
                }
            })
        }
    }
}

module.exports = new Atendimentos