
const api = 'https://places.cit.api.here.com/places/v1/discover/explore';
const position = '?at=53.410632,-2.157533';
const category = '&cat=natural-geographical';
const filter = '&drilldown=true';
const type = '&tf=html&';
const content = '&show_content=wikipedia';
const lang = '&Accept-Language=en%2Cen-US%3Bq%3D0.5'
const appId = '&app_id=9XpHIanLjpmAG8iNneCJ';
const appCode = '&app_code=VJo1BnHvW0qNp4i_OH5rMw&pretty';

// https://places.cit.api.here.com/places/v1/discover/explore?at=53.410632%2C-2.157533&cat=natural-geographical&drilldown=true&Accept-Language=en%2Cen-US%3Bq%3D0.5&app_id=9XpHIanLjpmAG8iNneCJ&app_code=VJo1BnHvW0qNp4i_OH5rMw

const headers = {
 'Accept-Encoding': 'gzip',
 'Accept-Language': 'en,en-US;q=0.5',
 'Accept': 'application/json'
}
const apiSearch = 'https://places.cit.api.here.com/places/v1/discover/search';
const queryStart = '&q='

export const get = (query) =>
  fetch(`${apiSearch}${position}${queryStart}`+query+`${lang}${appId}${appCode}`, { headers })
  .then(function(response) {
    return response.json();
  });
// https://places.cit.api.here.com/places/v1/discover/search?at=53.410632%2C-2.157533&q=fog&Accept-Language=en%2Cen-US%3Bq%3D0.5&app_id=9XpHIanLjpmAG8iNneCJ&app_code=VJo1BnHvW0qNp4i_OH5rMw
export const getAll = () =>
  fetch(`${api}${position}${category}${filter}${type}${content}${lang}${appId}${appCode}`, { headers })
    .then(function(response) {
      return response.json();
    });
