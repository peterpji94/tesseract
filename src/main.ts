import {UserRepository} from './domain/user/userRepository';
import {connectDb} from './infrastructure/db';
import {env} from './infrastructure/env';
import {constructLogger} from './infrastructure/logger';
import {constructServer} from './infrastructure/server';

main();

async function main() {
  const logger = constructLogger(env);
  const db = await connectDb(env, logger);

  const appContext = {
    logger: constructLogger(env),
    userRepository: new UserRepository(db),
  };
  await db.sync();

  const server = constructServer(appContext);
  const runningServer = server.listen(env.port, () => logger.info(`Server is running at http://localhost:${env.port}`));

  const gracefulShutdown = () => {
    try {
      logger.info(`received shutdown signal, gracefully terminating server ...`);
      runningServer.close();
    } catch (error) {
      if (error instanceof Error) logger.error(`server graceful shutdown failed \n${error?.message}`);
      else logger.error('server graceful shutdown failed', error);
    }
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGHUP', gracefulShutdown);
}
