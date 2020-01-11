import React from 'react';
import '@/style/home/registration/process.styl';

// 组件
import RegistrationProcessProfile from '@/components/registration/Registration-process-profile.jsx';
import RegistrationCurrentProfile from '@/components/registration/Registration-current-profile.jsx';
import RegistrationPersonProfile from '@/components/registration/Registration-person-profile.jsx';

export default props => {
  return (
    <div className='registion-process-box'>
      {/* 测试进度 */}
      {/* 这里需要传入registrationUuid去查询这个企业每个步骤的信息 */}
      <RegistrationProcessProfile />
      {/* 当前步骤 */}
      {/* 这里需要一个步骤组件,每一步有每一步的组件 */}
      {/* 这里需要传入registrationUuid去查询这个企业这个步骤的详细情况 */}
      <RegistrationCurrentProfile />
      {/* 咨询者信息 */}
      {/* 将managerUuid传入这个组件中查询这个人的详细信息 */}
      <RegistrationPersonProfile />
    </div>
  );
};
