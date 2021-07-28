import { Router } from 'express';

import bookingsRouter from './bookings.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/bookings', bookingsRouter);
routes.use('/users', usersRouter);

export default routes;
