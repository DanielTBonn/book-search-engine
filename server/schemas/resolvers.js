const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('savedBooks')
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            return User.create({ username, email, password});
        }

    },
};

module.exports = resolvers;