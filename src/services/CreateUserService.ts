import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/user';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });
    if (!email || !password || !name) {
      throw new Error('Required fields.');
    }
    if (userExists) {
      throw new Error('Email adders already used by another user.');
    }
    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
export default CreateUserService;
