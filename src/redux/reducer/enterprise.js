import { handleActions } from 'redux-actions';

const statusToColor = status => {
  let color = '';

  switch (status) {
    case 1:
      color = 'grey';
      break;
    case 2:
      color = 'blue';
      break;
    case 3:
      color = 'green';
      break;
    case 4:
      color = 'red';
      break;
    default:
      color = 'blue';
  }
  return color;
};

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
      let stepWithColor = result.map(step => ({
        ...step,
        color: statusToColor(step.status)
      }));

      return {
        ...state,
        steps: stepWithColor
      };
    },
    setRegistration(state, { payload: result }) {
      return {
        ...state,
        registration: result
      };
    },
    setRegistrationLoading(state, { payload: result }) {
      return {
        ...state,
        registrationLoading: result
      };
    },
    setNeedPaymentStatus(state, { payload: result }) {
      return {
        ...state,
        needPaymentStatus: result
      };
    },
    setSysRegistrationStep(state, { payload: result }) {
      return {
        ...state,
        sysRegistrationStep: result
      };
    },
    setSysRegistrationStepLoading(state, { payload: result }) {
      return {
        ...state,
        sysRegistrationStepLoading: result
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
    registration: null,
    registrationLoading: true, // 查询登记测试的loading
    // 登记测试第三步需要状态值控制获取状态值
    needPaymentStatus: true,
    sysRegistrationStep: [],
    sysRegistrationStepLoading: true
  }
);
