import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getUser() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
}
