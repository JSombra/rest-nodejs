const moment = require('moment')
const atendimentos = require('../controllers/atendimentos')

const conexao = require('../infraestrutura/conexao')
class Atendimentos {
    criar(atendimento, res) {
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
            conexao.query(sql, atendimentoDatado, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(atendimento);
                }
            })
        }
    }
    listar(res) {
        const sql = 'SELECT * FROM `petshop`.`Atendimentos`;'

        conexao.query(sql, (err, results)=> {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(results)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (err, results) => {
            const atendimento = results[0]
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }
    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (err, results) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
    deletaDado(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        
        conexao.query(sql, id, (err, results) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimentos