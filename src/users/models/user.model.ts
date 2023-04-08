import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../../roles/models/roles.model";
import { UserRoles } from "../../roles/models/user-roles.model";
import { Post } from "../../posts/models/posts.model";


@Table({tableName: 'users'})
export class User extends Model {

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];

}
