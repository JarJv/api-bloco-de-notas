import { fastify } from 'fastify'

//import { DatabaseMemory } from './database-memory.js' 
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

// Endpoints de notas

server.post('/notas', async(request, reply) => {
const {note_title, note_content, note_owner} = request.body

    await database.createNote({
        note_title,
        note_content,
        note_owner
    })

    return reply.status(201).send()
})
server.get('/notas', async(request, reply) => {
    const {search, owner} = request.query
    const notes = await database.listNote(search, owner)

    return notes
})

server.put('/notas/:id', async (request, reply) => {
    const notasId = request.params.id
    const {note_title, note_content} = request.body

    await database.updateNote(notasId, {
        note_title,
        note_content
    })
    return reply.status(204).send()
})

server.delete('/notas/:id', async (request, reply) => {
    const notasId = request.params.id

    await database.deleteNote(notasId)
    return reply.status(204).send()
})

//Endpoints de usuários

server.post('/users', async(request, reply) => {
const {user_name, user_email, user_password} = request.body

    await database.createUser({
        user_name,
        user_email,
        user_password
    })

    return reply.status(201).send()
})
server.get('/users', async(request, reply) => {
    const search = request.query.search
    const users = await database.listUser(search)

    return users
})

server.put('/users/:id', async (request, reply) => {
    const userId = request.params.id
    const {user_name, user_email} = request.body

    await database.updateUser(userId, {
        user_name,
        user_email
    })
    return reply.status(204).send()
})

server.delete('/users/:id', async (request, reply) => {
    const userId = request.params.id

    await database.deleteUser(userId)
    return reply.status(204).send()
})


server.listen({
    port: 8080,
    host: '0.0.0.0'
})