import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../repository/userRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import * as secrets from "../../../config/constants/secrets.js";
import UserException from "../exception/UserException.js";


class UserService {
    async findByEmail (req) {
        try {
            const { email } = req.params;
            const { authUser } = req;
            this.validadeRequestData(email);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            this.validadeAuthenticatedUser(user, authUser);
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
                message: err.message,
            };
        }
    }

    validadeRequestData(email) {
        if(!email) {
            throw new UserException( 
                httpStatus.BAD_REQUEST, 
                "User email was not informed."
            );
        }
    }

    validadeUserNotFound(user) {
        if(!user) {
            throw new Error(httpStatus.BAD_REQUEST, "User was not found.");
        }
    }

    validadeAuthenticatedUser(user, authUser) {
        if(!authUser || user.id !== authUser.id) {
            throw new UserException(
                httpStatus.FORBIDDEN,
                "You cannot see this user data."    
            );
        }
    }

    async getAccessToken(req) {
        try {
            const { email, password } = req.body;
            this.validadeAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            await this.validadePassword(password, user.password);
            const authUser = {
              id: user.id,
              name: user.name,
              email: user.email
            };
            const accessToken = jwt.sign({ authUser }, secrets.API_SECRET, { expiresIn: "1d" });
            return {
              status: httpStatus.SUCCESS,
              accessToken,
            };
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            };
        }
        
        

    }

    validadeAccessTokenData(email, password) {
        if(!email || !password) {
            throw new UserException(
                httpStatus.UNAUTHORIZED,
                "Email and password must be informed."
            );
        }
    }

    async validadePassword(password, hashPassword) {
        if(!await bcrypt.compare(password, hashPassword)) {
          throw new UserException(httpStatus.UNAUTHORIZED,
            "Passowrd doesn't match."
            )
        } 
    }
}

export default new UserService();