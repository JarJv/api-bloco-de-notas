import { sql } from  './db.js'

export class DatabasePostgres{

    async createNote(nota) {
        const {note_title, note_content, note_owner} = nota
        await sql `INSERT INTO notes (note_title, note_content, note_owner) VALUES (${note_title}, ${note_content}, ${note_owner})`
    }

    async listNote(search, nota){
        const {owner} = nota
        let notas 

        if(search){
            notas  = await sql`SELECT * FROM notes WHERE note_title ilike ${'%' + search + '%'}`
        } else {
            notas = await sql`SELECT * FROM notes WHERE note_owner = ${owner}`
        }

        return notas
    }

    async updateNote(id, nota){
        const {note_title, note_content} = nota

        await sql`UPDATE notes SET note_title = ${note_title}, note_content = ${note_content} WHERE id = ${id}`
    }

    async deleteNote(id){
        await sql`DELETE FROM notes WHERE id = ${id}`
    }

    //Funções de usuários

    async createUser(usuario) {
        const {user_name, user_email, user_password} = usuario
        await sql `INSERT INTO users (user_name, user_email, user_password) VALUES (${user_name}, ${user_email}, ${user_password})`
    }

    async listUser(search){

        let users 

        if(search){
            users  = await sql`SELECT id, user_name, user_email FROM users WHERE user_name ilike ${'%' + search + '%'}`
        } else {
            users = await sql`SELECT id, user_name, user_email FROM users`
        }

        return users
    }

    async updateUser(id, usuario){
        const {user_name, user_email} = usuario

        await sql`UPDATE users SET user_name = ${user_name}, user_email = ${user_email} WHERE id = ${id}`
    }

    async deleteUser(id){
        await sql`DELETE FROM users WHERE id = ${id}`
    }
}