import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize, Instance } from 'sequelize';

export interface MonsterAttributes {
  id: number;
  name: string;
  description: string;
  hp: number;
  exp: number;
}

export interface MonsterInstance extends Instance<MonsterAttributes> {
  dataValues: MonsterAttributes;
}

export default function(sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<MonsterInstance, MonsterAttributes> {
  const Monster = sequelize.define<MonsterInstance, MonsterAttributes>('Monster', {
    id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: dataTypes.STRING, allowNull: false },
    description: { type: dataTypes.TEXT, allowNull: true },
    hp: { type: dataTypes.INTEGER },
    exp: { type: dataTypes.INTEGER },
  }, {
    tableName: 'monsters',
    indexes: [],
    classMethods: {},
    timestamps: false,
  });

  return Monster;
}