import {create, getNumericDate} from 'https://deno.land/x/djwt@v2.1/mod.ts';

export class JwtService {
  async create(id: number) {
    const key = Deno.env.get('key') || '';
    const payload = {
      id,
      exp: getNumericDate(60 * 60 * 24) // 1 day
    }

    return await create({ alg: "HS512", typ: "JWT" }, payload, key);
  }
}