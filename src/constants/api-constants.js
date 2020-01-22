import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 文件
 */
export const UPLOAD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadFile`; // 上传文件
export const UPLOAD_WORD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadWordFile`; // 上传word,pdf文件
export const UPLOAD_ZIP_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadZipFile`; // 上传word,pdf文件
export const GET_FILE_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/getFileUrl`; // 获取文件url

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
export const GET_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationContract`; // 查询评测合同信息
export const SAVE_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationContract`; // 保存评测合同信息
export const GET_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationSpecimen`; // 查询样品登记表信息
export const SAVE_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationSpecimen`; // 保存样品登记表信息
export const GET_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationApply`; // 查询现场测试申请表信息
export const SAVE_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationApply`; // 保存现场测试申请表信息
export const GET_REGISTRATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationCopyright`; // 查询软件著作权信息
export const SAVE_REGISTRATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationCopyright`; // 保存软件著作权信息
export const GET_REGISTRATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationDocument`; // 查询用户文档集信息
export const SAVE_REGISTRATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationDocument`; // 保存用户文档集信息
export const GET_REGISTRATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationProductDescription`; // 查询产品说明信息
export const SAVE_REGISTRATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationProductDescription`; // 保存产品说明信息
export const GET_REGISTRATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/getRegistrationProduct`; // 查询产品介质信息
export const SAVE_REGISTRATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE_REGISTRATION}/saveRegistrationProduct`; // 保存产品介质信息
