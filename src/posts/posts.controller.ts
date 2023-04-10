import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";


@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.postService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get("author/:userId")
  async findAllByAuthor(@Param("userId") userId: string) {
    return this.postService.findAllByAuthor(userId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto);
  }

}
