import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import { User } from '../models/user.ts';
import {hash, compareSync} from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import { UserRepository } from '../repositories/user.repository.ts';

export const Register = async ({request, response}: RouterContext) => {
  try {
    const body = await request.body().value;

    const user = new User();
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.password = await hash(body.password);
  
    const userRepository = new UserRepository;
  
    response.body = await userRepository.create(user);
  } catch (e) {
    console.log(e);
    response.status = 400
  }
}

export const Login = async ({request, response}: RouterContext) => {
  const {email, password} = await request.body().value;

  const userRepository = new UserRepository();
  const user = await userRepository.findOne('email', email);

  if (!user) {
    response.status = 404;
    response.body = {
      message: 'User not found!'
    }
    return;
  }

  if (!compareSync(password, user.password)) {
    response.status = 401;
    response.body = {
      message: 'Incorrect password!'
    }
    return;
  }

  response.body = user;

}