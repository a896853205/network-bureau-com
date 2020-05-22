import React, { useEffect, useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 样式
import {
  Alert,
  Button,
  Icon,
  Upload,
  message,
  Skeleton,
  Timeline,
  Form,
} from 'antd';
import '@/style/home/registration/electronic-contract.styl';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_CONTRACT_MANAGER_FAIL_TEXT,
  UPLOAD_PDF_FILE,
  SAVE_ENTERPRISE_CONTRACT_URL,
  SELECT_CONTRACT_URL,
  DOWNLOAD_CONTRACT_WORD,
} from '@/constants/api-constants';

export default Form.create({ name: 'contractEnterprise' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { enterpriseRegistrationUuid, steps } = useSelector(
      (state) => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    // [managerUrl, setManagerUrl] = useState(''),
    [downloadContractLoading, setDownloadContractLoading] = useState(false),
    [contractEnterpriseLoading, setContractEnterpriseLoading] = useState(false),
    // [contractManagerUrl, setContractManagerUrl] = useState(''),
    [previewUrl, setPreviewUrl] = useState(''),
    [managerFailText, setManagermanagerFailText] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [needContractStatus, setNeedContractStatus] = useState(false),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    formEnterpriseUrl =
      getFieldValue('enterpriseUrl') && getFieldValue('enterpriseUrl')[0];

  const handleDownloadContractWord = async () => {
    setDownloadContractLoading(true);

    const tempUrl = await proxyFetch(
      DOWNLOAD_CONTRACT_WORD,
      { registrationUuid: enterpriseRegistrationUuid },
      'GET'
    );

    const url = `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
      tempUrl
    )}`;

    if (url) {
      window.open(url);
    }

    setDownloadContractLoading(false);
  };

  // // 通过url获取文件
  // useEffect(() => {
  //   (async () => {
  //     if (contractManagerUrl) {
  //       const managerUrl = await proxyFetch(
  //         GET_FILE_URL,
  //         { fileUrl: contractManagerUrl },
  //         'GET'
  //       );

  //       setManagerUrl(managerUrl);
  //     }
  //   })();
  // }, [contractManagerUrl]);

  // 通过url获取文件
  useEffect(() => {
    if (formEnterpriseUrl) {
      (async () => {
        setContractEnterpriseLoading(true);

        const contractPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formEnterpriseUrl },
          'GET'
        );

        setContractEnterpriseLoading(false);
        // 切换下载的url
        setPreviewUrl(contractPreviewUrl);
      })();
    }
  }, [formEnterpriseUrl]);

  /**
   * 提交事件
   */
  const handleEnterpriseUrlSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseRegistrationUuid) {
        if (!err) {
          value.registrationUuid = enterpriseRegistrationUuid;
          value.enterpriseUrl = value.enterpriseUrl[0];
          setSaveDataLoading(true);
          await proxyFetch(SAVE_ENTERPRISE_CONTRACT_URL, value);

          setNeedContractStatus(true);
          setSaveDataLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    if (enterpriseRegistrationUuid && needContractStatus) {
      dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
    }
  }, [enterpriseRegistrationUuid, needContractStatus, dispatch]);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let [contractList, contract] = await Promise.all([
          proxyFetch(
            SELECT_CONTRACT_URL,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
          proxyFetch(
            SELECT_CONTRACT_MANAGER_FAIL_TEXT,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
        ]);

        // 数据回显
        // setContractManagerUrl(contractList?.managerUrl);
        if (contractList.enterpriseUrl) {
          setFieldsValue({
            enterpriseUrl: [contractList?.enterpriseUrl],
          });
        }
        setManagermanagerFailText(contract?.managerFailText);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue]);

  /**
   * 上传pdf文件
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setContractEnterpriseLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_PDF_FILE, {
        file: file.file,
        folderName: 'registration/enterpriseContract',
      });

      // loading
      setContractEnterpriseLoading(false);

      if (fileUrl) {
        setFieldsValue({ enterpriseUrl: [fileUrl] });
      }
    }
  };

  return (
    <>
      {/* {steps[1].status === 4 ? (
        <div className='electronic-contract-alert-box'>
          <Alert
            message='您已提交完毕请等待审核'
            description='请耐心等待2-3个工作日,审核完成前可修改文件并重新提交'
            type='info'
          />
        </div>
      ) : null} */}
      {managerFailText && steps[1].status === -1 ? (
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
                <Button
                  icon='download'
                  size='large'
                  className='button'
                  type='primary'
                  loading={downloadContractLoading}
                  onClick={handleDownloadContractWord}
                >
                  生成合同下载
                </Button>
                {/* {managerUrl ? (
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
                )} */}
              </Timeline.Item>
              <Timeline.Item>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  onSubmit={handleEnterpriseUrlSave}
                >
                  <Form.Item>
                    {getFieldDecorator('enterpriseUrl', {
                      rules: [
                        {
                          required: true,
                          message: '请上传合同PDF文件！',
                        },
                      ],
                      valuePropName: 'fileList',
                      getValueFromEvent: (e) => {
                        return e && e.fileList;
                      },
                    })(
                      <Upload
                        showUploadList={false}
                        customRequest={handleUploadFile}
                        htmlType='button'
                      >
                        {previewUrl && !contractEnterpriseLoading && formEnterpriseUrl?.[0] ? (
                          <div>
                            <a
                              href={previewUrl}
                              onClick={(e) => e.stopPropagation()}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Button
                                size='large'
                                className='half-button'
                                htmlType='button'
                              >
                                查看上传
                              </Button>
                            </a>
                            <Button
                              size='large'
                              className='half-button'
                              htmlType='button'
                            >
                              重新上传
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size='large'
                            className='button'
                            loading={contractEnterpriseLoading}
                            htmlType='button'
                          >
                            扫描后上传PDF合同
                            <Icon type='inbox' />
                          </Button>
                        )}
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      size='large'
                      type='primary'
                      className='button'
                      htmlType='submit'
                      loading={saveDataLoading}
                    >
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className='detail-right-box'>
            <Alert
              message='注意事项'
              description='请企业用户点击下载按钮,下载生成的合同,并按规定盖章,扫描后上传合同pdf文件,确认无误后点击提交按钮'
              type='info'
            />
          </div>
        </Skeleton>
      </div>
    </>
  );
});

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
