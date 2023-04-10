import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { Post } from "../posts/models/posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    // @InjectModel(Post) private postModel: typeof Post,
    private roleService: RolesService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName
    });

    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    // await user.$add("role", role.id);

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    // Object.assign(user, dto);
    // await user.save();
    await user.update(dto);
    return user;
  }


  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true } });
  }


  async findOne(id: string): Promise<User> {
    // const user = await this.userModel.findOne({
    //   where: { id },
    //   include: { all: true }
    // });

    const user = await this.userModel.findByPk(id, { include: { all: true, nested: true } });
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    return user;
  }


  async remove(id: string): Promise<User> {
    // return this.userModel.destroy({ where: { id } }); // 1 или 2

    const user = await this.userModel.findOne({ where: { id } });
    // const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    await user.destroy();
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.role);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new NotFoundException("Пользователь или роль не найдены");
  }

  async removePost(userId: string, postId: string): Promise<Post> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    // const post = await this.postModel.findByPk(postId);
    // const post = await Post.findByPk(postId)
    const posts = await user.$get("posts", { where: { id: postId } });
    // if (!post) {
    if (!posts.length) {
      throw new NotFoundException("Пост не найден");
    }

    // await user.$has("posts", postId); // true или false

    // await user.$remove("posts", postId);
    //await user.$remove("posts", post);
    await user.$remove("posts", posts);

    // return post;
    return posts[0];
  }

  async getPosts(userId: string): Promise<Post[]> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    return await user.$get("posts");
  }

  async createPost(userId: string, dto: CreatePostDto) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    // const post = await this.postModel.create({ ...dto })
    // const post = await Post.create({ ...dto })
    // await user.$add("posts", post);
    // return post;

    return user.$create("post", dto);
  }


  async updatePost(userId: string, postId: string, dto: UpdatePostDto) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    const posts = await user.$get("posts", { where: { id: postId } });
    if (!posts.length) {
      throw new NotFoundException("Пост не найден");
    }

    await posts[0].update(dto)
    return posts[0]

  }
}
