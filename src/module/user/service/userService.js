export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getOneById(id) {
    return await this.userRepository.getOneById(id);
  }

  async getOneByEmail(email) {
    return await this.userRepository.getOneByEmail(email);
  }

  async create(user) {
    if (!user.idType) {
      user.idType = 3;
    }

    return await this.userRepository.create(user);
  }

  async update(id, changes) {
    return await this.userRepository.update(id, changes);
  }

  async delete(id) {
    return await this.userRepository.delete(id);
  }
}