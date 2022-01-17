import { Model, Primary, Column } from "https://deno.land/x/cotton@v0.7.5/mod.ts";

@Model('users')
export class User {
  @Primary()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}