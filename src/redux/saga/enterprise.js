// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// actions
import enterpriseAction from '@/redux/action/enterprise';
import navToAction from '@/redux/action/nav-to';

// 请求
import proxyFetch from '@/util/request';
import * as APIS from '@/constants/api-constants';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 路由
import { HOME_INDEX, REGISTRATION_PROFILE } from '@/constants/route-constants';

const effects = {
  asyncSetEnterprise: function*({ payload }) {
    // loading开始
    yield put(enterpriseAction.setLoginLoading(true));
    // 请求登录
    const res = yield call(
      proxyFetch,
      APIS.GET_ENTERPRISE_TOKEN,
      payload,
      'GET'
    );
    // loading结束
    yield put(enterpriseAction.setLoginLoading(false));

    if (res) {
      // 成功之后将token存到localStorage中并且跳页
      localStorage.setItem(`${LOCAL_STORAGE}-token`, res.token);
      yield put(navToAction.setNavTo(HOME_INDEX.path));
    }
    // 不成功不跳
  },

  asyncCreateEnterpriseRegistration: function*({ payload }) {
    // loading开始
    yield put(enterpriseAction.setCreateEnterpriseRegistrationLoading(true));

    // 请求创建登记测试
    const registrationUuid = yield call(
      proxyFetch,
      APIS.CREATE_ENTERPRISE_REGISTRATION,
      {
        name: payload
      }
    );

    if (registrationUuid) {
      // 成功之后将registrationUuid存到localStorage中并且跳页
      localStorage.setItem(
        `${LOCAL_STORAGE}-registrationUuid`,
        registrationUuid
      );
      yield put(
        enterpriseAction.setEnterpriseRegistrationUuid(registrationUuid)
      );
      yield put(navToAction.setNavTo(REGISTRATION_PROFILE.path));
    }
    // 不成功不跳转
    // loading结束
    yield put(enterpriseAction.setCreateEnterpriseRegistrationLoading(false));
  },

  asyncSetRestration: function*({ payload }) {
    // loading
    yield put(enterpriseAction.setRegistrationLoading(true));

    // 查询具体步骤信息
    const [steps, registration] = yield call(async () => {
      return await Promise.all([
        proxyFetch(
          APIS.QUERY_ENTERPRISE_REGISTRATION_STEP,
          {
            registrationUuid: payload
          },
          'GET'
        ),
        proxyFetch(
          APIS.SELECT_REGISTRATION,
          {
            registrationUuid: payload
          },
          'GET'
        )
      ]);
    });

    // 将所有步骤和基本信息存入redux
    yield put(enterpriseAction.setSteps(steps));
    yield put(enterpriseAction.setRegistration(registration));

    // loading
    yield put(enterpriseAction.setRegistrationLoading(false));
  },

  asyncSetSysRegistrationStep: function*({ payload }) {
    yield put(enterpriseAction.setSysRegistrationStepLoading(true));

    const sysRegistrationStep = yield call(
      proxyFetch,
      APIS.QUERY_SYS_REGISTRATION_STEP,
      {},
      'GET'
    );

    yield put(enterpriseAction.setSysRegistrationStep(sysRegistrationStep));
    yield put(enterpriseAction.setSysRegistrationStepLoading(false));
  }
};

export default function*() {
  yield takeLatest(
    enterpriseAction.asyncSetEnterprise,
    effects.asyncSetEnterprise
  );
  yield takeLatest(
    enterpriseAction.asyncCreateEnterpriseRegistration,
    effects.asyncCreateEnterpriseRegistration
  );
  yield takeLatest(
    enterpriseAction.asyncSetRestration,
    effects.asyncSetRestration
  );
  yield takeLatest(
    enterpriseAction.asyncSetSysRegistrationStep,
    effects.asyncSetSysRegistrationStep
  );
}
