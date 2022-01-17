import {Router} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {Register} from '../controllers/auth.controller.ts';

const router = new Router();
router
  .post('/api/register', Register);

export default router;