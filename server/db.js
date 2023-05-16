import mysql from 'mysql2/promise'
import {config} from './keys.js'

export const connect = async ()=>{
  return await mysql.createConnection(config)


}


