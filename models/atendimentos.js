const conexao = require('../infraestrutura/conexao')
class Atendimentos {
    criar(atendimento, ){
        const sql = 'INSERT INTO Atendimentos SET ?'
        conexao.query(sql, atendimento, (err, resultados) => {
            if (err) {
                console.log(err);
            } else {
            console.log(resultados);
            }
        })
    }
}

module.exports = new Atendimentos