import {Router} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Register, Login} from '../controllers/auth.controller.ts';
import { RegisterValidation } from '../validations/register.validations.ts';
import { LoginValidation } from '../validations/login.validations.ts';

const router = new Router();
router
  .post('/api/register', RegisterValidation, Register)
  .post('/api/login', LoginValidation, Login);

export default router;