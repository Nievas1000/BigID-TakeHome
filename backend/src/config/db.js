import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('bigid_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});