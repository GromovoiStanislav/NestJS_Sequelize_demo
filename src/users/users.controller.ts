import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Post("/role")
  async addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @Delete("/role")
  async removeRole(@Body() dto: AddRoleDto) {
    return this.usersService.removeRole(dto);
  }


  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(id);
  }


  @Post(":userId/posts")
  async createPost(
    @Param("userId") userId: string,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.usersService.createPost(userId, createPostDto);
  }


  @Get(":userId/posts")
  async getPosts(@Param("userId") userId: string) {
    return this.usersService.getPosts(userId);
  }


  @Delete(":userId/posts/:postId")
  async removePost(
    @Param("userId") userId: string,
    @Param("postId") postId: string
  ) {
    return this.usersService.removePost(userId, postId);
  }

  @Put(":userId/posts/:postId")
  async updatePost(
    @Param("userId") userId: string,
    @Param("postId") postId: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.usersService.updatePost(userId, postId, updatePostDto);
  }

}
