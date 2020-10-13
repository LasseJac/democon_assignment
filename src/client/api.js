const base = '/api';

export default {
    getEvent: event => {
        return fetch(`${base}/events/${event}`)
            .then(response => response.json());
    },
    getTalks: event => {
        return fetch(`${base}/events/${event}/talks`)
            .then(response => response.json());
    }
};
