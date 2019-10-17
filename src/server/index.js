const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  { author: 'Charlie Furniss', body: 'this is it' },
  { author: 'Charlene Furniss', body: 'This is ace' }
];

const schema = buildASTSchema(gql`
  type: Query {
    getPosts: [POST]
    getPost(id: ID!): POST
  }
  
  type Post {
    id: ID
    author: String
    body: String
  }
`);

const mapPost = (post, id) => post && { id, ...post };

const root = {
  getPosts: () => POSTS.map(mapPost),
  getPost: ({ id }) => mapPost(POSTS[id], id)
};

const app = express();
app.use(cors());
app.use(
  'graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
