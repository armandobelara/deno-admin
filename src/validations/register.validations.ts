import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {validate, required, isEmail} from 'https://deno.land/x/validasaur@v0.15.0/mod.ts';

export const RegisterValidation = async ({request, response}: RouterContext, next: Function) => {
  const body = await request.body().value;

  const [ passes, errors ] = await validate(body, {
    first_name: required,
    last_name: required,
    email: [required, isEmail],
    password: required,
    confirm_password: required
  });

  if (!passes) {
    response.status = 400,
    response.body = errors;
    return;
  }
  
  if (body.password !== body.confirm_password) {
    response.status = 400,
    response.body = {
      error: 'The passwords do not match!'
    }
    return;
  }

  await next();
}