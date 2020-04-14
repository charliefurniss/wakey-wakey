const fetch = require('node-fetch');

const getLines = async () => {
  const result = await fetch(
    'https://api.tfl.gov.uk/line/mode/overground,tube'
  );
  const lines = await result.json();

  return lines.map(line => {
    return {
      id: line.id,
      name: line.name
    };
  });
};

module.exports = getLines;
