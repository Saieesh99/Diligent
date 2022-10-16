import BaseModel from './base-model.js';

let Sequelize;
let sequelize;
export class User extends BaseModel {
  static initialize() {
    Sequelize = super.getSequelizeInstance()
    sequelize = super.getDBConnection()
  };
}

User.initialize();

User.init({
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
  FirstName: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  LastName: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  Username: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  Password: {
    type: Sequelize.STRING(90),
    allowNull: false
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
  modelName: 'user',
  timestamps: false,
  tableName: 'user'
});



  // !(async () => {
  //   let syncProcess = await sequelize.sync();  
  //   // console.log('test syncing  ',syncProcess)
  // });
