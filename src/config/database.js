require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    storage: './tests/database.sqlite',
    define: {
        timestampes: true, // Define duas colunas created_at e edited_at
        underscored: true, // Não define o padrão camel case e sim com underline
        underscoredAll: true
    }
};
