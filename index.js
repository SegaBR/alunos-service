const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getAlunos = (request, response) => {
    pool.query('SELECT * FROM alunos', (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro ao recuperar os alunos: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

const addAluno = (request, response) => {
    const { nome, matricula, cpf, periodo, curso } = request.body

    pool.query(
        'INSERT INTO alunos (nome, matricula, cpf, periodo, curso) VALUES ($1, $2, $3, $4, $5)',
        [nome, matricula, cpf, periodo, curso],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao adicionar o aluno: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Aluno criado.' })
        },
    )
}

const updateAluno = (request, response) => {
    const {id, nome, matricula, cpf, periodo, curso} = request.body
    pool.query('UPDATE alunos set nome=$1, matricula=$2, cpf=$3, periodo=$4, curso=$5 where id=$6',
        [nome, matricula, cpf, periodo, curso, id], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o aluno: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Aluno atualizado.' })
        })
}

const deleteAluno = (request, response, next) => {
    const id = parseInt(request.params.id)
    pool.query(
        'DELETE from alunos where id=$1',
        [id],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possivel remover o aluno' });
            }
            response.status(201).json({ status: 'success', 
            message: 'Aluno removido com sucesso' })
        },
    )
}

const getAlunoPorID = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM alunos where id = $1',
        [id], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ status: 'error', 
            message: 'Não foi possivel recuperar o aluno' });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/alunos')
    // GET endpoint
    .get(getAlunos)
    // POST endpoint
    .post(addAluno)
    // PUT
    .put(updateAluno)  

app.route('/alunos/:id')
    .get(getAlunoPorID) 
    .delete(deleteAluno) 


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando`)
})