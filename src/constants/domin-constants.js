import { ENVIRONMENT } from './app-constants';
import { SAP_CONTROL } from '../config/app-config';

/** 域名 */
const _DOMAIN = {
  [ENVIRONMENT.DEV]: 'http://localhost:4401',
  [ENVIRONMENT.TEST]: 'http://localhost:4401',
  [ENVIRONMENT.PRO]: 'http://39.97.175.30:4401'
};

export const DOMAIN = _DOMAIN[SAP_CONTROL];

// 模块
export const PART = {
  OPT_ENTERPRISE: '/enterprise',
  OPT_FILE: '/file'
};

// 返回码
export const RESPONSE_CODE = {
  success: 200,
  created: 201,
  noContent: 204,
  error: 400,
  unauthorized: 401,
  serviceError: 500
};
