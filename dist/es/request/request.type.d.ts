import { Key, Obj } from '@/types/util';
import { AxiosRequestConfig, Canceler, Method } from 'axios';
export interface Request {
    <T>(url: string, params?: Obj, config?: RequestConfig): Promise<T>;
}
export interface RequestConfig extends AxiosRequestConfig {
    method?: Method;
    headers?: Obj;
    baseUrl?: string;
    cache?: boolean | number;
    cancelKey?: Key;
}
export interface RequestCreatorConfig extends AxiosRequestConfig {
    baseUrl?: string;
    isFormData?: boolean;
}
export interface CancelInfo {
    ids: Set<Key>;
    lastId: Key | null;
    canceler: Canceler | null;
    params: Obj | null;
}
