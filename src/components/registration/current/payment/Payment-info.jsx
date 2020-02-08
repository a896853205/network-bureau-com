import React, { useState } from 'react';
//样式
import { Descriptions, Button } from 'antd';
import '@/style/home/registration/payment.styl';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import { UPDATE_PAYMENT_STATUS } from '@/constants/api-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  /**
   * 提交事件
   */
  const handleEnterpriseUrlSave = async () => {
    if (enterpriseRegistrationUuid) {
      setSaveDataLoading(true);
      const res = await proxyFetch(UPDATE_PAYMENT_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        status: 3
      });

      if (res) {
        // 重新获取付款状态
        dispatch(enterpriseAction.setNeedPaymentStatus(true));
      }

      setSaveDataLoading(false);
    }
  };

  return (
    <div className='payment-info-box'>
      <Descriptions bordered className='payment-description-box'>
        <Descriptions.Item label='名称' span={3}>
          黑龙江省国防科技研究院
        </Descriptions.Item>
        <Descriptions.Item label='地址' span={3}>
          哈尔滨市南岗区名人府邸
        </Descriptions.Item>
        <Descriptions.Item label='开户行' span={3}>
          中国建设银行股份有限公司农垦分行
        </Descriptions.Item>
        <Descriptions.Item label='账号' span={3}>
          230501186705100000472
        </Descriptions.Item>
      </Descriptions>
      <Button
        loading={saveDataLoading}
        onClick={handleEnterpriseUrlSave}
        className='button'
        size='large'
        type='primary'
        htmlType='submit'
      >
        已汇款
      </Button>
    </div>
  );
};
