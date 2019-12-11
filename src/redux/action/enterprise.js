import { createAction } from 'redux-actions';

export default {
  asyncSetEnterprise: createAction('asyncSetEnterprise'),
  setEnterprise: createAction('setEnterprise'),
  setLoginLoading: createAction('setLoginLoading')
};
