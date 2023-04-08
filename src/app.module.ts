import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "sqlite",
      database: ":memory:",
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
    UsersModule,
    PostsModule,
    RolesModule
  ]
})
export class AppModule {
}
