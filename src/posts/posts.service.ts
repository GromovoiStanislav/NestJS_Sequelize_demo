import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./posts.model";

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post
  ) {
  }

  async create(dto: CreatePostDto): Promise<Post> {
    return this.postRepository.create({ ...dto });
  }


}
