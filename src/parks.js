
const api = 'https://places.cit.api.here.com/places/v1/discover/explore';
const position = '?at=53.410632,-2.157533';
const category = '&cat=natural-geographical';
const filter = '&drilldown=true';
const type = '&tf=html&';
const content = '&show_content=wikipedia';
const lang = '&Accept-Language=en%2Cen-US%3Bq%3D0.5'
const appId = '&app_id=9XpHIanLjpmAG8iNneCJ';
const appCode = '&app_code=VJo1BnHvW0qNp4i_OH5rMw&pretty';

const headers = {
 'Accept-Encoding': 'gzip',
 'Accept-Language': 'en,en-US;q=0.5',
 'Accept': 'application/json'
}

export const get = (parkId) =>
  fetch(`${api}${position}${category}${filter}${type}${content}${lang}${appId}${appCode}`, { headers })
  .then(function(response) {
    return response.json();
  });

export const getAll = () =>
  fetch(`${api}${position}${category}${filter}${type}${content}${lang}${appId}${appCode}`, { headers })
    .then(function(response) {
      return response.json();
    });

export const search = (query) =>
  fetch(`${api}${position}${category}${filter}${type}${content}${lang}${appId}${appCode}/search`, {
    method: 'POST',
    body: JSON.stringify({ query })
  }).then(function(response) {
        return response.json();
      });
