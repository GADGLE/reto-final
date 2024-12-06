import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, validate } from 'graphql';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

let messages = [];


const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        sender: { type: new GraphQLNonNull(GraphQLString) },
        recipient: { type: new GraphQLNonNull(GraphQLString) },
    },
});


const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        messages: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: () => 'This API supports subscriptions and mutations.',
        },
    },
});


const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        sendMessage: {
            type: MessageType,
            args: {
                content: { type: new GraphQLNonNull(GraphQLString) },
                sender: { type: new GraphQLNonNull(GraphQLString) },
                recipient: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, { content, sender, recipient }) => {
                const newMessage = { id: `${Date.now()}`, content, sender, recipient };
                messages.push(newMessage);
                pubsub.publish(MESSAGE_RECEIVED, { messageReceived: newMessage });
                console.log(messages)
                return newMessage;
            },
        },
    },
});


const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        messageReceived: {
            type: MessageType,
            subscribe: () => pubsub.asyncIterableIterator(MESSAGE_RECEIVED),

        }
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
    subscription: SubscriptionType,
});

export default schema