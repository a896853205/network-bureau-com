import React, { useState, useEffect } from 'react';
//样式
import { Descriptions, Button, Modal } from 'antd';
import '@/style/home/delegation/payment.styl';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  NOTICE_DELEGATION_ACCOUNT_PAYMENT,
  GET_FILE_URL,
  SELECT_DELEGATION_CONTRACT_URL,
} from '@/constants/api-constants';
const { confirm } = Modal;

export default (props) => {
  const { enterpriseDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [managerUrl, setManagerUrl] = useState(''),
    [contractManagerUrl, setContractManagerUrl] = useState(''),
    dispatch = useDispatch();

  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        let contract = await proxyFetch(
          SELECT_DELEGATION_CONTRACT_URL,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        // 数据回显
        // setContractManagerUrl(contractList?.managerUrl);
        if (contract.managerUrl) {
          setContractManagerUrl(contract.managerUrl);
        }
      })();
    }
  }, [enterpriseDelegationUuid]);

  // 通过url获取文件
  useEffect(() => {
    (async () => {
      if (contractManagerUrl) {
        const managerUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: contractManagerUrl },
          'GET'
        );

        setManagerUrl(managerUrl);
      }
    })();
  }, [contractManagerUrl]);

  /**
   * 提交事件
   */
  const handleEnterpriseUrlSave = async () => {
    if (enterpriseDelegationUuid) {
      setSaveDataLoading(true);
      const res = await proxyFetch(
        NOTICE_DELEGATION_ACCOUNT_PAYMENT,
        {
          delegationUuid: enterpriseDelegationUuid,
        },
        'PUT'
      );

      if (res) {
        // 重新获取付款状态
        dispatch(enterpriseAction.setDelegationNeedPaymentStatus(true));
      }

      setSaveDataLoading(false);
    }
  };

  return (
    <div className='payment-info-box'>
      <Descriptions bordered className='payment-description-box'>
        <Descriptions.Item label='名称' span={3}>
          黑龙江省国防科学技术研究院
        </Descriptions.Item>
        <Descriptions.Item label='地址' span={3}>
          哈尔滨市南岗区名人府邸F栋
        </Descriptions.Item>
        <Descriptions.Item label='电话' span={3}>
          0451-58685770
        </Descriptions.Item>
        <Descriptions.Item label='开户行' span={3}>
          中国建设银行股份有限公司农垦分行
        </Descriptions.Item>
        <Descriptions.Item label='账号' span={3}>
          230501186705100000472
        </Descriptions.Item>
      </Descriptions>
      <a href={managerUrl} target='_blank' rel='noopener noreferrer'>
        <Button
          type='primary'
          size='large'
          icon='download'
          className='download-button'
        >
          下载最终合同
        </Button>
      </a>
      <Button
        loading={saveDataLoading}
        closeIcon
        onClick={() => {
          confirm({
            title: '确定已汇款?',
            content: '请核对已汇款后点击确认',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              handleEnterpriseUrlSave();
            },
            onCancel() {},
          });
        }}
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
