import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RolesModule } from "../roles/roles.module";


@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
}
