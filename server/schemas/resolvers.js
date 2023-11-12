const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('savedBooks')
        }
    },

    Mutation: {

    },
};

module.exports = resolvers;