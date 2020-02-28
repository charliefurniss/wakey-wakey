const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const schema = buildASTSchema(gql`
  type Query {
    airQuality: AirQuality
    lineStatuses: [LineStatus]
  }

  type AirQuality {
    band: String
    summary: String
  }

  type LineStatus {
    lineName: String
    reason: String
    severity: Int
    description: String
  }
`);

module.exports = schema;
