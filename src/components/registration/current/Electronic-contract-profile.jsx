import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 组件
import ContractWelcome from '@/components/registration/current/contract/Contract-welcome.jsx';
import ContractUpload from '@/components/registration/current/contract/Contract-upload.jsx';
import ContractWait from '@/components/registration/current/contract/Contract-wait.jsx';
import ContractComplete from '@/components/registration/current/contract/Contract-complete.jsx';

export default props => {
  const { steps } = useSelector(state => state.enterpriseStore),
    [content, setContent] = useState(null);

  useEffect(() => {
    if (steps[1].status) {
      switch (steps[1].status) {
        case 1:
          // 步骤一的预览组件
          setContent(<ContractWelcome />);
          break;
        case 2:
        case -1:
          // 步骤二的上传组件
          setContent(<ContractUpload />);
          break;
        case 3:
          setContent(<ContractWait />);
          break;
        case 4:
        case 100:
          // 步骤三的完成组件
          setContent(<ContractComplete />);
          break;
        default:
          setContent(null);
      }
    }
  }, [steps]);

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>电子签合同</span>
      </p>
      {content}
    </div>
  );
};
