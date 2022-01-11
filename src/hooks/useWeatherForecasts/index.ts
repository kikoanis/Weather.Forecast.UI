import ky from 'ky-universal';
import { useQuery } from 'react-query';

import { AppConfig } from '@/utils/AppConfig';

// const fetchWeatherForecasts = async (limit = 10) => {
//   const parsed = (await ky(AppConfig.api_end_point).json()) as any;
//   const result = parsed.filter((x) => x.id <= limit);
//   return result;
// };

// const useWeatherForecasts = (limit) => {
//   return useQuery(['posts', limit], () => fetchWeatherForecasts(limit));
// };

const fetchWeatherForecasts = async () => {
  const parsed = (await ky(
    `${AppConfig.api_end_point}/city/all`
  ).json()) as any;

  const result = parsed;
  return result;
};

const searchCityWeatherForecastByWoeId = async (woeId: number) => {
  const parsed = (await ky(
    `${AppConfig.api_end_point}/city/woeid/${woeId}`
  ).json()) as any;

  const result = parsed;
  return result;
};

const useWeatherForecasts = () => {
  return useQuery(['cityList'], () => fetchWeatherForecasts());
};

const useLazySearchCityWeatherForecast = (woeId: number) => {
  return useQuery(
    ['city', woeId],
    () => searchCityWeatherForecastByWoeId(woeId),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
};

export {
  useWeatherForecasts,
  useLazySearchCityWeatherForecast,
  fetchWeatherForecasts,
  searchCityWeatherForecastByWoeId as searchCityWeatherForecast,
};
