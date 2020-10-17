var botBuilder =  require('claudia-bot-builder');

module.exports = botBuilder(function (message) {
  console.log('got text', message.text);
  console.log('full request', JSON.stringify(message.originalRequest));
  if (message.originalRequest.message.nlp.intents.some(e => e.name === 'findPollingPlace')) {
    return 'If this was a real application it would do an API call here to find out who where a polling place is.';
  } else if (message.originalRequest.message.nlp.intents.some(e => e.name === 'nextElection')) {
    return 'The next election is November 3, 2020.';
  } else {
    return 'I don\'t understand your request';
  }
});
