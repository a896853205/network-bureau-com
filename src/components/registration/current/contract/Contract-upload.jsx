import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

//样式
import { Alert, Button, Icon, Upload, message, Skeleton } from 'antd';
import '@/style/home/registration/electronic-contract.styl';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_CONTRACT_MANAGER,
  SELECT_MANAGER_CONTRACT_URL,
  UPLOAD_PDF_FILE,
  SAVE_ENTERPRISE_CONTRACT_URL,
  SELECT_ENTERPRISE_CONTRACT_URL
} from '@/constants/api-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [managerUrl, setManagerUrl] = useState(''),
    [contractEnterpriseLoading, setContractEnterpriseLoading] = useState(false),
    [contractManagerUrl, setContractManagerUrl] = useState(''),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [failText, setFailText] = useState(''),
    [contractEnterpriseUrl, setContractEnterpriseUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [managerStatus, setManagerStatus] = useState(null),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  // 查找甲方上传url
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let managerContract = await proxyFetch(
          SELECT_MANAGER_CONTRACT_URL,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (managerContract && managerContract.managerUrl) {
          // 数据处理
          setContractManagerUrl(managerContract.managerUrl);
        }
      })();
    }
  }, [enterpriseRegistrationUuid, contractManagerUrl]);

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

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let enterpriseContract = await proxyFetch(
          SELECT_ENTERPRISE_CONTRACT_URL,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (enterpriseContract && enterpriseContract.enterpriseUrl) {
          // 数据处理
          setContractEnterpriseUrl(enterpriseContract.enterpriseUrl);
          setIsNeedUrlFresh(true);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, contractEnterpriseUrl]);

  /**
   * 提交事件
   */
  const handleEnterpriseUrlSave = async () => {
    if (enterpriseRegistrationUuid && contractEnterpriseUrl) {
      let value = {};
      value.registrationUuid = enterpriseRegistrationUuid;
      value.enterpriseUrl = contractEnterpriseUrl;

      setSaveDataLoading(true);
      await proxyFetch(SAVE_ENTERPRISE_CONTRACT_URL, value);
      setSaveDataLoading(false);
    }
  };

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        let contractList = await proxyFetch(
          SELECT_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (contractList.failText) {
          setFailText(contractList.failText);
        }

        setManagerStatus(contractList.managerStatus);
      })();
    }
  }, [enterpriseRegistrationUuid, saveDataLoading]);

  /**
   * 上传pdf文件
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async file => {
    if (handleBeforeUpload(file)) {
      // loading
      setContractEnterpriseLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_PDF_FILE, {
        file: file.file,
        folderName: 'registration/enterpriseContract'
      });

      // loading
      setContractEnterpriseLoading(false);

      if (fileUrl) {
        setContractEnterpriseUrl(fileUrl);
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (contractEnterpriseUrl && isNeedUrlFresh) {
      (async () => {
        setContractEnterpriseLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: contractEnterpriseUrl },
          'GET'
        );

        setContractEnterpriseLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [contractEnterpriseUrl, isNeedUrlFresh]);

  return (
    <>
      {managerStatus === 4 ? (
        <div className='electronic-contract-alert-box'>
          <Alert
            message='请等待审核或重新提交'
            description='请耐心等待2-3个工作日,审核完成前可修改文件并重新提交'
            type='info'
          />
        </div>
      ) : null}
      {failText ? (
        <div className='electronic-contract-alert-box'>
          <Alert
            message='填写错误,请按描述修改'
            description={failText}
            type='error'
            showIcon
          />
        </div>
      ) : null}
      <div className='electronic-contract-detail-box'>
        <Skeleton loading={getDataLoading}>
          <div className='detail-left-box'>
            {managerUrl ? (
              <a href={managerUrl} target='_blank' rel='noopener noreferrer'>
                <Button
                  type='primary'
                  icon='download'
                  className='electronic-contract-download-button'
                >
                  下载合同
                </Button>
              </a>
            ) : (
              <Button disabled>请等待</Button>
            )}
            <Upload showUploadList={false} customRequest={handleUploadFile}>
              {previewUrl && !contractEnterpriseLoading ? (
                <div>
                  <a
                    href={previewUrl}
                    onClick={e => e.stopPropagation()}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button>查看上传</Button>
                  </a>
                  <Button>重新上传</Button>
                </div>
              ) : (
                <Button
                  size='large'
                  className='electronic-contract-upload-button'
                  loading={contractEnterpriseLoading}
                >
                  扫描后上传PDF合同
                  <Icon type='inbox' />
                </Button>
              )}
            </Upload>
            <Button
              type='primary'
              className='electronic-contract-submit-button'
              loading={saveDataLoading}
              onClick={handleEnterpriseUrlSave}
            >
              提交
            </Button>
          </div>
          <div className='detail-right-box'>
            <Alert
              message='注意事项'
              description='请企业用户点击下载按钮,下载甲方生成的合同,并按规定盖章,扫描后上传合同pdf文件,确认无误后点击提交按钮'
              type='info'
              showIcon
            />
          </div>
        </Skeleton>
      </div>
    </>
  );
};

const handleBeforeUpload = ({ file }) => {
  // 后缀名
  const extensionName = file.name.split('.')[1].toLowerCase();

  // 判断后缀名是否非法
  if (extensionName !== 'pdf') {
    message.error('文件类型必须为pdf');
    return false;
  }

  // 判断大小是否符合
  if (file.size > 1024 * 1024 * 10) {
    // 10MB
    message.error('文件大小必须小于10MB');
    return false;
  }

  return true;
};
