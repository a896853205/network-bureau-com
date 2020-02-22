import { handleActions } from 'redux-actions';

const statusToColor = status => {
  switch (status) {
    case 0:
      return 'gray';
    case 1:
      return 'blue';
    case 100:
      return 'green';
    case -1:
      return 'red';
    default:
      return 'gray';
  }
};

const contractStatusToColor = status => {
  switch (status) {
    case -1:
      return 'red';
    case 0:
      return 'grey';
    case 1:
      return 'blue';
    case 2:
      return 'blue';
    case 3:
      return 'blue';
    case 4:
      return 'blue';
    case 5:
      return 'blue';
    case 100:
      return 'green';
    default:
      return 'grey';
  }
};

const paymentStatusToColor = status => {
  switch (status) {
    case -1:
      return 'red';
    case 0:
      return 'grey';
    case 1:
      return 'blue';
    case 2:
      return 'blue';
    case 3:
      return 'blue';
    case 4:
      return 'blue';
    case 100:
      return 'green';
    default:
      return 'grey';
  }
};

const testStatusToColor = status => {
  switch (status) {
    case -1:
      return 'red';
    case 0:
      return 'grey';
    case 1:
      return 'blue';
    case 2:
      return 'blue';
    case 3:
      return 'blue';
    case 4:
      return 'blue';
    case 5:
      return 'blue';
    case 6:
      return 'blue';
    case 7:
      return 'blue';
    case 100:
      return 'green';
    default:
      return 'grey';
  }
};

const proxyStatusColor = (step, status) => {
  if (step === 1) return statusToColor(status);
  else if (step === 2) return contractStatusToColor(status);
  else if (step === 3) return paymentStatusToColor(status);
  else if (step === 4) return testStatusToColor(status);
  else if (step === 5) return statusToColor(status);
  else if (step === 6) return statusToColor(status);
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
        color: proxyStatusColor(step.step, step.status)
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
