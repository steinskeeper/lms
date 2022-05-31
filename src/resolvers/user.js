const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const crypto = require('crypto-random-string');
import { User } from '../models/user.js';

const { toInputObjectType } = require('graphql-compose');

const hello = {
    name: 'hello',
    type: 'User!',
    resolve: ({ context: { user } }) => user,
};

const signIn = {
    name: 'signIn',
    type: 'JSON!',
    args: {
        email: 'String!',
        password: 'String!',
    },
    resolve: async ({ args: { email, password } }) => {
        try {
            const user = await User.emailExist(email);
            if (!user) {
                return Promise.reject(new Error('User not found.'));
            }

            const comparePassword = await user.comparePassword(password);
            if (!comparePassword) {
                return Promise.reject(new Error('Password is incorrect.'));
            }

            const accessToken = jwt.sign(
                {
                    userId: user._id,
                    role: user.role,
                    email: user.email,
                    name: user.name,
                },
                'hello'
            );

            return {
                token: accessToken,
                role: user.role,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

// Get all the data from client

const removeOneUser = {
    name: 'removeOneUser',
    type: 'JSON!',
    args: {
        filter: 'JSON',
    },
    resolve: async ({ args, context: { user } }) => {
        try {
            let userid = user._id.toString();

            if (userid === args.filter._id) {
                return {
                    message: 'deleteblocked',
                };
            } else {
                const user = await User.deleteOne({ _id: args.filter._id });
                console.log(user);
                return {
                    message: 'successful',
                };
            }
        } catch (error) {
            return {
                message: 'error',
            };
        }
    },
};

const changePass = {
    name: 'changePass',
    type: 'JSON!',
    args: {
        record: 'JSON',
    },
    resolve: async ({ args, context: { user } }) => {
        try {
            let userid = user._id.toString();
            const comparePassword = await user.comparePassword(
                args.record.oldpassword
            );
            if (!comparePassword) {
                return {
                    message: 'Incorrect Password',
                };
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(args.record.newpassword, salt);
                const users = await User.updateOne(
                    { _id: userid },
                    { password: hash }
                );
                return {
                    message: 'success',
                };
            }
        } catch (error) {
            return {
                message: 'error',
            };
        }
    },
};

const checkpageaccess = {
    name: 'checkpageaccess',
    type: 'JSON!',
    args: {
        token: 'String',
    },
    resolve: async ({ args: { token }, context: { user } }) => {
        try {
            const decoded = jwt.verify(token, 'hello');
            if (decoded.role === 'admin') {
                return {
                    message: 'admin',
                };
            } else if (decoded.role === 'client') {
                return {
                    message: 'client',
                };
            } else {
                return {
                    message: 'error',
                };
            }
        } catch (error) {}
    },
};

module.exports = {
    hello,
    signIn,
    removeOneUser,
    changePass,
};
