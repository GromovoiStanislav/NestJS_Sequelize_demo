import { Body, Controller, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";


@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

}
