const mysql = require('mysql');


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

function update(table, data, id) {
  return new Promise((resolve, reject) => {
    // UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'
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
          resolve(result[0] || null);
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