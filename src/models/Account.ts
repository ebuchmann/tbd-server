import { Model } from 'objection';
import * as uuid4 from 'uuid4';

interface account {
  password: string;
}

export default class Account extends Model {
  id: string;
  username: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;

  static tableName = 'Account';

  static jsonSchema = {
    type: 'object',
    required: ['username', 'password'],

    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 1, maxLength: 16 },
      password: { type: 'string' },
      email: { type: 'string' },
    },
  };

  $beforeInsert() {
    this.id = uuid4();
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
