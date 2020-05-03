const Pool = require('pg').Pool;

const config = require('../config/config');
const {pinoLogger} = require('../config/logger/pinoLogger');
const {winstonLogger} = require('../config/logger/winstonLogger');
const {getApiKey} = require('../util/apiKeyGenertor');

const pool = new Pool(config.dbConfig);

const getUsers = async () => {
    try {
        pinoLogger.debug("Getting all users from DB");
        winstonLogger.debug("Getting all users from DB");
        let result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        return result.rows;
    } catch (e) {
        pinoLogger.error("error in getting users", e);
        winstonLogger.error("error in getting users", e);
    }
};

const getUserById = async (id) => {
    try {
        pinoLogger.debug("Getting user whose id is %s ", id);
        winstonLogger.debug("Getting user whose id is %s ", id);
        let result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (e) {
        pinoLogger.error("error in getting user", e);
        winstonLogger.error("error in getting user", e);
    }
};

const createUser = async (fName, lName, email) => {
    try {
        let apiKey = getApiKey();
        pinoLogger.debug("Creating user where email is %s, fName is %s, lName is %s", email, fName, lName);
        winstonLogger.debug("Creating user where email is %s, fName is %s, lName is %s", email, fName, lName);
        await pool.query('INSERT INTO users (first_name, last_name, email,api_key) VALUES ($1,$2, $3, $4)', [fName, lName, email, apiKey]);
    } catch (e) {
        pinoLogger.error("error in saving user", e);
    }
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {firstName, lastName, email} = req.body;
    pinoLogger.debug("Updating user having id %s with email is %s, fName is %s, lName is %s", id, email, firstName, lastName);
    winstonLogger.debug("Updating user having id %s with email is %s, fName is %s, lName is %s", id, email, firstName, lastName);
    pool.query(
        'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',
        [firstName, lastName, email, id],
        (error, results) => {
            if (error) {
                pinoLogger.error("error in updating user", error);
                winstonLogger.error("error in updating user", error);
            } else {
                res.status(200).json({message: `User updated having id ${id}`});
            }
        });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pinoLogger.debug("Deleting user having id %s", id);
    winstonLogger.debug("Deleting user having id %s", id);
    pool.query('DELETE FROM users WHERE id = $1', [id])
        .then(result => {
            res.send({message: `User deleted successfully id - ${id}`})
        })
        .catch(errr => {
            pinoLogger.error("Error in deleting user",errr);
            winstonLogger.error("Error in deleting user",errr);
            res.send({message : `Error in deleting User id - ${id}`});
        });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

//curl -XPOST --data "firstName=Amit&lastName=Amit&email=amit.arora15@gmail.com"  "http://localhost:4000/users"
// curl -XDELETE"http://localhost:4000/users/2"
//curl -XPUT --data "firstName=Medhansh&lastName=Arora&email=dimvya.arora02@gmail.com" "http://localhost:4000/users/2"