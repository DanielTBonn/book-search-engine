import { gql } from '@apollo/client';

// export functions for all of the mutations that will take place through the apollo server graphql api and into our 
// mongodb database


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id 
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String]!, $bookId: String!, $description: String!, $title: String!, $image: String!, $link: String!) {
        saveBook(authors: $authors, bookId: $bookId, description: $description, title: $title, image: $image, link: $link) {
            _id
            username
            email
            password
            bookCount
            savedBooks {
                authors
                bookId
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            password
            bookCount
            savedBooks {
                authors
                bookId
                description
                title
                image
                link
            }
        }
    }
`;