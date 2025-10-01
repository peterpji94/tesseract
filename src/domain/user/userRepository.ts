import {DataTypes, Sequelize, Model, InferAttributes, InferCreationAttributes} from 'sequelize';

import {User} from './User';
import {UserDto} from './userTypes';
import type {ClientError} from '../../types';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
}

export class UserRepository implements IUserRepository {
  private userModel: typeof UserModel;
  constructor(db: Sequelize) {
    this.userModel = defineUserModel(db);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users.map((u) => new User(u.get({plain: true})));
  }

  async findByEmail(email: string): Promise<User | null> {
    // Implement actual data fetching logic here
    const found = await this.userModel.findOne({where: {email}});
    if (!found) return null;
    return new User(found.get({plain: true}));
  }

  async create(user: User): Promise<User> {
    try {
      const created = await this.userModel.create({id: user.id, email: user.email});
      return new User(created.get({plain: true}));
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError')
        throw new ClientError('User already exists', 400);
      throw error;
    }
  }
}

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> implements UserDto {
  declare id: string;
  declare email: string;
}

const defineUserModel = (sequelize: Sequelize) => {
  return UserModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      modelName: 'User',
    }
  );
};
