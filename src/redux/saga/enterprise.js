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
import {
  HOME_INDEX,
  HOME_REGISTRATION_PROCESS
} from '@/constants/route-constants';

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

  asyncCreateEnterpriseRegistion: function*({ payload }) {
    // loading开始
    yield put(enterpriseAction.setCreateEnterpriseRegistionLoading(true));
    // 请求创建登记测试
    const res = yield call(proxyFetch, APIS.CREATE_ENTERPRISE_REGISTION, {
      name: payload
    });
    // loading结束
    yield put(enterpriseAction.setCreateEnterpriseRegistionLoading(false));

    if (res) {
      // 成功之后将enterpriseUuid存到localStorage中并且跳页
      localStorage.setItem(`${LOCAL_STORAGE}-enterpriseUuid`, res);
      yield put(navToAction.setNavTo(HOME_REGISTRATION_PROCESS.path));
    }
    // 不成功不跳转
  }
};

export default function*() {
  yield takeLatest(
    enterpriseAction.asyncSetEnterprise,
    effects.asyncSetEnterprise
  );
  yield takeLatest(
    enterpriseAction.asyncCreateEnterpriseRegistion,
    effects.asyncCreateEnterpriseRegistion
  );
}
