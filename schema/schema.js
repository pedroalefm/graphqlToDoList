const graphql = require('graphql');
const Todo = require('../models/todo');
const User = require('../models/user');

const {
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLString,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
	}),
});

const TodoType = new GraphQLObjectType({
	name: 'Todo',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		complete: { type: GraphQLBoolean },
		todoDate: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		user: {
			type: UserType,
			args: { email: { type: GraphQLString } },
			resolve(parent, args) {
				//procurar no banco
			},
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				//
			},
		},
		todo: {
			type: TodoType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
