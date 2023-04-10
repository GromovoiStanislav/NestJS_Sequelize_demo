import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./models/posts.model";
import { UsersModule } from "../users/users.module";


@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([Post]),
    UsersModule],
})
export class PostsModule {}
