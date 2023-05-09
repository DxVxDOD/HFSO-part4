/* eslint-disable @typescript-eslint/naming-convention */
import config from './utils/config.js';
import logger from './utils/logger.js';
import app from './app.js';

const PORT = config.PORT!;

app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
