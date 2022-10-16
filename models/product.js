import BaseModel from './base-model.js';
import { User } from './user.js';

let Sequelize;
let sequelize;
export class Product extends BaseModel {
  static initialize() {
    Sequelize = super.getSequelizeInstance()
    sequelize = super.getDBConnection()
  };
}

Product.initialize();

Product.init({
  // attributes
  Id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Reference: {
    type: Sequelize.STRING(36),
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false
  },
  Price: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  Currency: {
    type: Sequelize.STRING(50),
    defaultValue: 'USD',
    allowNull: false
  },
  Description: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  UserId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'User',
      key: 'Id'
    },
    field: 'UserId'
  },
  IsDeleted: {
    type: Sequelize.INTEGER(4),
    defaultValue: '0',
    field: 'IsDeleted'
  },
  CreatedOn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  UpdatedOn: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'product',
  timestamps: false,
  tableName: 'product'
});

Product.belongsTo(User, { as: 'user', foreignKey: 'UserId' });

// sequelize.sync();  