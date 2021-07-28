import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    return res.send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
