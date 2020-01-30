import React, { useEffect } from 'react';

// 样式
import '@/style/home/registration/process.styl';
import '@/style/home/registration/item.styl';
import { Skeleton } from 'antd';

// 组件
import RegistrationPersonProfile from '@/components/registration/Registration-person-profile.jsx';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';
import RegistrationProfile from '@/page/home/registration/process/Registration-profile-controller.jsx';
import RegistrationDetail from '@/page/home/registration/process/Registration-detail-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

export default props => {
  const localStorageRegistrationUuid = window.localStorage.getItem(
      `${LOCAL_STORAGE}-registrationUuid`
    ),
    { enterpriseRegistrationUuid, registrationLoading } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageRegistrationUuid就跳到新增页
  useEffect(() => {
    if (!localStorageRegistrationUuid) {
      history.push(ROUTES.HOME_REGISTRATION_WELCOME.path);
    }
  }, [localStorageRegistrationUuid, history]);

  useEffect(() => {
    if (localStorageRegistrationUuid && !enterpriseRegistrationUuid) {
      dispatch(
        enterpriseAction.setEnterpriseRegistrationUuid(
          localStorageRegistrationUuid
        )
      );
    }
  }, [localStorageRegistrationUuid, enterpriseRegistrationUuid, dispatch]);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      dispatch(enterpriseAction.asyncSetRestration(enterpriseRegistrationUuid));
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  const profile = useRouteMatch({
      path: ROUTES.REGISTRATION_PROFILE.path,
      excat: true
    }),
    detail = useRouteMatch({
      path: `${ROUTES.REGISTRATION_DETAIL.path}/:type`
    });

  let content = null;

  if (profile) {
    // 概况组件
    content = <RegistrationProfile />;
  } else if (detail) {
    // 详细填写组件
    content = <RegistrationDetail type={detail.params.type} />;
  }

  return (
    <div className='registion-process-box'>
      {/* 这里用路由分为两个,一个是时间轴和概况大组件(分为步骤) */}
      {/* 另一个路由是详细填写阶段,填写完成之后都会将路由跳回到上面的路由 */}
      <Skeleton loading={registrationLoading}>{content}</Skeleton>
      {/* 咨询者信息 */}
      {/* 将managerUuid传入这个组件中查询这个人的详细信息 */}
      <RegistrationPersonProfile />
    </div>
  );
};
