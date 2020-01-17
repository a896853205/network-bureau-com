import React, { useEffect, useState } from 'react';

// 样式
import { Icon } from 'antd';

// 路由
import proxyFetch from '@/util/request';
import { SELECT_REGISTRATION_STATUS } from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_DETAIL } from '@/constants/route-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [
      enterpriseRegistrationContractStatus,
      setEnterpriseRegistrationContractStatus
    ] = useState(null),
    [
      enterpriseRegistrationApplyStatus,
      setEnterpriseRegistrationApplyStatus
    ] = useState(null),
    [
      enterpriseRegistrationCopyrightStatus,
      setEnterpriseRegistrationCopyrightStatus
    ] = useState(null),
    [
      enterpriseRegistrationDocumentStatus,
      setEnterpriseRegistrationDocumentStatus
    ] = useState(null),
    [
      enterpriseRegistrationProductDescriptionStatus,
      setEnterpriseRegistrationProductDescriptionStatus
    ] = useState(null),
    [
      enterpriseRegistrationProductStatus,
      setEnterpriseRegistrationProductStatus
    ] = useState(null),
    [
      enterpriseRegistrationSpecimenStatus,
      setEnterpriseRegistrationSpecimenStatus
    ] = useState(null);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let res = await proxyFetch(
          SELECT_REGISTRATION_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setEnterpriseRegistrationApplyStatus(
          res.enterpriseRegistrationApplyStatus.status
        );
        setEnterpriseRegistrationContractStatus(
          res.enterpriseRegistrationContractStatus.status
        );
        setEnterpriseRegistrationCopyrightStatus(
          res.enterpriseRegistrationCopyrightStatus.status
        );

        setEnterpriseRegistrationDocumentStatus(
          res.enterpriseRegistrationDocumentStatus.status
        );
        setEnterpriseRegistrationProductDescriptionStatus(
          res.enterpriseRegistrationProductDescriptionStatus.status
        );
        setEnterpriseRegistrationProductStatus(
          res.enterpriseRegistrationProductStatus.status
        );
        setEnterpriseRegistrationSpecimenStatus(
          res.enterpriseRegistrationSpecimenStatus.status
        );
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
          {enterpriseRegistrationContractStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/contract`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='edit' /> 填写内容
              </span>
            </Link>
          )}
        </li>
        <li>
          <p className='current-profile-inner-left-box'>软件著作权证书</p>

          {enterpriseRegistrationCopyrightStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/copyright`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='upload' /> 上传文件
              </span>
            </Link>
          )}
        </li>
        <li>
          <p className='current-profile-inner-left-box'>样品登记表</p>
          {enterpriseRegistrationSpecimenStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/specimen`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='edit' /> 填写内容
              </span>
            </Link>
          )}
        </li>
        <li>
          <p className='current-profile-inner-left-box'>产品说明</p>
          {enterpriseRegistrationProductDescriptionStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/productDescription`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='upload' /> 上传文件
              </span>
            </Link>
          )}
        </li>
        <li>
          <p className='current-profile-inner-left-box'>用户文档集</p>
          {enterpriseRegistrationDocumentStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/document`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='upload' /> 上传文件
              </span>
            </Link>
          )}
        </li>
        <li>
          <p className='current-profile-inner-left-box'>产品介质</p>
          {enterpriseRegistrationProductStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/product`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='upload' /> 上传文件
              </span>
            </Link>
          )}
        </li>
        <li>
          <p className='current-profile-inner-left-box'>现场测试申请表</p>
          {enterpriseRegistrationApplyStatus ? (
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            <Link to={`${REGISTRATION_DETAIL.path}/apply`}>
              <span className='current-right-box current-upload-button'>
                <Icon type='edit' /> 填写内容
              </span>
            </Link>
          )}
        </li>
      </ol>
    </div>
  );
};
