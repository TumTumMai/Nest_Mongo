import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Create One User
   *
   * @param firstName
   * @param lastName
   */
  async createOneUser(firstName: string, lastName: string) {
    const newUser = new this.userModel({
        firstName,
        lastName,
    });
    const result = await newUser.save();
    
    return result;
  }

  /**
   * Get All Users
   */
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
      
    }));
  }

  /**
   * Get One User
   * @param userId
   */
  async getOneUser(userId: string) {
    const user = await this.findUser(userId);
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
  
    };
  }

  async updateUser(
    userId: string,
    firstName: string,
    lastName: string,
    
  ) {
    const modUser = await this.findUser(userId);

    //Only modify Values passed
    if (firstName) modUser.firstName = firstName;
    if (lastName) modUser.lastName = lastName;


    modUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user: any;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
