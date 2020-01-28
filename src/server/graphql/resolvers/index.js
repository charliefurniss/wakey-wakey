const getAirQuality = require('./get-air-quality');

const POSTS = [
  { author: 'Charlie Furniss', body: 'this is it' },
  { author: 'Charlene Furniss', body: 'This is ace' }
];

const mapPost = (post, id) => post && { id, ...post };

const resolvers = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  airQuality: async () => await getAirQuality()
};

module.exports = resolvers;
