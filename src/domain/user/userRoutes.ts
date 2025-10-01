import {Router, Request, Response, NextFunction} from 'express';
import Joi from 'joi';

import {createUser} from './userManagement';
import {UserDomainContext} from './userTypes';

const USER_POST_SCHEMA = Joi.object({email: Joi.string().email().required()}).required();

export function getUserRoutes(context: UserDomainContext) {
  const router = Router();
  router.post('/', postHandler);
  router.get('/', getHandler);
  return router;

  async function getHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await context.userRepository.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async function postHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const {error, value} = USER_POST_SCHEMA.validate(req.body);
      if (error) return res.status(400).json({error: error.details[0].message});

      const {email} = value;
      const user = await createUser(email, context);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}
