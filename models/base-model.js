import { dbConnection } from '../config/dbConnection.js';
import Sequelize from 'sequelize';

const Model = Sequelize.Model;
export default class BaseModel extends Model {
    static getSequelizeInstance() {
        return Sequelize;
    }
    static getDBConnection() {
        return dbConnection;
    }
}

