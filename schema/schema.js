const graphql = require('graphql');
const Todo = require('../models/todo');
const User = require('../models/user');
const graphqliso = require('graphql-iso-date');

const {
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLString,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList,
	GraphQLError,
} = graphql;
const { GraphQLDate } = graphqliso;
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		todos: {
			type: new GraphQLList(TodoType),
			resolve(parent, args) {
				return Todo.find({ creator: parent.id });
			},
		},
	}),
});

const TodoType = new GraphQLObjectType({
	name: 'Todo',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		complete: { type: GraphQLBoolean },
		todoDate: { type: GraphQLString },
		creator: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.creator);
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		user: {
			type: new GraphQLList(UserType),
			args: { email: { type: GraphQLString } },
			resolve(parent, args) {
				return User.find({ email: args.email });
			},
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			},
		},
		todo: {
			type: TodoType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Todo.findById(args.id);
			},
		},
		todos: {
			type: new GraphQLList(TodoType),
			resolve(parent, args) {
				return Todo.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				try {
					let user = new User({
						name: args.name,
						email: args.email,
					});
					return user.save();
				} catch (e) {
					throw new GraphQLError(e);
				}
			},
		},
		addTodo: {
			type: TodoType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				creator: { type: new GraphQLNonNull(GraphQLID) },
				// todoDate: { type: GraphQLString },
			},
			resolve(parent, args) {
				let todo = new Todo({
					name: args.name,
					creator: args.creator,
					// todoDate: args.todoDate,
				});
				return todo.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
