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
    }
  },
  {
    loginLoading: false,
    uuid: '',
    phone: '',
    name: ''
  }
);
