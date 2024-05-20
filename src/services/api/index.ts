import axios, { AxiosError } from 'axios';

import { setupInterceptors } from './interceptors';

import * as localeUtil from 'utils/locale';
import * as countryUtil from 'utils/country';


// export type { AxiosError as ApiError } from 'axios';

export const api = setupInterceptors(axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: '/api'
}));

interface Payload {
  [key: string]: string;
}

export interface ApiErrorData {
  validations?: Payload;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiError extends AxiosError<ApiErrorData, Payload> {
}

export interface LookupResponse<T> {
  data?: T[];
  totalCount: number;
}

export interface ItemResponse<T> {
  data?: T;
}

interface GenericItem {
  id: string;
  name: string;
}

function transformToFormData(data: { [key: string]: any }): FormData {
  const result = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value instanceof File) {
      result.append(key, value, value.name);
    } else {
      result.append(key, value);
    }
  });

  return result;
}

function localFilterItems(data: { id: string|number; name: string; }[], filter: any) {
  const inIds = Array.isArray(filter.id?.$in) ? filter.id?.$in : undefined;
  const ids = Array.isArray(filter.id) ? filter.id : typeof filter.id === 'string' ? [filter.id] : undefined;
  const search = typeof filter.search === 'string' ? filter.search.toLowerCase().trim().replace(/[^a-z0-9 -_]/g, '') : undefined;

  return data.reduce((acc, item) => {
    const id = `${item.id}`.toLowerCase();

    if (inIds && !inIds.includes(id)) {
      return acc;
    }

    if (ids && !ids.includes(id)) {
      return acc;
    }

    if (search?.length && !item.name.toLowerCase().includes(search)) {
      return acc;
    }

    acc.push({
      id,
      name: item.name
    });

    return acc;
  }, [] as GenericItem[]);
}

export async function fetchOptionsOf(type: string, data?: any) {
  let localData;
  switch (type) {
    case 'country':
      localData = countryUtil.countryList();
    break;
    case 'locale':
      localData = localeUtil.localeList();
    break;
    default:
    break;
  }

  if (localData) {
    return localFilterItems(localData, data).map((item) => ({ value: item.id, label: item.name })) || [];
  }

  const response = await api.post<LookupResponse<GenericItem>>(`${type}/list`, data);
  return response.data?.data?.map((item) => ({ value: item.id, label: item.name })) || [];
}

export async function createOption(type: string, data?: any) {
  const response = await api.post<ItemResponse<GenericItem>>(`${type}/create`, data);
  const theData = response.data?.data;
  if(!theData) {
    throw new Error('NONE');
  }
  return {
    value: theData.id,
    label: theData.name
  };
}

export async function fsAction<T, D>(url: string, data: D, options?: { asFormData?: boolean; onUploadProgress?: (procentCompleted: number) => void; }) {
  return api({
    method: 'post',
    url: `fs/${url}`,
    data: options?.asFormData ? transformToFormData(data) : data,
    onUploadProgress(progressEvent) {
      if (!options?.onUploadProgress) {
        return;
      }
      options?.onUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    }
  }).then((response) => response.data);

  // return api.post<ItemResponse<T>>(`fs/${url}`, options?.asFormData ? transformToFormData(data) : data).then((response) => response.data);
}

export async function fetchListOf<T>(type: string, data?: any) {
  return api.post<LookupResponse<T>>(`${type}/list`, data).then((response) => response.data);
}

export async function fetchItemById<T>(type: string, id: string) {
  return api.get<ItemResponse<T>>(`${type}/${id}`).then((response) => response.data);
}

export async function createItem<T, D>(type: string, data: D) {
  return api.post<ItemResponse<T>>(`${type}/create`, data).then((response) => response.data);
}

export async function updateItem<T, D>(type: string, id: string, data: D, options?: { asFormData?: boolean; }) {
  return api.put<ItemResponse<T>>(`${type}/${id}`, options?.asFormData ? transformToFormData(data) : data).then((response) => response.data);
}

export async function deleteItem(type: string, id: string) {
  return api.delete(`${type}/${id}`).then((response) => response.data);
}
