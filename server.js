var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    systemAlert: Int!
    listType: [String]
    nullableReturn: Float! 
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  systemAlert: () => {
    return 1; // cannot be null
  },
  listType: () => {
    const map = [
      1,2,3,4,5
    ];

    return map
  },
  nullableReturn: () => {
    return 1.245325 // cannot be null, but we are fine with float's 
  }

};
// stopping on basic types
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
