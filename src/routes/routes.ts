import {Router} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Register, Login, Me} from '../controllers/auth.controller.ts';
import { RegisterValidation } from '../validations/register.validations.ts';
import { LoginValidation } from '../validations/login.validations.ts';

const router = new Router();
router
  .post('/api/register', RegisterValidation, Register)
  .post('/api/login', LoginValidation, Login)
  .get('/api/user', Me);

export default router;