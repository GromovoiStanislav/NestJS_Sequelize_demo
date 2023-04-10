import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private roleService: RolesService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName
    });

    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    //await user.$add("role", role.id);

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Object.assign(user, dto);
    // await user.save();

    await user.update(dto)

    return user
  }


  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true }});
  }


  async findOne(id: string): Promise<User> {
    // const user = await this.userModel.findOne({
    //   where: { id },
    //   include: { all: true }
    // });

    const user = await this.userModel.findByPk(id,{ include: { all: true, nested: true }});
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    return user;
  }


  async remove(id: string): Promise<User> {
    //return this.userModel.destroy({ where: { id } }); // 1 или 2

    const user = await this.userModel.findOne({ where: { id }})
    //const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await user.destroy();
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.role);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new NotFoundException("Пользователь или роль не найдены");
  }

}
