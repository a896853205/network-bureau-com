import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 组件
import PaymentInfo from '@/components/registration/current/payment/Payment-info.jsx';
import PaymentResult from '@/components/registration/current/payment/Payment-result.jsx';
import PaymentWelcome from '@/components/registration/current/payment/Payment-welcome.jsx';

// 请求
import proxyFetch from '@/util/request';
import { SELECT_PAYMENT_STATUS } from '@/constants/api-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [status, setStatus] = useState(''),
    [content, setContent] = useState(null);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let contract = await proxyFetch(
          SELECT_PAYMENT_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        console.log('contract=', contract);

        setStatus(contract.status);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (status) {
      switch (status) {
        case 1:
          // 步骤一的预览组件
          setContent(<PaymentWelcome />);
          break;
        case 2:
          // 步骤二的上传组件
          setContent(<PaymentInfo />);
          break;
        case 3:
        case 4:
          // 步骤三的完成组件
          setContent(<PaymentResult />);
          break;
        default:
          setContent(null);
      }
    }
  }, [status]);

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
