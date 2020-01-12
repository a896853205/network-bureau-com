import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 企业用户
 ***************************/
export const GET_ENTERPRISE_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_USER}/getEnterpriseToken`; // 登录
export const CREATE_NEW_ENTERPRISE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_USER}/createNewEnterprise`; //注册

/**
 * 登记测试模块
 */
export const CREATE_ENTERPRISE_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/createEnterpriseRegistration`; // 创建登记测试
export const QUERY_REGISTRATION_BY_ENTERPRISE_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/queryREGISTRATIONByEnterpriseUuid`; //查询登记测试
