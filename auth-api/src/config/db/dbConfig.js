import Sequelize from 'sequelize';

const sequelize = new Sequelize("auth-db", "admin", "123456", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        frezzeTableName: true,
    },
});

sequelize.authenticate().then(() => {
    console.info("Connection has been stablished!");
}).catch((err) => {
    console.error("Unable to connect to the database.");
    console.error(err.message);
});

export default sequelize;