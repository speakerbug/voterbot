var botBuilder =  require('claudia-bot-builder');

module.exports = botBuilder(function (message) {
  console.log('got text', message.text);
  console.log('full request', JSON.stringify(message.originalRequest));
  console.log('testing area ', JSON.stringify(message.originalRequest.message.nlp));
  if (message.originalRequest.message.nlp.intents.some(e => e.name === 'findRepresentative')) {
    return 'If I was a real application I would do an API call here to find out who represents you.';
  } else if (message.originalRequest.message.nlp.intents.some(e => e.name === 'nextElection')) {
    return 'The next election is November 3, 2020.';
  } else {
    return 'I don\'t understand your request';
  }
});
