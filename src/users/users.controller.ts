import {Controller,Post,Body,Get,Param,Patch,Delete,} from '@nestjs/common';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    async createOneUser(@Body('firstName') firstName: string, @Body('lastName') lastName: string ) {
      const generatedId = await this.usersService.createOneUser(
        firstName,
        lastName,
      );
    //   console.log(generatedId)
      return { data: generatedId };
    }
  
    @Get()
    getAllUsers() {
      return this.usersService.getAllUsers();
    }
  
    @Get(':id')
    getOneUser(@Param('id') userId: string) {
      return this.usersService.getOneUser(userId);
    }
  
    @Patch(':id')
    updateUser(@Param('id') userId: string,@Body('firstName') userFirstName: string,@Body('lastName') userLastName: string,) {
      this.usersService.updateUser(userId, userFirstName, userLastName);
      return "Update Success";
    }
  
    @Delete(':id')
    deleteUser(@Param('id') userId: string) {
      this.usersService.deleteUser(userId);
      return "Delete Success";
    }
  }
  