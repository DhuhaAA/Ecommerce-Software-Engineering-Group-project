import express from 'express';
import {registerUser} from '../controllers/accountController.js';
import {loginUser} from '../controllers/accountController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;