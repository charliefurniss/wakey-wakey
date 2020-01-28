const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const fetch = require('node-fetch');

const getAirQuality = async () => {
  const result = await fetch('https://api.tfl.gov.uk/airquality');
  const airQualityData = await result.json();

  const forecast = {
    band: airQualityData.currentForecast[0].forecastBand,
    summary: airQualityData.currentForecast[0].forecastSummary
  };

  return forecast;
};

const POSTS = [
  { author: 'Charlie Furniss', body: 'this is it' },
  { author: 'Charlene Furniss', body: 'This is ace' }
];

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    airQuality: AirQuality
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
`);

const mapPost = (post, id) => post && { id, ...post };

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  airQuality: async () => await getAirQuality()
};

const app = express();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
