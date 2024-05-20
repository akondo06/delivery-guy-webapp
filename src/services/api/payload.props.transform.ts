import { AxiosRequestConfig } from 'axios';


export default function transformValidations(config: AxiosRequestConfig): AxiosRequestConfig {
  if (config.data && config.data.addressPostalCode) {
    config.data.addressPostalCode = parseInt(config.data.addressPostalCode);
  }

  return config;
}
