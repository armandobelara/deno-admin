import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import { User } from '../models/user.ts';
import {hash, compareSync} from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import { UserRepository } from '../repositories/user.repository.ts';
import { JwtService } from '../services/jwt.service.ts';

export const Register = async ({request, response}: RouterContext) => {
  try {
    const body = await request.body().value;

    const user = new User();
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.password = await hash(body.password);
  
    const userRepository = new UserRepository;
    const {password, ...result} = await userRepository.create(user);
  
    response.body = result;
  } catch (e) {
    console.log(e);
    response.status = 400
  }
}

export const Login = async ({request, response, cookies}: RouterContext) => {
  try {
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
  
    const jwtService = new JwtService();
    const jwt = await jwtService.create(user.id);
    cookies.set('jwt', jwt, {httpOnly: true});
  
    response.body = {
      jwt
    };
  } catch (e) {
    console.log(e);
    response.status = 400;
  }
}

export const Me = async ({response, cookies}: RouterContext) => {
  const jwtService = new JwtService();
  const {id} = await jwtService.verify(cookies);

  const userRepository = new UserRepository();
  const {password, ...result}: any = await userRepository.findOne('id', id);

  response.body = result;
}