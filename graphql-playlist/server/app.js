const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    `mongodb+srv://t-gql-ninja:${
        process.env.REACT_APP_MONGODB_PASS
    }@gql-ninja.jdxic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
mongoose.connection.once('open', () => {
    console.log("Connected to database");
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("The app listen to the port");
})