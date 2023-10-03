const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssc',
  password: 'postgres',
  port: 5432,
});

const getUsers = async (request, response) => {
  const users = await pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const validateUser = async (request, response) => {
  let submittedUsername = request.body.username;
  let query = 'SELECT username, password FROM users WHERE username=\'' + submittedUsername + '\''
  const users = await pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    let hold = results.rows;
    let password = hold[0].password
    let success = password == request.body.password;
    response.status(200).json({"value": success});
  })
}

module.exports = {
    getUsers,
    validateUser
  }