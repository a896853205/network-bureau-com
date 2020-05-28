import React from 'react';

// 组件
import DelegationProcessProfile from '@/components/delegation/Delegation-process-profile.jsx';
import DelegationCurrentProfile from '@/components/delegation/Delegation-current-profile.jsx';

export default props => {
  return (
    <>
      {/* 测试进度 */}
      {/* 这里需要传入delegationUuid去查询这个企业每个步骤的信息 */}
      <DelegationProcessProfile />
      {/* 当前步骤 */}
      {/* 这里需要一个步骤组件,每一步有每一步的组件 */}
      {/* 这里需要传入delegationUuid去查询这个企业这个步骤的详细情况 */}
      <DelegationCurrentProfile />
    </>
  );
};
