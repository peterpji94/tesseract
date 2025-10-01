import express, {Request, Response, json, text} from 'express';

import {getUserRoutes} from '../domain/user/userRoutes';
import {AppContext, ClientError} from '../types';

export function constructServer(context: AppContext) {
  const server = express();
  server.use(json({type: 'application/json'}));
  server.use(text({type: 'text/*'}));
  server.get('/ping', pingApi);

  server.use('/users', getUserRoutes(context));

  server.use(defaultErrorHandler);
  return server;

  function defaultErrorHandler(err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ClientError) return res.status(err.status).json({error: err.message});
    context.logger.error({err}, 'Unhandled error');
    res.status(500).json({error: 'Internal Server Error'});
  }

  function pingApi(req: Request, res: Response) {
    context.logger.info('/ping');
    res.send({message: 'pong'});
  }
}
