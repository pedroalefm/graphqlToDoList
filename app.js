const express = require('express');
const graphqlHTTP = require('express-graphql'); //middleware
const GraphQLSchema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://test:test123@cluster0-9w2sk.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
	console.log('Conectado ao banco');
});

app.use(
	'/root',
	graphqlHTTP({
		schema: GraphQLSchema,
		graphiql: true,
	})
);
app.listen(4000, () => console.log('server running on port 4000'));
