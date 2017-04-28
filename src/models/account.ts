import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize, Instance } from 'sequelize';

export interface AccountAttributes {
  id: string;
  username: string;
  password: string;
}

export interface AccountInstance extends Instance<AccountAttributes> {
  dataValues: AccountAttributes;
}

export default function(sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<AccountInstance, AccountAttributes> {
  const Account = sequelize.define<AccountInstance, AccountAttributes>('Account', {
    id: { type: dataTypes.UUID, primaryKey: true },
    username: { type: dataTypes.STRING, allowNull: false },
    password: { type: dataTypes.STRING, allowNull: false }
  }, {
    tableName: 'accounts',
    indexes: [],
    classMethods: {},
    timestamps: true,
  });

  return Account;
}