import sequelize from "./config/database";

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err: Error) => {
        console.error('Unable to connect to the database:', err);
    });
