import { handleActions } from 'redux-actions';

export default handleActions(
  {
    // 保存企业基本信息
    setEnterprise(state, { payload: result }) {
      return {
        ...state,
        uuid: result.uuid,
        phone: result.phone,
        name: result.name
      };
    },
    // 设置登录loading
    setLoginLoading(state, { payload: result }) {
      return {
        ...state,
        loginLoading: result
      };
    },
    setCreateEnterpriseRegistrationLoading(state, { payload: result }) {
      return {
        ...state,
        createEnterpriseRegistrationLoading: result
      };
    },
    setEnterpriseRegistrationUuid(state, { payload: result }) {
      return {
        ...state,
        enterpriseRegistrationUuid: result
      };
    },
    setSteps(state, { payload: result }) {
      return {
        ...state,
        steps: result
      };
    },
    setRegistration(state, { payload: result }) {
      return {
        ...state,
        registration: result
      };
    }
  },
  {
    // 企业基本信息
    loginLoading: false,
    uuid: '',
    phone: '',
    name: '',
    // 登记测试
    createEnterpriseRegistrationLoading: false,
    enterpriseRegistrationUuid: '',
    steps: [], // 步骤详细信息
    registration: null
  }
);
