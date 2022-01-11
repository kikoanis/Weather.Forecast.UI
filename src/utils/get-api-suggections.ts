import axios from 'axios';

import { AppConfig } from './AppConfig';

const url = axios.create({
  baseURL: AppConfig.api_end_point,
});

const getApiSuggestions = (str: string) => {
  const result = url
    .get(`/city/search/${str}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export { getApiSuggestions };
