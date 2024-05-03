import express from 'express';
import { signUp, signIn } from './user.controller.js';


export const userRouter = express.Router();

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)