import { Request, RequestCreatorConfig } from './request.type';
import { Key } from '@/types/util';
export declare function requestCreator({ baseUrl, isFormData }?: RequestCreatorConfig): [Request, Request];
export declare const cancelRequest: (cancelKey: Key) => void;
