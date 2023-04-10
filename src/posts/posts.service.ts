import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./models/posts.model";
import { UsersService } from "../users/users.service";
import { UpdatePostDto } from "./dto/update-post.dto";


@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly usersService: UsersService
  ) {
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const user = await this.usersService.findOne(dto.userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    return this.postRepository.create({ ...dto });

    // const post = await this.postRepository.create({
    //   title: dto.title,
    //   content: dto.content
    // });
    // await user.$add("posts", post.id);
    // return post;
  }


  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findByPk(id, { include: ["author"] });
    if (!post) {
      throw new NotFoundException("Пост не найден");
    }
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findAllByAuthor(userId: string): Promise<Post[]> {
    return this.postRepository.findAll({ where: { userId } });
  }

  async remove(id: string): Promise<Post> {
    //return this.postRepository.destroy({ where: { id } }); // 1 или 2

    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException("Пост не найден");
    }
    await post.destroy()
    return post;
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException("Пост не найден");
    }
    await post.update(dto)
    return post
  }
}
