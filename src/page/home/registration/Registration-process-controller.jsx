import React from 'react';
import '@/style/home/registration/process.styl';

// 组件
import RegistrationPersonProfile from '@/components/registration/Registration-person-profile.jsx';

// 路由
import { useRouteMatch } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';
import RegistrationProfile from '@/page/home/registration/process/Registration-profile-controller.jsx';
import RegistrationDetail from '@/page/home/registration/process/Registration-detail-controller.jsx';

export default props => {
  const profile = useRouteMatch({
      path: ROUTES.REGISTRATION_PROFILE.path,
      excat: true
    }),
    detail = useRouteMatch({
      path: ROUTES.REGISTRATION_DETAIL.path,
      exact: true
    });

  let content = null;

  console.log(profile);

  if (profile) {
    // 概况组件
    content = <RegistrationProfile />;
  } else if (detail) {
    // 详细填写组件
    content = <RegistrationDetail />;
  }

  return (
    <div className='registion-process-box'>
      {/* 这里用路由分为两个,一个是时间轴和概况大组件(分为步骤) */}
      {/* 另一个路由是详细填写阶段,填写完成之后都会将路由跳回到上面的路由 */}
      {content}
      {/* 咨询者信息 */}
      {/* 将managerUuid传入这个组件中查询这个人的详细信息 */}
      <RegistrationPersonProfile />
    </div>
  );
};
