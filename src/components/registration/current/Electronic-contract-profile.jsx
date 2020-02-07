import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 组件
import ContractWelcome from '@/components/registration/current/contract/Contract-welcome.jsx';
import ContractUpload from '@/components/registration/current/contract/Contract-upload.jsx';
import ContractComplete from '@/components/registration/current/contract/Contract-complete.jsx';

// 请求
import proxyFetch from '@/util/request';
import { SELECT_CONTRACT_MANAGER_STATUS } from '@/constants/api-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [managerStatus, setManagerStatus] = useState(''),
    [content, setContent] = useState(null);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let contract = await proxyFetch(
          SELECT_CONTRACT_MANAGER_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setManagerStatus(contract.managerStatus);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (managerStatus) {
      switch (managerStatus) {
        case 1:
        case 2:
          // 步骤一的预览组件
          setContent(<ContractWelcome />);
          break;
        case 3:
        case 4:
        case 6:
          // 步骤二的上传组件
          setContent(<ContractUpload />);
          break;
        case 5:
          // 步骤三的完成组件
          setContent(<ContractComplete />);
          break;
        default:
          setContent(null);
      }
    }
  }, [managerStatus]);

  return (
    <>
      <div className='item-box process-item-box current-profile-box'>
        <p className='title-box'>
          <span>当前步骤</span>-<span>电子签合同</span>
        </p>
        {content}
      </div>
    </>
  );
};
