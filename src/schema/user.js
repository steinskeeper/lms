import { authMiddleware } from '../middleware/authMiddleware';
import { User, UserTC } from '../models/user';
import { hello, signIn, removeOneUser, changePass } from '../resolvers/user';

UserTC.addResolver(hello);
UserTC.addResolver(signIn);
UserTC.addResolver(removeOneUser);
UserTC.addResolver(changePass);

const UserQuery = {
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany', [authMiddleware.isAdmin]),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),
    hello: UserTC.getResolver('hello', [authMiddleware.isAdmin]),
};

const UserMutation = {
    signIn: UserTC.getResolver('signIn', [authMiddleware.isGuest]),
    changePass: UserTC.getResolver('changePass'),
    userCreateOne: UserTC.getResolver('createOne'),
    userCreateMany: UserTC.getResolver('createMany', [authMiddleware.isAdmin]),
    userUpdateById: UserTC.getResolver('updateById', [authMiddleware.isAdmin]),
    userUpdateOne: UserTC.getResolver('updateOne', [authMiddleware.isAdmin]),
    userUpdateMany: UserTC.getResolver('updateMany', [authMiddleware.isAdmin]),
    userRemoveById: UserTC.getResolver('removeById', [authMiddleware.isAdmin]),
    userRemoveOne: UserTC.getResolver('removeOneUser', [
        authMiddleware.isAdmin,
    ]),
    userRemoveMany: UserTC.getResolver('removeMany', [authMiddleware.isAdmin]),
};

export { UserQuery, UserMutation };
