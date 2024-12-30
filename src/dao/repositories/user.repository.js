import User from '../models/user.model.js';

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(user) {
        return await User.create(user);
    }
}

export default new UserRepository();