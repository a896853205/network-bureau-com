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
export const QUERY_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/queryRegistration`; // 查询登记测试
export const QUERY_SYS_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/querySysRegistrationStep`; // 无条件查询系统测试步骤
export const SELECT_REGISTRATION_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/selectRegistrationStatus`;
export const QUERY_ENTERPRISE_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/queryEnterpriseRegistrationStep`; // 查询具体测试步骤信息
export const SELECT_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/selectRegistration`; // 查询基本信息
export const GET_MANANGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getManagerInfo`; // 查询mananger信息
export const GET_REGISTRATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationBasic`; // 查询登记测试的基本信息
export const SAVE_REGISTRATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationBasic`; // 保存登记测试的基本信息
export const GET_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationContract`; // 查询评测合同的基本信息
export const SAVE_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationContract`; // 保存评测合同的基本信息
export const GET_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationSpecimen`; // 查询样品登记表的基本信息
export const SAVE_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationSpecimen`; // 保存样品登记表的基本信息
export const GET_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationApply`; // 查询现场测试申请表的基本信息
export const SAVE_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationApply`; // 保存现场测试申请表的基本信息
