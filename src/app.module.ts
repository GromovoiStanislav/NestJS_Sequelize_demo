import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "sqlite",
      database: ":memory:",
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
    UsersModule
  ]
})
export class AppModule {
}
