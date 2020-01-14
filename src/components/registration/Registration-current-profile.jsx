import React, { useEffect } from 'react';

// 样式
import { Icon } from 'antd';

// 路由
import proxyFetch from '@/util/request';
import { SELECT_REGISTRATION_STATUS } from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
    state => state.enterpriseStore
  );

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let res = await proxyFetch(
          SELECT_REGISTRATION_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        console.log('当前步骤内容:', res);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  return (
    <div className='process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>提交上传7种材料</span>
      </p>
      <ol className='process-profile-ol'>
        <li>
          <p className='current-profile-inner-left-box'>评测合同</p>

          <span className='current-right-box current-upload-button'>
            <Icon type='upload' /> 上传文件
          </span>
        </li>
        <li>
          <p className='current-profile-inner-left-box'>软件著作权证书</p>

          <div className='current-right-box'>
            <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
          </div>
        </li>
        <li>
          <p className='current-profile-inner-left-box'>样品登记表</p>

          <span className='current-right-box current-upload-button'>
            <Icon type='edit' /> 填写内容
          </span>
        </li>
        <li>
          <p className='current-profile-inner-left-box'>产品说明</p>
          <div className='current-right-box'>
            <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
          </div>
        </li>
        <li>
          <p className='current-profile-inner-left-box'>用户文档集</p>
          <div className='current-right-box'>
            <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
          </div>
        </li>
        <li>
          <p className='current-profile-inner-left-box'>产品介质</p>
          <div className='current-right-box'>
            <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
          </div>
        </li>
        <li>
          <p className='current-profile-inner-left-box'>现场测试申请表</p>
          <div className='current-right-box'>
            <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
          </div>
        </li>
      </ol>
    </div>
  );
};
