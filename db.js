import dotenv from 'dotenv'
import http from 'http'
import { neon } from '@neondatabase/serverless'
import postgres from 'postgres'

dotenv.config();

export const sql = neon(process.env.DATABASE_URL);