export interface IConsolidatedWeatherList {
  applicableDate: Date;
  id: number;
  idObject: number;
  weatherForecastId: number;
  weatherStateAbbr: string;
  weatherStateName: string;
}

export interface IWeatherForecast {
  id: number;
  cityId: number;
  consolidatedWeatherList: IConsolidatedWeatherList[];
  orderedConsolidatedWeatherList: IConsolidatedWeatherList[];
  createDateTime: Date;
  lastFetchDateTime: Date;
}

export interface ICity {
  id: number;
  latLong: string;
  locationType: string;
  title: string;
  weatherForecast: IWeatherForecast;
  woeId: number;
}

export interface IPhotoInterface {
  id: string;
  imageSrc: string;
  href: string;
}
