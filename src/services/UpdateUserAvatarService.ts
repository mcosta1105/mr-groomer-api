import path from 'path';
import { getRepository } from 'typeorm';
import User from '../models/User';
import uploadConfig from '../config/upload';
import fs from 'fs';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('You are not authorized to change avatars.');
    }

    // Delete file
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
