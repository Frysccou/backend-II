import User from '../models/user.model.js';

class UserDAO {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(user) {
        return await User.create(user);
    }

    async update(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserDAO();