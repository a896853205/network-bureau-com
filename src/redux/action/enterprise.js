import { createAction } from 'redux-actions';

export default {
  // 企业登录action
  asyncSetEnterprise: createAction('asyncSetEnterprise'),
  setEnterprise: createAction('setEnterprise'),
  setLoginLoading: createAction('setLoginLoading'),
  // 企业创建登记测试action
  asyncCreateEnterpriseRegistration: createAction(
    'asyncCreateEnterpriseRegistration'
  ),
  setCreateEnterpriseRegistrationLoading: createAction(
    'setCreateEnterpriseRegistrationLoading'
  ),
  setEnterpriseRegistrationUuid: createAction('setEnterpriseRegistrationUuid'),
  asyncSetSteps: createAction('asyncSetSteps'),
  setSteps: createAction('setSteps'),
  setRegistration: createAction('setRegistration'),
  asyncSetRestration: createAction('asyncSetRestration'),
  setRegistrationLoading: createAction('setRegistrationLoading'),
  setNeedPaymentStatus: createAction('setNeedPaymentStatus'),
  // 企业创建委托测试action
  asyncCreateEnterpriseDelegation: createAction(
    'asyncCreateEnterpriseDelegation'
  ),
  setCreateEnterpriseDelegationLoading: createAction(
    'setCreateEnterpriseDelegationLoading'
  ),
  setEnterpriseDelegationUuid: createAction('setEnterpriseDelegationUuid'),
  asyncSetDelegationSteps: createAction('asyncSetDelegationSteps'),
  setDelegationSteps: createAction('setDelegationSteps'),
  setDelegation: createAction('setDelegation'),
  asyncSetDelegation: createAction('asyncSetDelegation'),
  setDelegationLoading: createAction('setDelegationLoading'),
  setDelegationNeedPaymentStatus: createAction(
    'setDelegationNeedPaymentStatus'
  ),
  // 系统步骤名称
  setSysRegistrationStep: createAction('setSysRegistrationStep'),
  asyncSetSysRegistrationStep: createAction('asyncSetSysRegistrationStep'),
  setSysRegistrationStepLoading: createAction('setSysRegistrationStepLoading'),
  // 委托测试系统步骤名称
  setSysDelegationStep: createAction('setSysDelegationStep'),
  asyncSetSysDelegationStep: createAction('asyncSetSysDelegationStep'),
  setSysDelegationStepLoading: createAction('setSysDelegationStepLoading'),
};
