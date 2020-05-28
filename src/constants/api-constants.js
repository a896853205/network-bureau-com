import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 文件
 */
export const UPLOAD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadFile`; // 上传文件
export const UPLOAD_WORD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadWordFile`; // 上传word,pdf文件
export const UPLOAD_ZIP_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadZipFile`; // 上传word,pdf文件
export const GET_FILE_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/getFileUrl`; // 获取文件url
export const UPLOAD_PDF_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadPdfFile`; // 上传word,pdf文件

/**
 * 企业用户
 ***************************/
export const GET_ENTERPRISE_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/getEnterpriseToken`; // 登录
export const CREATE_NEW_ENTERPRISE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/createNewEnterprise`; //注册

/**
 * 登记测试模块
 */
export const CREATE_ENTERPRISE_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/createEnterpriseRegistration`; // 创建登记测试
export const QUERY_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/queryRegistration`; // 查询登记测试
export const QUERY_SYS_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/querySysRegistrationStep`; // 无条件查询系统测试步骤
export const SELECT_REGISTRATION_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationStatus`;
export const QUERY_ENTERPRISE_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/queryEnterpriseRegistrationStep`; // 查询具体测试步骤信息
export const SELECT_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistration`; // 查询基本信息
export const SELECT_MANANGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectManagerInfo`; // 查询mananger信息
export const SELECT_REGISTRATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationBasic`; // 查询登记测试的基本信息
export const SAVE_REGISTRATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationBasic`; // 保存登记测试的基本信息
export const SELECT_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationContract`; // 查询评测合同信息
export const SAVE_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationContract`; // 保存评测合同信息
export const SELECT_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationSpecimen`; // 查询样品登记表信息
export const SAVE_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationSpecimen`; // 保存样品登记表信息
export const SELECT_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationApply`; // 查询现场测试申请表信息
export const SAVE_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationApply`; // 保存现场测试申请表信息
export const SELECT_REGISTRATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationCopyright`; // 查询软件著作权信息
export const SAVE_REGISTRATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationCopyright`; // 保存软件著作权信息
export const SELECT_REGISTRATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationDocument`; // 查询用户文档集信息
export const SAVE_REGISTRATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationDocument`; // 保存用户文档集信息
export const SELECT_REGISTRATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationProductDescription`; // 查询产品说明信息
export const SAVE_REGISTRATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationProductDescription`; // 保存产品说明信息
export const SELECT_REGISTRATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectRegistrationProduct`; // 查询样品信息
export const SAVE_REGISTRATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveRegistrationProduct`; // 保存样品信息
export const SELECT_CONTRACT_MANAGER_FAIL_TEXT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectContractManagerFailText`; // 查询经管部门填写评测合同的状态
export const SAVE_ENTERPRISE_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveEnterpriseContractUrl`; // 保存乙方评测合同信息
export const SELECT_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectContractUrl`; // 查询评测合同路由
export const NOTICE_ACCOUNT_PAYMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/noticeAccountPayment`; // 更新交付汇款状态
export const SELECT_TEST_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectTestRegistrationApply`; // 查询现场测试申请表信息
export const SELECT_TEST_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectTestRegistrationSpecimen`; // 查询样品登记表信息
export const SAVE_TEST_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveTestRegistrationApply`; // 保存现场测试申请表信息
export const SAVE_TEST_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveTestRegistrationSpecimen`; // 保存样品登记表信息
export const SELECT_ENTERPRISE_REGISTRATION_REPORT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectEnterpriseRegistrationReport`; // 查找现场报告url
export const SELECT_ENTERPRISE_REGISTRATION_RECORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectEnterpriseRegistrationRecord`; // 查找原始记录url
export const GET_REGISTRATION_MANAGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/getRegistrationManagerInfo`; // 查询登记测试管理员uuid(用户评价页面)
export const SUBMIT_ALL_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/submitAllFile`; // 查询登记测试管理员uuid(用户评价页面)
export const DOWNLOAD_CONTRACT_WORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/downloadContractWord`; // 生成下载word

/**
 * 委托测试模块
 */
export const CREATE_ENTERPRISE_DELEGATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/createEnterpriseDelegation`; // 创建登记测试
export const QUERY_DELEGATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/queryDelegation`; // 查询登记测试
export const QUERY_SYS_DELEGATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/querySysDelegationStep`; // 无条件查询系统测试步骤
export const SELECT_DELEGATION_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationStatus`;
export const QUERY_ENTERPRISE_DELEGATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/queryEnterpriseDelegationStep`; // 查询具体测试步骤信息
export const SELECT_DELEGATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegation`; // 查询基本信息
export const SELECT_DELEGATION_MANANGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationManagerInfo`; // 查询mananger信息
export const SELECT_DELEGATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationBasic`; // 查询登记测试的基本信息
export const SAVE_DELEGATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationBasic`; // 保存登记测试的基本信息
export const SELECT_DELEGATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationContract`; // 查询评测合同信息
export const SAVE_DELEGATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationContract`; // 保存评测合同信息
export const SELECT_DELEGATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationSpecimen`; // 查询样品登记表信息
export const SAVE_DELEGATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationSpecimen`; // 保存样品登记表信息
export const SELECT_DELEGATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationApply`; // 查询现场测试申请表信息
export const SAVE_DELEGATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationApply`; // 保存现场测试申请表信息
export const SELECT_DELEGATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationCopyright`; // 查询软件著作权信息
export const SAVE_DELEGATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationCopyright`; // 保存软件著作权信息
export const SELECT_DELEGATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationDocument`; // 查询用户文档集信息
export const SAVE_DELEGATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationDocument`; // 保存用户文档集信息
export const SELECT_DELEGATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationProductDescription`; // 查询产品说明信息
export const SAVE_DELEGATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationProductDescription`; // 保存产品说明信息
export const SELECT_DELEGATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationProduct`; // 查询样品信息
export const SAVE_DELEGATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationProduct`; // 保存样品信息
export const SELECT_DELEGATION_CONTRACT_MANAGER_FAIL_TEXT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationContractManagerFailText`; // 查询经管部门填写评测合同的状态
export const SAVE_DELEGATION_ENTERPRISE_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveDelegationEnterpriseContractUrl`; // 保存乙方评测合同信息
export const SELECT_DELEGATION_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectDelegationContractUrl`; // 查询评测合同路由
export const NOTICE_DELEGATION_ACCOUNT_PAYMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/noticeDelegationAccountPayment`; // 更新交付汇款状态
export const SELECT_TEST_DELEGATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectTestDelegationApply`; // 查询现场测试申请表信息
export const SELECT_TEST_DELEGATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectTestDelegationSpecimen`; // 查询样品登记表信息
export const SAVE_TEST_DELEGATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveTestDelegationApply`; // 保存现场测试申请表信息
export const SAVE_TEST_DELEGATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/saveTestDelegationSpecimen`; // 保存样品登记表信息
export const SELECT_ENTERPRISE_DELEGATION_REPORT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectEnterpriseDelegationReport`; // 查找现场报告url
export const SELECT_ENTERPRISE_DELEGATION_RECORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/selectEnterpriseDelegationRecord`; // 查找原始记录url
export const GET_DELEGATION_MANAGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/getDelegationManagerInfo`; // 查询登记测试管理员uuid(用户评价页面)
export const SUBMIT_DELEGATION_ALL_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/submitDelegationAllFile`; // 查询登记测试管理员uuid(用户评价页面)
export const DOWNLOAD_DELEGATION_CONTRACT_WORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTERPRISE}/downloadDelegationContractWord`; // 生成下载word