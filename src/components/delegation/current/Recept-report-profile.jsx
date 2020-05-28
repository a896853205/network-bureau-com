import React, { useState, useEffect } from 'react';

// 路由
import { Link } from 'react-router-dom';
import { DELEGATION_APPRAISAL } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Button } from 'antd';
import '@/style/home/delegation/recept-report.styl';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_ENTERPRISE_DELEGATION_RECORD,
  SELECT_ENTERPRISE_DELEGATION_REPORT
} from '@/constants/api-constants';

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [recordPreviewUrl, setRecordPreviewUrl] = useState(''),
    [recordUrl, setRecordUrl] = useState(''),
    [downloadRecordLoading, setDownloadRecordLoading] = useState(false),
    [reportUrl, setReportUrl] = useState(''),
    [reportPreviewUrl, setReportPreviewUrl] = useState(''),
    [downloadReportLoading, setDownloadReportLoading] = useState(false);

  // 回显原始记录word
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setDownloadRecordLoading(true);

        let record = await proxyFetch(
          SELECT_ENTERPRISE_DELEGATION_RECORD,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        setRecordUrl(record?.finalUrl);
        setDownloadRecordLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

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
    if (enterpriseDelegationUuid) {
      (async () => {
        setDownloadReportLoading(true);

        let report = await proxyFetch(
          SELECT_ENTERPRISE_DELEGATION_REPORT,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        setReportUrl(report?.finalUrl);
        setDownloadReportLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

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
      <div className='recept-report-box'>
        <div className='recept-report-detail-box'>
          <div className='recept-report-title-box'>
            <span>接受原始记录和现场报告</span>
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
          <div>
            <Link to={DELEGATION_APPRAISAL.path}>
              <span>我要评价</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
