import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

//样式
import { Alert, Button, Icon, Upload, message, Skeleton, Timeline } from 'antd';
import '@/style/home/registration/electronic-contract.styl';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_CONTRACT_MANAGER_STATUS,
  UPLOAD_PDF_FILE,
  SAVE_ENTERPRISE_CONTRACT_URL,
  SELECT_CONTRACT_URL
} from '@/constants/api-constants';

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [managerUrl, setManagerUrl] = useState(''),
    [contractEnterpriseLoading, setContractEnterpriseLoading] = useState(false),
    [contractManagerUrl, setContractManagerUrl] = useState(''),
    [previewUrl, setPreviewUrl] = useState(''),
    [managerFailText, setManagermanagerFailText] = useState(''),
    [contractEnterpriseUrl, setContractEnterpriseUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [managerStatus, setManagerStatus] = useState(null),
    [needContractStatus, setNeedContractStatus] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false);

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

  // 通过url获取文件
  useEffect(() => {
    if (contractEnterpriseUrl) {
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
      })();
    }
  }, [contractEnterpriseUrl]);

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

      setNeedContractStatus(true);
      setSaveDataLoading(false);
    } else {
      message.error('请上传pdf成功后再点击提交');
    }
  };

  useEffect(() => {
    if (enterpriseRegistrationUuid && needContractStatus) {
      (async () => {
        setGetDataLoading(true);

        let contractStatus = await proxyFetch(
          SELECT_CONTRACT_MANAGER_STATUS,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (contractStatus.managerStatus === 6) {
          setManagermanagerFailText(contractStatus.managerFailText);
        }

        setManagerStatus(contractStatus.managerStatus);

        setNeedContractStatus(false);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, needContractStatus]);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let contractList = await proxyFetch(
          SELECT_CONTRACT_URL,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (contractList) {
          setContractManagerUrl(contractList.managerUrl);
          setContractEnterpriseUrl(contractList.enterpriseUrl);
        }
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

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
      }
    }
  };

  return (
    <>
      {managerStatus === 4 ? (
        <div className='electronic-contract-alert-box'>
          <Alert
            message='您已提交完毕请等待审核'
            description='请耐心等待2-3个工作日,审核完成前可修改文件并重新提交'
            type='info'
          />
        </div>
      ) : null}
      {managerFailText && managerStatus === 6 ? (
        <div className='electronic-contract-alert-box'>
          <Alert
            message='填写错误,请按描述修改'
            description={managerFailText}
            type='error'
          />
        </div>
      ) : null}
      <div className='electronic-contract-detail-box'>
        <Skeleton loading={getDataLoading}>
          <div className='detail-left-box'>
            <Timeline>
              <Timeline.Item>
                {managerUrl ? (
                  <a
                    href={managerUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button
                      size='large'
                      type='primary'
                      icon='download'
                      className='button'
                    >
                      下载合同
                    </Button>
                  </a>
                ) : (
                  <Button disabled size='large'>
                    请等待
                  </Button>
                )}
              </Timeline.Item>
              <Timeline.Item>
                <Upload showUploadList={false} customRequest={handleUploadFile}>
                  {previewUrl && !contractEnterpriseLoading ? (
                    <div>
                      <a
                        href={previewUrl}
                        onClick={e => e.stopPropagation()}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Button size='large' className='half-button'>
                          查看上传
                        </Button>
                      </a>
                      <Button size='large' className='half-button'>
                        重新上传
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size='large'
                      className='button'
                      loading={contractEnterpriseLoading}
                    >
                      扫描后上传PDF合同
                      <Icon type='inbox' />
                    </Button>
                  )}
                </Upload>
              </Timeline.Item>
              <Timeline.Item>
                <Button
                  size='large'
                  type='primary'
                  className='button'
                  loading={saveDataLoading}
                  onClick={handleEnterpriseUrlSave}
                >
                  提交
                </Button>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className='detail-right-box'>
            <Alert
              message='注意事项'
              description='请企业用户点击下载按钮,下载甲方生成的合同,并按规定盖章,扫描后上传合同pdf文件,确认无误后点击提交按钮'
              type='info'
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
