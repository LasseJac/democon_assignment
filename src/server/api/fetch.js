const axios = require('axios');

const host = 'https://pretalx.com/api';

const get = slug => axios.get(`${host}${slug}`).then(response => response.data);

/* 
    pretalx api uses pagination; we could manually force the api to return a larger result set, but that seems unclean even for demo purposes; 
    we do it the right way by recursing until the resource is exhausted
*/
const span = 25;
const exhaustResource = (slug, limit = span, offset = 0, results = []) => {
    return get(`${slug}?limit=${limit}&offset=${offset}`)
        .then(data => {
            results.push(data.results);

            if (data.next) {
                return exhaustResource(slug, limit + span, offset + span, results);
            } else {
                return results.flat();
            }
        })
};

// Request is pretty slow - quick and dirty cache for faster iteration
let cache;

module.exports = {
    getEvent: () => get('/events/democon'),
    getTalks: () => {
        if (cache) return Promise.resolve(cache);
        
        return exhaustResource('/events/democon/talks').then(talks => {
            cache = talks;

            return cache;
        });
    }
};
