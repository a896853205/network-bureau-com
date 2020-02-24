import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Alert, Tag, Skeleton, Button } from 'antd';
import '@/style/home/registration/field-test.styl';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_TEST_REGISTRATION_APPLY,
  SELECT_TEST_REGISTRATION_SPECIMEN,
  GET_FILE_URL,
  SELECT_ENTERPRISE_REGISTRATION_RECORD,
  SELECT_ENTERPRISE_REGISTRATION_REPORT
} from '@/constants/api-constants';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_DETAIL } from '@/constants/route-constants';

export default props => {
  const { enterpriseRegistrationUuid, steps } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [applyManagerStatus, setApplyManagerStatus] = useState(0),
    [recordPreviewUrl, setRecordPreviewUrl] = useState(''),
    [recordUrl, setRecordUrl] = useState(''),
    [downloadRecordLoading, setDownloadRecordLoading] = useState(false),
    [reportUrl, setReportUrl] = useState(''),
    [reportPreviewUrl, setReportPreviewUrl] = useState(''),
    [downloadReportLoading, setDownloadReportLoading] = useState(false),
    [specimenManagerStatus, setSpecimenManagerStatus] = useState(0);

  const getTagColor = status => {
    switch (status) {
      case 0:
        return 'gray';
      case 1:
        return 'blue';
      case 2:
        return 'blue';
      case 3:
        return 'blue';
      case 100:
        return 'green';
      case -1:
        return 'red';
      case -2:
        return 'red';
      case -3:
        return 'red';
      default:
        return 'gray';
    }
  };

  const getTagText = status => {
    switch (status) {
      case 0:
        return '未审核';
      case 1:
        return '审核中';
      case 2:
        return '审核中';
      case 3:
        return '审核中';
      case 100:
        return '审核通过';
      case -1:
        return '内容错误';
      case -2:
        return '内容错误';
      case -3:
        return '内容错误';
      default:
        return '未开始';
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        const [registrationApply, registrationSpecimen] = await Promise.all([
          proxyFetch(
            SELECT_TEST_REGISTRATION_APPLY,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
          proxyFetch(
            SELECT_TEST_REGISTRATION_SPECIMEN,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          )
        ]);

        if (registrationApply) {
          setApplyManagerStatus(registrationApply.managerStatus);
        }

        if (registrationSpecimen) {
          setSpecimenManagerStatus(registrationSpecimen.managerStatus);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  // 回显原始记录word
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setDownloadRecordLoading(true);

        let record = await proxyFetch(
          SELECT_ENTERPRISE_REGISTRATION_RECORD,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setRecordUrl(record?.finalUrl);
        setDownloadRecordLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (recordUrl) {
      (async () => {
        setDownloadRecordLoading(true);
        const recordPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: recordUrl },
          'GET'
        );

        setRecordPreviewUrl(recordPreviewUrl);
        setDownloadRecordLoading(false);
      })();
    }
  }, [recordUrl]);

  // 回显原始记录word
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setDownloadReportLoading(true);

        let report = await proxyFetch(
          SELECT_ENTERPRISE_REGISTRATION_REPORT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setReportUrl(report?.finalUrl);
        setDownloadReportLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (reportUrl) {
      (async () => {
        setDownloadReportLoading(true);
        const reportPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: reportUrl },
          'GET'
        );

        setReportPreviewUrl(reportPreviewUrl);
        setDownloadReportLoading(false);
      })();
    }
  }, [reportUrl]);

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>现场测试</span>
      </p>
      <div className='field-test-box'>
        <div className='test-info-alert-box'>
          <Alert
            message='请等待'
            description={`请等待现场测试,当前测试进度:${steps[3].statusText}`}
            type='info'
          />
        </div>
        <div className='field-test-detail-box'>
          <Skeleton loading={getDataLoading}>
            <div className='file-modify-title-box'>
              修改样品登记表和软件测试申请表
            </div>
            <div className='link-box'>
              <div className='link-left-box'>
                {specimenManagerStatus < 0 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/specimenTest`}>
                    <span>样品登记表</span>
                  </Link>
                ) : (
                  <span>样品登记表</span>
                )}
                <Tag
                  color={getTagColor(specimenManagerStatus)}
                  className='tag-box'
                >
                  {getTagText(specimenManagerStatus)}
                </Tag>
              </div>
              <div className='link-right-box'>
                {applyManagerStatus < 0 ? (
                  <Link to={`${REGISTRATION_DETAIL.path}/applyTest`}>
                    <span>软件测试申请表</span>
                  </Link>
                ) : (
                  <span>软件测试申请表</span>
                )}
                <Tag
                  color={getTagColor(applyManagerStatus)}
                  className='tag-box'
                >
                  {getTagText(applyManagerStatus)}
                </Tag>
              </div>
            </div>
            <div className='file-modify-title-box'>
              <span>下载原始记录和现场报告</span>
            </div>
            <div className='download-box'>
              <div className='record-download-left-box'>
                {recordUrl ? (
                  <a
                    href={recordPreviewUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button
                      type='primary'
                      icon='download'
                      size='large'
                      className='button'
                      loading={downloadRecordLoading}
                    >
                      下载原始记录pdf文件
                    </Button>
                  </a>
                ) : (
                  <Button disabled>未生成原始记录</Button>
                )}
              </div>
              <div className='report-download-right-box'>
                {reportUrl ? (
                  <a
                    href={reportPreviewUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button
                      type='primary'
                      icon='download'
                      size='large'
                      className='button'
                      loading={downloadReportLoading}
                    >
                      下载现场报告pdf文件
                    </Button>
                  </a>
                ) : (
                  <Button disabled>未生成现场报告</Button>
                )}
              </div>
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
