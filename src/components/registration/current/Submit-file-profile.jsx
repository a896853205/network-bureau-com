import React, { useEffect, useState } from 'react';

// 样式
import { Icon, Tag, Alert, Skeleton, Button } from 'antd';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_STATUS,
  SUBMIT_ALL_FILE,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_DETAIL } from '@/constants/route-constants';

const getTagColor = (status) => {
  switch (status) {
    case 0:
      return 'gray';
    case 1:
      return 'blue';
    case 2:
      return 'purple';
    case 100:
      return 'green';
    case -1:
      return 'red';
    default:
      return 'gray';
  }
};

export default (props) => {
  const { enterpriseRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [submitAllFileLoading, setSubmitAllFileLoading] = useState(false),
    [
      enterpriseRegistrationContractStatus,
      setEnterpriseRegistrationContractStatus,
    ] = useState(null),
    [
      enterpriseRegistrationApplyStatus,
      setEnterpriseRegistrationApplyStatus,
    ] = useState(null),
    [
      enterpriseRegistrationCopyrightStatus,
      setEnterpriseRegistrationCopyrightStatus,
    ] = useState(null),
    [
      enterpriseRegistrationDocumentStatus,
      setEnterpriseRegistrationDocumentStatus,
    ] = useState(null),
    [
      enterpriseRegistrationProductDescriptionStatus,
      setEnterpriseRegistrationProductDescriptionStatus,
    ] = useState(null),
    [
      enterpriseRegistrationProductStatus,
      setEnterpriseRegistrationProductStatus,
    ] = useState(null),
    [
      enterpriseRegistrationSpecimenStatus,
      setEnterpriseRegistrationSpecimenStatus,
    ] = useState(null),
    [
      enterpriseRegistrationBasicStatus,
      setEnterpriseRegistrationBasicStatus,
    ] = useState(null),
    [waitAlert, setWaitAlert] = useState(true),
    dispatch = useDispatch(),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setLoading(true);

        let res = await proxyFetch(
          SELECT_REGISTRATION_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setEnterpriseRegistrationApplyStatus(
          res.enterpriseRegistrationApplyStatus
        );
        setEnterpriseRegistrationContractStatus(
          res.enterpriseRegistrationContractStatus
        );
        setEnterpriseRegistrationCopyrightStatus(
          res.enterpriseRegistrationCopyrightStatus
        );
        setEnterpriseRegistrationDocumentStatus(
          res.enterpriseRegistrationDocumentStatus
        );
        setEnterpriseRegistrationProductDescriptionStatus(
          res.enterpriseRegistrationProductDescriptionStatus
        );
        setEnterpriseRegistrationProductStatus(
          res.enterpriseRegistrationProductStatus
        );
        setEnterpriseRegistrationSpecimenStatus(
          res.enterpriseRegistrationSpecimenStatus
        );
        setEnterpriseRegistrationBasicStatus(
          res.enterpriseRegistrationBasicStatus
        );

        for (let itemStatus in res) {
          if (res[itemStatus].status === 0 || res[itemStatus].status === -1) {
            setWaitAlert(false);
            break;
          }
        }

        setLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  /**
   * 提交事件
   */
  const handleSubmitAllFile = async () => {
    if (enterpriseRegistrationUuid) {
      setSubmitAllFileLoading(true);

      await proxyFetch(
        SUBMIT_ALL_FILE,
        { registrationUuid: enterpriseRegistrationUuid },
        'POST'
      );

      dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));

      setSubmitAllFileLoading(false);
    }
  };

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>提交上传8种材料</span>
      </p>
      <Skeleton loading={loading}>
        {waitAlert &&
        enterpriseRegistrationBasicStatus?.status > 1 &&
        enterpriseRegistrationContractStatus?.status > 1 &&
        enterpriseRegistrationApplyStatus?.status > 1 &&
        enterpriseRegistrationCopyrightStatus?.status > 1 &&
        enterpriseRegistrationDocumentStatus?.status > 1 &&
        enterpriseRegistrationProductDescriptionStatus?.status > 1 &&
        enterpriseRegistrationSpecimenStatus?.status > 1 &&
        enterpriseRegistrationProductStatus?.status > 1 ? (
          <Alert
            message='请等待审核'
            description='请耐心等待2-3个工作日,等待相关人员进行审核'
            type='success'
            className='process-alert-box'
          />
        ) : null}
        <ol className='process-profile-ol'>
          {enterpriseRegistrationBasicStatus ? (
            <li>
              <p>
                <span className='profile-title'>登记测试基本信息</span>
                <Tag
                  color={getTagColor(enterpriseRegistrationBasicStatus.status)}
                >
                  {enterpriseRegistrationBasicStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationBasicStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/basic`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationBasicStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationBasicStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationContractStatus ? (
            <li>
              <p>
                <span className='profile-title'>评测合同</span>
                <Tag
                  color={getTagColor(
                    enterpriseRegistrationContractStatus.status
                  )}
                >
                  {enterpriseRegistrationContractStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationContractStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/contract`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationContractStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationContractStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationCopyrightStatus ? (
            <li>
              <p>
                <span className='profile-title'>软件著作权证书</span>
                <Tag
                  color={getTagColor(
                    enterpriseRegistrationCopyrightStatus.status
                  )}
                >
                  {enterpriseRegistrationCopyrightStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationCopyrightStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/copyright`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationCopyrightStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationCopyrightStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationSpecimenStatus ? (
            <li>
              <p>
                <span className='profile-title'>样品登记表</span>
                <Tag
                  color={getTagColor(
                    enterpriseRegistrationSpecimenStatus.status
                  )}
                >
                  {enterpriseRegistrationSpecimenStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationSpecimenStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/specimen`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationSpecimenStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationSpecimenStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationProductDescriptionStatus ? (
            <li>
              <p>
                <span className='profile-title'>产品说明</span>
                <Tag
                  color={getTagColor(
                    enterpriseRegistrationProductDescriptionStatus.status
                  )}
                >
                  {enterpriseRegistrationProductDescriptionStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationProductDescriptionStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/productDescription`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='upload' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationProductDescriptionStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationProductDescriptionStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationDocumentStatus ? (
            <li>
              <p>
                <span className='profile-title'>用户文档集</span>
                <Tag
                  color={getTagColor(
                    enterpriseRegistrationDocumentStatus.status
                  )}
                >
                  {enterpriseRegistrationDocumentStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationDocumentStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/document`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='upload' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationDocumentStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationDocumentStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationProductStatus ? (
            <li>
              <p>
                <span className='profile-title'>样品</span>
                <Tag
                  color={getTagColor(
                    enterpriseRegistrationProductStatus.status
                  )}
                >
                  {enterpriseRegistrationProductStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationProductStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/product`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='upload' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationProductStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationProductStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseRegistrationApplyStatus ? (
            <li>
              <p>
                <span className='profile-title'>现场测试申请表</span>
                <Tag
                  color={getTagColor(enterpriseRegistrationApplyStatus.status)}
                >
                  {enterpriseRegistrationApplyStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseRegistrationApplyStatus.status < 2 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/apply`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseRegistrationApplyStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseRegistrationApplyStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
        </ol>
      </Skeleton>
      <div className='submit-button-box'>
        <Button
          className='submit-button'
          type='primary'
          size='large'
          onClick={handleSubmitAllFile}
          loading={submitAllFileLoading}
        >
          确认已填写/修改8种文件完毕,提交
        </Button>
      </div>
    </div>
  );
};
