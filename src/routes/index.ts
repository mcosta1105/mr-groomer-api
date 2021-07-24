import { Router } from 'express';

import bookingsRouter from './bookings.routes';

const routes = Router();

routes.use('/bookings', bookingsRouter);

export default routes;
