import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./models/posts.model";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User } from "../users/models/user.model";


@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(User) private userRepository: typeof User
  ) {
  }

  //: Promise<Post>
  async create(dto: CreatePostDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    return this.postRepository.create({ ...dto });

    // return Post.findOrCreate({ where: { ...dto } });

    // const post = await this.postRepository.create({ ...dto });
    // await user.$add("posts", post.id);
    // return post;

  }


  async findOne(id: string): Promise<Post> {
    //const post = await this.postRepository.findByPk(id, { include: ["author"] });

    //const post = Post.findOne({ where: { id },  include: ["author"]  });

    const post = Post.findByPk(id, { include: ["author"] });

    if (!post) {
      throw new NotFoundException("Пост не найден");
    }
    return post;
  }

//: Promise<Post[]>
  async findAll() {
    // return Post.findAndCountAll()

    // return this.postRepository.findAndCountAll()

    //return Post.findAll();

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
    await post.destroy();
    return post;
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException("Пост не найден");
    }
    await post.update(dto);
    return post;
  }
}
