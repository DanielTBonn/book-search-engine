const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


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
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const book = Book.create({...bookData});
                
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book }}
                    );

                return book;
                };
                throw AuthenticationError;
                ('You need to be logged in!');
                }

    },
};

module.exports = resolvers;