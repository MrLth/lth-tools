import { Key, Obj } from '@/types/util';
import { AxiosResponse } from 'axios';
interface CacheInfo {
    result: Promise<AxiosResponse<unknown>>;
    params: Obj;
    cacheTime: Date;
}
export default class RequestCache {
    static cacheMap: Map<Key, CacheInfo[]>;
    static read(url: string, params: Obj, cacheDuration: number): Promise<AxiosResponse<unknown>> | ((result: Promise<AxiosResponse<unknown>>) => void);
    static write(url: string, params: Obj, cacheDuration: number, result: Promise<AxiosResponse<unknown>>): void;
}
export {};
