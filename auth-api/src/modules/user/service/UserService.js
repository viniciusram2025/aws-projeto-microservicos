import UserRepository from "../repository/userRepository";
import * as httpStatus from "../../../config/constants/httpStatus";

class UserService {
    async findByEmail (req) {
        try {
            const { email } = req.params;
            this.validadeRequestData(email);
            let user = UserRepository.findByEmail(email);
            if(!user) {
            }
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.status,
            };
        }
    }

    validadeRequestData(email) {
        if(!email) {
            throw new Error('User email was not informed.');
        }
    }
}

export default new UserService();