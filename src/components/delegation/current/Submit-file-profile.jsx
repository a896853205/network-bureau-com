import React, { useEffect, useState } from 'react';

// 样式
import { Icon, Tag, Alert, Skeleton, Button } from 'antd';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_DELEGATION_STATUS,
  SUBMIT_DELEGATION_ALL_FILE,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { Link } from 'react-router-dom';
import { DELEGATION_DETAIL } from '@/constants/route-constants';

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
  const { enterpriseDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [submitAllFileLoading, setSubmitAllFileLoading] = useState(false),
    [
      enterpriseDelegationContractStatus,
      setEnterpriseDelegationContractStatus,
    ] = useState(null),
    [
      enterpriseDelegationApplyStatus,
      setEnterpriseDelegationApplyStatus,
    ] = useState(null),
    [
      enterpriseDelegationCopyrightStatus,
      setEnterpriseDelegationCopyrightStatus,
    ] = useState(null),
    [
      enterpriseDelegationDocumentStatus,
      setEnterpriseDelegationDocumentStatus,
    ] = useState(null),
    [
      enterpriseDelegationProductDescriptionStatus,
      setEnterpriseDelegationProductDescriptionStatus,
    ] = useState(null),
    [
      enterpriseDelegationProductStatus,
      setEnterpriseDelegationProductStatus,
    ] = useState(null),
    [
      enterpriseDelegationSpecimenStatus,
      setEnterpriseDelegationSpecimenStatus,
    ] = useState(null),
    [
      enterpriseDelegationBasicStatus,
      setEnterpriseDelegationBasicStatus,
    ] = useState(null),
    [waitAlert, setWaitAlert] = useState(true),
    dispatch = useDispatch(),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setLoading(true);

        let res = await proxyFetch(
          SELECT_DELEGATION_STATUS,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        setEnterpriseDelegationApplyStatus(
          res.enterpriseDelegationApplyStatus
        );
        setEnterpriseDelegationContractStatus(
          res.enterpriseDelegationContractStatus
        );
        setEnterpriseDelegationCopyrightStatus(
          res.enterpriseDelegationCopyrightStatus
        );
        setEnterpriseDelegationDocumentStatus(
          res.enterpriseDelegationDocumentStatus
        );
        setEnterpriseDelegationProductDescriptionStatus(
          res.enterpriseDelegationProductDescriptionStatus
        );
        setEnterpriseDelegationProductStatus(
          res.enterpriseDelegationProductStatus
        );
        setEnterpriseDelegationSpecimenStatus(
          res.enterpriseDelegationSpecimenStatus
        );
        setEnterpriseDelegationBasicStatus(
          res.enterpriseDelegationBasicStatus
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
  }, [enterpriseDelegationUuid]);

  /**
   * 提交事件
   */
  const handleSubmitAllFile = async () => {
    if (enterpriseDelegationUuid) {
      setSubmitAllFileLoading(true);

      await proxyFetch(
        SUBMIT_DELEGATION_ALL_FILE,
        { delegationUuid: enterpriseDelegationUuid },
        'POST'
      );

      dispatch(enterpriseAction.asyncSetDelegationSteps(enterpriseDelegationUuid));

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
        enterpriseDelegationBasicStatus?.status > 1 &&
        enterpriseDelegationContractStatus?.status > 1 &&
        enterpriseDelegationApplyStatus?.status > 1 &&
        enterpriseDelegationCopyrightStatus?.status > 1 &&
        enterpriseDelegationDocumentStatus?.status > 1 &&
        enterpriseDelegationProductDescriptionStatus?.status > 1 &&
        enterpriseDelegationSpecimenStatus?.status > 1 &&
        enterpriseDelegationProductStatus?.status > 1 ? (
          <Alert
            message='请等待审核'
            description='请耐心等待2-3个工作日,等待相关人员进行审核'
            type='success'
            className='process-alert-box'
          />
        ) : null}
        <ol className='process-profile-ol'>
          {enterpriseDelegationBasicStatus ? (
            <li>
              <p>
                <span className='profile-title'>委托测试基本信息</span>
                <Tag
                  color={getTagColor(enterpriseDelegationBasicStatus.status)}
                >
                  {enterpriseDelegationBasicStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationBasicStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/basic`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationBasicStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationBasicStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationContractStatus ? (
            <li>
              <p>
                <span className='profile-title'>评测合同</span>
                <Tag
                  color={getTagColor(
                    enterpriseDelegationContractStatus.status
                  )}
                >
                  {enterpriseDelegationContractStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationContractStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/contract`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationContractStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationContractStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationCopyrightStatus ? (
            <li>
              <p>
                <span className='profile-title'>软件著作权证书</span>
                <Tag
                  color={getTagColor(
                    enterpriseDelegationCopyrightStatus.status
                  )}
                >
                  {enterpriseDelegationCopyrightStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationCopyrightStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/copyright`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationCopyrightStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationCopyrightStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationSpecimenStatus ? (
            <li>
              <p>
                <span className='profile-title'>样品登记表</span>
                <Tag
                  color={getTagColor(
                    enterpriseDelegationSpecimenStatus.status
                  )}
                >
                  {enterpriseDelegationSpecimenStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationSpecimenStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/specimen`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationSpecimenStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationSpecimenStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationProductDescriptionStatus ? (
            <li>
              <p>
                <span className='profile-title'>产品说明</span>
                <Tag
                  color={getTagColor(
                    enterpriseDelegationProductDescriptionStatus.status
                  )}
                >
                  {enterpriseDelegationProductDescriptionStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationProductDescriptionStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/productDescription`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='upload' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationProductDescriptionStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationProductDescriptionStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationDocumentStatus ? (
            <li>
              <p>
                <span className='profile-title'>用户文档集</span>
                <Tag
                  color={getTagColor(
                    enterpriseDelegationDocumentStatus.status
                  )}
                >
                  {enterpriseDelegationDocumentStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationDocumentStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/document`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='upload' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationDocumentStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationDocumentStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationProductStatus ? (
            <li>
              <p>
                <span className='profile-title'>样品</span>
                <Tag
                  color={getTagColor(
                    enterpriseDelegationProductStatus.status
                  )}
                >
                  {enterpriseDelegationProductStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationProductStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/product`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='upload' /> 上传文件
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationProductStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationProductStatus.status < 0 ? (
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    twoToneColor='#f5222d'
                  />
                ) : null}
              </div>
            </li>
          ) : null}
          {enterpriseDelegationApplyStatus ? (
            <li>
              <p>
                <span className='profile-title'>现场测试申请表</span>
                <Tag
                  color={getTagColor(enterpriseDelegationApplyStatus.status)}
                >
                  {enterpriseDelegationApplyStatus.statusText}
                </Tag>
              </p>
              <div>
                {enterpriseDelegationApplyStatus.status < 2 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/apply`}>
                    <span className='current-right-box current-upload-button'>
                      <Icon type='edit' /> 填写内容
                    </span>
                  </Link>
                ) : null}
                {enterpriseDelegationApplyStatus.status > 0 ? (
                  <Icon
                    type='check-circle'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
                {enterpriseDelegationApplyStatus.status < 0 ? (
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
