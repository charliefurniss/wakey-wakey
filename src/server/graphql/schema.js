const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    airQuality: AirQuality
    lineStatuses: [LineStatus]
  }

  type Post {
    id: ID
    author: String
    body: String
  }

  type AirQuality {
    band: String
    summary: String
  }

  type LineStatus {
    reason: String
  }
`);

module.exports = schema;
