const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const schema = buildASTSchema(gql`
  type Query {
    airQuality: AirQuality
    lineStatuses(lineIds: String!): [LineStatus]
    lines: [Line]
    pollenCount: PollenCount
    weatherForecast: WeatherForecast
  }

  type AirQuality {
    band: String
    summary: String
  }

  type PollenCount {
    status_code: String
  }

  type LineStatus {
    name: String
    reason: String
    severity: Int
    description: String
  }

  type Line {
    id: String
    name: String
  }

  type WeatherForecast {
    forecastNow: Forecast
    forecastToday: Forecast
  }

  type Forecast {
    summary: String
    temperature: String
    temperatureHigh: String
    temperatureLow: String
    feelsLike: String
    icon: String
  }
`);

module.exports = schema;
