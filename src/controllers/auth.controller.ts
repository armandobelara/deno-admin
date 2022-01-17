import {RouterContext} from 'https://deno.land/x/oak@v6.4.1/mod.ts';

export const Register = async ({request, response}: RouterContext) => {
  const body = await request.body().value;

  response.body = body;
}