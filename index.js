const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const app = express();
const PORT = 3000;
app.use(express.json());
const Website = [{ id: 1, name: "facebook", ownerId: 1 }];
const Owners = [{ id: 1, name: "mark" }];

const WebsiteType = new GraphQLObjectType({
  name: "website",
  description: "Just testing out GraphQL",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    ownerId: { type: GraphQLNonNull(GraphQLInt) },
  }),
});
const OwnerType = new GraphQLObjectType({
  name: "owner",
  description: "Just testing out GraphQL for owner",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});
const rootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    websites: {
      type: new GraphQLList(WebsiteType),
      description: "List of All Website",
      resolve: () => Website,
    },
    owners: {
      type: new GraphQLList(OwnerType),
      description: "List of All Website",
      resolve: () => Owners,
    },
  }),
});

const schema = new GraphQLSchema({
    query: rootQueryType
})
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(`${PORT}`, () => console.log(`server running on port ${PORT}`));
