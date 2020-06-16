import mockData from './__tests__/Event.test.MockData.json';
import axios from 'axios';

const AWS_AUTH_URL = 'https://2u37kmztke.execute-api.eu-central-1.amazonaws.com/dev/api/';
const MEETUP_AUTH_URL = 'https://secure.meetup.com/oauth2/authorize?client_id=3eb98ifv4i1k0873gckn7i8j6g&response_type=code&redirect_uri=https://maxzakh.github.io/meet-up/';
const MEETUP_QUERY_URL = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=';
const MEETUP_UPCOMING_EVENTS_URL = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public';

async function getOrRenewAccessToken(type, key) {
    const urlPart = type === 'get' ? 'token' : type === 'renew' ? 'refresh' : '?';
    let url = `${AWS_AUTH_URL}${urlPart}/${key}`;

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('last_saved_time');

    const tokenInfo = await axios.get(url);

    localStorage.setItem('access_token', tokenInfo.data.access_token);
    localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
    localStorage.setItem('last_saved_time', Date.now());

    return tokenInfo.data.access_token;
}

async function getSuggestions(query) {
    if (window.location.href.startsWith('http://localhost')) {
        return [
            {
                city: 'Munich',
                country: 'de',
                localized_country_name: 'Germany',
                name_string: 'Munich, Germany',
                zip: 'meetup3',
                lat: 48.14,
                lon: 11.58
            },
            {
                city: 'Munich',
                country: 'us',
                localized_country_name: 'USA',
                state: 'ND',
                name_string: 'Munich, North Dakota, USA',
                zip: '58352',
                lat: 48.66,
                lon: -98.85
            }
        ];
    }

    let resultData = [];
    try {
        const token = await getAccessToken();
        console.log('resultData token', token);
        const url = `${MEETUP_QUERY_URL}${query}&access_token=${token}`;
        const result = await axios.get(url);
        resultData = result.data;
    } catch (error) {
        console.log('resultData', error);
        window.location.href = MEETUP_AUTH_URL;
        // console.log('redirecting to auth server');
    }
    return resultData;
}

async function getEvents(lat, lon) {
    if (window.location.href.startsWith('http://localhost')) {
        return mockData;
    }

    let resultEvents = [];

    if (!navigator.onLine) {
        resultEvents = localStorage.getItem('lastEvents');
        return JSON.parse(resultEvents);
    }

    try {
        const token = await getAccessToken();

        let suffix = (lat && lon) ? `&lat=${lat}&lon=${lon}` : '';
        let url = `${MEETUP_UPCOMING_EVENTS_URL}&access_token=${token}${suffix}`;

        const result = await axios.get(url);
        resultEvents = result.data.events;

        localStorage.setItem('lastEvents', JSON.stringify(resultEvents));
    } catch (error) {
        console.log('cannot get events', error);
    }
    return resultEvents;
}

async function getAccessToken() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        // console.log(`url code '${code}'`);

        if (!code) {
            window.location.href = MEETUP_AUTH_URL;
            return null;
        }

        try {
            var rv = getOrRenewAccessToken('get', code);
        } catch (error) {
            // window.location.href = MEETUP_AUTH_URL;
            throw error;
        }
        return rv;
    }

    const lastSavedTime = localStorage.getItem('last_saved_time');

    if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
        return accessToken;
    }

    const refreshToken = localStorage.getItem('refresh_token');
    return getOrRenewAccessToken('renew', refreshToken);
}

export { getSuggestions, getEvents };