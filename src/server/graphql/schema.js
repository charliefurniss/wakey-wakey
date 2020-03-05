const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const schema = buildASTSchema(gql`
  type Query {
    airQuality: AirQuality
    lineStatuses: [LineStatus]
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
    lineName: String
    reason: String
    severity: Int
    description: String
  }

  type WeatherForecast {
    forecastNow: Forecast
    forecastToday: Forecast
  }

  type Forecast {
    summary: String
    temperature: Float
    temperatureHigh: Float
    temperatureLow: Float
    feelsLike: Float
    icon: String
  }
`);

module.exports = schema;
