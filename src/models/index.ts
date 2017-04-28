import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import * as config from 'config';
import { Sequelize } from 'sequelize';

export interface SequelizeModels {
  Account: SequelizeStatic.Model<AccountInstance, AccountAttributes>;
  Character: SequelizeStatic.Model<CharacterInstance, CharacterAttributes>;
  Monster: SequelizeStatic.Model<MonsterInstance, MonsterAttributes>;
}

class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: Sequelize;

  constructor() {
    this._basename = path.basename(module.filename);
    const dbConfig = config.get('db');

    this._sequelize = new SequelizeStatic(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbConfig
    );
    this._models = ({} as any);

    this._sequelize.sync({ force: true });

    fs.readdirSync(__dirname).filter((file: string) => {
      return (file !== this._basename) && (file !== 'interfaces');
    }).forEach((file: string) => {
      const model = this._sequelize.import(path.join(__dirname, file));
      this._models[(model as any).name] = model;
    });

    Object.keys(this._models).forEach((modelName: string) => {
      if (typeof this._models[modelName].associate === 'function') {
        this._models[modelName].associate(this._models);
      }
    });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();