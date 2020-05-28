import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 组件
import DelegationContractWelcome from '@/components/delegation/current/contract/Contract-welcome.jsx';
import DelegationContractUpload from '@/components/delegation/current/contract/Contract-upload.jsx';
import DelegationContractWait from '@/components/delegation/current/contract/Contract-wait.jsx';
import DelegationContractComplete from '@/components/delegation/current/contract/Contract-complete.jsx';

export default props => {
  const { delegationSteps } = useSelector(state => state.enterpriseStore),
    [content, setContent] = useState(null);

  useEffect(() => {
    if (delegationSteps[1].status) {
      switch (delegationSteps[1].status) {
        case 1:
          // 步骤一的预览组件
          setContent(<DelegationContractWelcome />);
          break;
        case 2:
        case -1:
          // 步骤二的上传组件
          setContent(<DelegationContractUpload />);
          break;
        case 3:
          setContent(<DelegationContractWait />);
          break;
        case 4:
        case 100:
          // 步骤三的完成组件
          setContent(<DelegationContractComplete />);
          break;
        default:
          setContent(null);
      }
    }
  }, [delegationSteps]);

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>电子签合同</span>
      </p>
      {content}
    </div>
  );
};
