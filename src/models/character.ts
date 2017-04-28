import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize, Instance } from 'sequelize';

export interface CharacterAttributes {
  id: string;
  level: number;
  exp: number;
}

export interface CharacterInstance extends Instance<CharacterAttributes> {
  dataValues: CharacterAttributes;
}

export default function(sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<CharacterInstance, CharacterAttributes> {
  const Character = sequelize.define<CharacterInstance, CharacterAttributes>('Character', {
    id: { type: dataTypes.UUID, primaryKey: true },
    level: { type: dataTypes.INTEGER, allowNull: false },
    exp: { type: dataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'characters',
    indexes: [],
    classMethods: {},
    timestamps: true,
  });

  return Character;
}