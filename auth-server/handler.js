'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {
  console.log('event = ', event);

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
  + '?client_id=3eb98ifv4i1k0873gckn7i8j6g'
  + '&client_secret=mtab8mkumljmh3ggmvnom1q9n'
  + '&grant_type=authorization_code'
  + '&redirect_uri=https://maxzakh.github.io/meet-up/'
  + '&code=https://secure.meetup.com/oauth2/authorize?client_id=3eb98ifv4i1k0873gckn7i8j6g&response_type=code&redirect_uri=https://maxzakh.github.io/meet-up/'
  // + '&code=https://secure.meetup.com/oauth2/authorize?client_id=3eb98ifv4i1k0873gckn7i8j6g&response_type=code&redirect_uri=https://maxzakh.github.io/meet-up/'
  // + '&code=' + ((event.pathParameters && event.pathParameters.code) || "ah");
  
  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};