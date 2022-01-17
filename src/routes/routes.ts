import {Router} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Register} from '../controllers/auth.controller.ts';
import { RegisterValidation } from '../validations/register.validations.ts';

const router = new Router();
router
  .post('/api/register', RegisterValidation, Register);

export default router;