import { Fragment, useCallback, useEffect, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { RefreshIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, SaveIcon } from '@heroicons/react/solid';
import { dehydrate, QueryClient } from 'react-query';
// import { useDebounce } from 'use-debounce';

import { Autocomplete } from '@/components/auto-complete';
import { ICity, IPhotoInterface } from '@/interfaces/app.interface';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getApiSuggestions } from '@/utils/get-api-suggections';
import { photos } from '@/utils/photos';

import {
  fetchWeatherForecasts,
  useWeatherForecasts,
  useLazySearchCityWeatherForecast,
} from '../hooks';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const Index = () => {
  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchAll,
  } = useWeatherForecasts();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [woeId, setWoeId] = useState(0);
  const [activeWeatherPhoto, setActiveWeatherPhoto] =
    useState<IPhotoInterface>();

  const {
    // data: searchData,
    refetch,
    // status,
    // isSuccess,
    // isFetched,
  } = useLazySearchCityWeatherForecast(woeId);

  const [cities, setCities] = useState<ICity[]>(data?.cityList || []);
  const [activeCity, setActiveCity] = useState<ICity>();

  useEffect(() => {
    if (activeCity) {
      photos.forEach((item) => {
        if (
          item.id ===
          activeCity?.weatherForecast?.consolidatedWeatherList[0]
            ?.weatherStateName
        ) {
          setActiveWeatherPhoto(item);
        }
      });
    }
  }, [activeCity]);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setCities(data?.cityList || []);
    }
  }, [data?.cityList, isFetching, isLoading]);

  const onCityClick = useCallback((city: ICity) => {
    setActiveCity(city);
  }, []);

  const getSuggestions = async (str: string) => {
    if (str) {
      setLoading(true);
      const response = await getApiSuggestions(str);
      setOptions(response?.cities || []);
      setLoading(false);
    } else {
      setOptions([]);
    }
  };

  const refreshCities = useCallback(() => {
    fetchWeatherForecasts();
  }, []);

  const saveCity = useCallback(async () => {
    await refetch();
    await refetchAll();
  }, [refetch, refetchAll]);

  useEffect(() => {
    ((data?.cityList || []) as ICity[]).forEach((city) => {
      if (city.woeId === woeId) {
        setActiveCity(city);
        setOptions([]);
        setSelectedOption('');
        setWoeId(0);
      }
    });
  }, [data?.cityList, woeId]);

  return (
    <Main
      meta={
        <Meta
          title="Weather Forecast UI"
          description="A web application for weather forecast exercise."
        />
      }
    >
      {cities.length > 0 && (
        <div className="inline-flex flex-row">
          <label className="inline-flex justify-between text-sm font-medium text-gray-700 mr-3 ml-3">
            Saved Cities
          </label>
          <Menu as="div" className="relative inline-block text-left w-48 -mt-2">
            <div>
              <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {activeCity ? activeCity.title : 'Select a City'}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-left z-50 top-8 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <Menu.Item
                        key={city.woeId}
                        onClick={() => onCityClick(city)}
                      >
                        <a
                          href="#"
                          className={classNames(
                            ' text-sm',
                            activeCity?.id === city.id
                              ? 'bg-gray-400 text-black'
                              : 'text-gray-700',
                            'block px-4 py-2'
                          )}
                        >
                          {city.title}
                        </a>
                      </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
      <button
        type="button"
        onClick={refreshCities}
        className="inline-flex flex-column justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-500 text-base font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Refresh <RefreshIcon className="ml-3 h-6 w-6" aria-hidden="true" />
      </button>
      <div className="inline-flex flex-column ml-5 w-auto">
        <label
          htmlFor="search"
          className="ml-4 -mr-12 block text-sm font-medium text-gray-700 w-32 "
        >
          Search City
        </label>
        <Autocomplete
          loading={loading}
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
          requests={getSuggestions}
          setWoeId={setWoeId}
        />

        <button
          type="button"
          onClick={saveCity}
          className="-mt-3 inline-flex flex-column justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-800 text-base font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
          <SaveIcon className="ml-3 h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
            <h2 className="text-2xl text-center font-extrabold text-gray-900">
              {activeWeatherPhoto && 'Weather Forecast'}
            </h2>
            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-3">
              <div key="div-1" className="group relative" />
              {activeWeatherPhoto && activeCity && (
                <div key={activeCity.woeId} className="group relative">
                  <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={activeWeatherPhoto.imageSrc}
                      alt={activeCity.title}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={activeWeatherPhoto.href}>
                      <span className="absolute inset-0" />
                      {activeCity.title}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {
                      activeCity.weatherForecast.consolidatedWeatherList[0]
                        ?.weatherStateName
                    }
                    <span> - </span>
                    {activeCity.weatherForecast
                      .orderedConsolidatedWeatherList[0]?.applicableDate &&
                      new Date(
                        activeCity.weatherForecast.orderedConsolidatedWeatherList[0]?.applicableDate
                      ).toLocaleDateString('en-CA')}
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    Latitude/Longitude: {activeCity.latLong}
                  </p>
                </div>
              )}
              <div key="div-2" className="group relative" />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['cityList'], () => fetchWeatherForecasts());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Index;
