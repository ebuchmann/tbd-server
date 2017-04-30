import { Model } from 'objection';

export default class Monster extends Model {
  readonly id: number;
  name: string;
  description: string;
  hp: number;
  exp: number;

  static tableName = 'Monster';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: 'string' },
      hp: { type: 'integer' },
      exp: { type: 'integer' },
    }
  };
}