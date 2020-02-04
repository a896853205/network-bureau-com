import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 组件
import ContractWelcome from '../detail/Contract-welcome.jsx';
import ContractUpload from '../detail/Contract-upload.jsx';
import ContractComplete from '../detail/Contract-complete.jsx';

// 请求
import proxyFetch from '@/util/request';
import { GET_CONTRACT_MANAGER } from '@/constants/api-constants';


export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [managerStatus, setManagerStatus] = useState(''),
    [content, setContent] = useState(null);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let contractList = await proxyFetch(
          GET_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setManagerStatus(contractList.managerStatus);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (managerStatus) {
      switch (managerStatus) {
        case 1:
          // 步骤一的预览组件
          setContent(<ContractWelcome />);
          break;
        case 2:
          // 步骤一的预览组件
          setContent(<ContractWelcome />);
          break;
        case 3:
          // 步骤一的预览组件
          setContent(<ContractUpload />);
          break;
        case 4:
          // 步骤一的预览组件
          setContent(<ContractUpload />);
          break;
        case 5:
          // 步骤一的预览组件
          setContent(<ContractComplete />);
          break;
        default:
          setContent(<></>);
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
