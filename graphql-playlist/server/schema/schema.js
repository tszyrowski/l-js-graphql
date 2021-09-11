const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1'},
    {name: 'The final empore', genre: 'Fantasy', id: '2', authorid: '2'},
    {name: 'The long earth', genre: 'Sci-Fi', id: '3', authorid: '2'},
    {name: 'A prick', genre: 'Sci-Fi', id: '4', authorid: '3'}
];
var authors = [
    {name: 'PAtriv Boyle', age: 44, id: '1'},
    {name: 'Suzan Surondal', age: 19, id: '2'},
    {name: 'Chris Band', age: 38, id: '3'}
];   

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorid});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        age: { type: graphql.GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorid: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args:{ id: {type: GraphQLID}},
            resolve(parent, args){
                console.log(typeof(args.id), args.id, args.name);
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args:{ id: {type: GraphQLID}},
            resolve(parent, args){
                console.log(typeof(args.id), args.id, args.name);
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        },
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});