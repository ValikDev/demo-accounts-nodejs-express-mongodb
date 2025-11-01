import { env } from '@config/env';
import { logger } from '@shared/utils/logger';

import { app } from './app';

const port = env.PORT;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
