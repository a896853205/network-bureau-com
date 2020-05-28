import React, { useEffect, useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 组件
import PaymentInfo from '@/components/delegation/current/payment/Payment-info.jsx';
import PaymentResult from '@/components/delegation/current/payment/Payment-result.jsx';
import PaymentWelcome from '@/components/delegation/current/payment/Payment-welcome.jsx';

// 请求
import proxyFetch from '@/util/request';
import { QUERY_ENTERPRISE_DELEGATION_STEP } from '@/constants/api-constants';

export default () => {
  const { enterpriseDelegationUuid, delegationNeedPaymentStatus } = useSelector(
      state => state.enterpriseStore
    ),
    [status, setStatus] = useState(''),
    [content, setContent] = useState(null),
    dispatch = useDispatch();

  useEffect(() => {
    if (enterpriseDelegationUuid && delegationNeedPaymentStatus) {
      (async () => {
        let stepList = await proxyFetch(
          QUERY_ENTERPRISE_DELEGATION_STEP,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        setStatus(stepList[2].status);
        dispatch(enterpriseAction.setDelegationNeedPaymentStatus(false));
      })();
    }
  }, [enterpriseDelegationUuid, delegationNeedPaymentStatus, dispatch]);

  useEffect(() => {
    if (status) {
      switch (status) {
        case 1:
          // 步骤一的欢迎组件
          setContent(<PaymentWelcome />);
          break;
        case 2:
          // 步骤二的交款信息
          setContent(<PaymentInfo />);
          break;
        case 3:
        case 4:
          // 步骤三的交款结果
          setContent(<PaymentResult />);
          break;
        default:
          setContent(null);
      }
    }
  }, [status]);

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>交付汇款</span>
      </p>
      {content}
    </div>
  );
};
