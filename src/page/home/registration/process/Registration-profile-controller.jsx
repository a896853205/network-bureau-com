import React from 'react';

// 组件
import RegistrationProcessProfile from '@/components/registration/Registration-process-profile.jsx';
import RegistrationCurrentProfile from '@/components/registration/Registration-current-profile.jsx';

export default props => {
  return (
    <>
      {/* 测试进度 */}
      {/* 这里需要传入registrationUuid去查询这个企业每个步骤的信息 */}
      <RegistrationProcessProfile />
      {/* 当前步骤 */}
      {/* 这里需要一个步骤组件,每一步有每一步的组件 */}
      {/* 这里需要传入registrationUuid去查询这个企业这个步骤的详细情况 */}
      <RegistrationCurrentProfile />
    </>
  );
};
