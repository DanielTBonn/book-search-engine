const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// acts as routes, or resolves queries and mutations made to mongodb through graphql
const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('savedBooks')
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('savedBooks')
            }            
            throw new AuthenticationError('You need to be logged in!');
        },

    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log("We're in saveBook!")
            if (context.user) {
                // const book = Book.create({...bookData});
                // console.log(args)
                
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args }},
                    { new: true, runValidators: true }
                    );

                return updatedUser;
                };
                throw AuthenticationError;
                ('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            console.log(bookId);

            const updatedUser = User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId}}},
                { new: true }
            );

            if (!updatedUser) {
                return 'Must be logged in'
            }

            return updatedUser;
        }

    },
};

module.exports = resolvers;