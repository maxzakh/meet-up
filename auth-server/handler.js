'use strict';

const axios = require('axios');

// https://secure.meetup.com/oauth2/authorize?client_id=3eb98ifv4i1k0873gckn7i8j6g&response_type=code&redirect_uri=https://maxzakh.github.io/meet-up/
// 7bed5b094bc4e59950dc2d7233a8eecb

module.exports.getAccessToken = async (event) => {
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=3eb98ifv4i1k0873gckn7i8j6g'
    + '&client_secret=mtab8mkumljmh3ggmvnom1q9n'
    + '&grant_type=authorization_code'
    + '&redirect_uri=https://maxzakh.github.io/meet-up/'
    + '&code=' + event.pathParameters.code;

  try {
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
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(error)
    };
  }
};

module.exports.refreshAccessToken = async (event) => {
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=3eb98ifv4i1k0873gckn7i8j6g'
    + '&client_secret=mtab8mkumljmh3ggmvnom1q9n'
    + '&grant_type=refresh_token'
    + '&refresh_token=' + event.pathParameters.refresh_token;

  try {
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
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(error)
    };
  }
};