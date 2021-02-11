module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    define: {
        timestampes: true, // Define duas colunas created_at e edited_at
        underscored: true, // Não define o padrão camel case e sim com underline
        underscoredAll: true
    }
};
