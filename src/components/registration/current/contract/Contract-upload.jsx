import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

//样式
import { Alert, Button, Icon, Upload } from 'antd';
import '@/style/home/registration/electronic-contract.styl';

// 请求
import proxyFetch from '@/util/request';
import { SELECT_CONTRACT_MANAGER } from '@/constants/api-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [managerStatus, setManagerStatus] = useState('');

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let contractList = await proxyFetch(
          SELECT_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setManagerStatus(contractList.managerStatus);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  return (
    <>
      <div className='electronic-contract-detail-box'>
        <div className='detail-left-box'>
          <Button
            type='primary'
            icon='download'
            className='electronic-contract-download-button'
          >
            下载合同
          </Button>
          {managerStatus === 3 ? (
            <Upload>
              <Button
                size='large'
                className='electronic-contract-upload-button'
              >
                扫描后上传PDF合同
                <Icon type='inbox' />
              </Button>
            </Upload>
          ) : (
            <div className='check-button-box'>
              <Button>查看上传</Button>
              <Button>重新上传</Button>
            </div>
          )}
          <Button type='primary' className='electronic-contract-submit-button'>
            提交
          </Button>
        </div>
        <div className='detail-right-box'>
          <Alert
            message='注意事项'
            description='请企业用户点击下载按钮,下载甲方生成的合同,并按规定盖章,扫描后上传合同pdf文件,提交完毕后,请耐心等待2-3个工作日,审核完成前可修改文件并重新提交'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
};
