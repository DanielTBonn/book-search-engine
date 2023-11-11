const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
        }
    },

    Mutation: {

    },
};

module.exports = resolvers;