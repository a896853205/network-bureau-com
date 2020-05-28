import React, { useEffect } from 'react';

// 样式
import '@/style/home/delegation/process.styl';
import '@/style/home/delegation/item.styl';
import { Skeleton } from 'antd';

// 组件
import DelegationPersonProfile from '@/components/delegation/Delegation-person-profile.jsx';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';
import DelegationProfile from '@/page/home/delegation/process/Delegation-profile-controller.jsx';
import DelegationDetail from '@/page/home/delegation/process/Delegation-detail-controller.jsx';
import PersonalAppraisal from '@/page/home/delegation/process/Personal-appraisal-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

export default props => {
  const localStorageDelegationUuid = window.localStorage.getItem(
      `${LOCAL_STORAGE}-delegationUuid`
    ),
    { enterpriseDelegationUuid, delegationLoading } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageDelegationUuid就跳到新增页
  useEffect(() => {
    if (!localStorageDelegationUuid) {
      history.push(ROUTES.HOME_DELEGATION_WELCOME.path);
    }
  }, [localStorageDelegationUuid, history]);

  useEffect(() => {
    if (localStorageDelegationUuid && !enterpriseDelegationUuid) {
      dispatch(
        enterpriseAction.setEnterpriseDelegationUuid(
          localStorageDelegationUuid
        )
      );
    }
  }, [localStorageDelegationUuid, enterpriseDelegationUuid, dispatch]);

  useEffect(() => {
    if (enterpriseDelegationUuid) {
      dispatch(enterpriseAction.asyncSetDelegation(enterpriseDelegationUuid));
    }
  }, [dispatch, enterpriseDelegationUuid, localStorageDelegationUuid]);

  const profile = useRouteMatch({
      path: ROUTES.DELEGATION_PROFILE.path,
      excat: true
    }),
    detail = useRouteMatch({
      path: `${ROUTES.DELEGATION_DETAIL.path}/:type`
    }),
    appraisal = useRouteMatch({
      path: ROUTES.DELEGATION_APPRAISAL.path
    });

  let content = null;

  if (profile) {
    // 概况组件
    content = <DelegationProfile />;
  } else if (detail) {
    // 详细填写组件
    content = <DelegationDetail type={detail.params.type} />;
  } else if (appraisal) {
    content = <PersonalAppraisal />;
  }

  return (
    <div className='registion-process-box'>
      {/* 这里用路由分为两个,一个是时间轴和概况大组件(分为步骤) */}
      {/* 另一个路由是详细填写阶段,填写完成之后都会将路由跳回到上面的路由 */}
      <Skeleton loading={delegationLoading}>{content}</Skeleton>
      {/* 咨询者信息 */}
      {/* 将managerUuid传入这个组件中查询这个人的详细信息 */}
      <DelegationPersonProfile />
    </div>
  );
};
