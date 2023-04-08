import { Module, OnModuleInit } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./models/roles.model";
import { UserRoles } from "./models/user-roles.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, UserRoles])
  ],
  exports: [RolesService]
})
export class RolesModule implements OnModuleInit {
  constructor(private roleService: RolesService) {
  }

  onModuleInit(): any {
    this.roleService.createRole({ value: "USER", description: "Пользователь" });
    //this.roleService.createRole({ value: "ADMIN", description: "Администратор" });
  }
}
