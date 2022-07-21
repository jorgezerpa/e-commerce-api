const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const dbconf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
      if (err) {
          console.error('[db err]', err);
          setTimeout(handleCon, 2000);
      } else {
          console.log('DB Connected!');
      }
  });

  connection.on('error', err => {
      console.error('[db err]', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleCon();
      } else {
          throw err;
      }
  })
}

handleCon();

function insert(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function update(table, data, id, from) {
  return new Promise((resolve, reject) => {
      if(data.file || data.image){
        if(data.file){
          connection.query(`SELECT file FROM ${table} WHERE id=${id}`, (err, result) => {
            if (err) return reject(err);
            fs.unlink(path.join(__dirname, `/../uploads/products/${result[0].file}`), (err)=>{
              if(err){
                console.log(err);
                return reject(err);
              } 
            })
          })
        } 
        if(data.image){
          connection.query(`SELECT image FROM ${table} WHERE id=${id}`, (err, result) => {
            if (err) return reject(err);
            fs.unlink(path.join(__dirname, `/../uploads/${from}/${result[0].image}`), (err)=>{
              if(err){
                console.log(err);
                return reject(err);
              } 
            })
          })
        } 
      } //end if wrapper 
      

      connection.query(`UPDATE ${table} SET ? WHERE id=${id}`, data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function list(table) {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table}`, (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, result) => {
          if (err) return reject(err);
          resolve(result);
      })
  })
}

function remove(table, id) {
  return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result) => {
          if (err) return reject(err);
          resolve(true);
      })
  })
}



module.exports = {
  insert,
  update,
  list,
  get,
  remove,
};