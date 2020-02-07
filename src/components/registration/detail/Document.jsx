import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_WORD_FILE,
  GET_FILE_URL,
  SELECT_REGISTRATION_DOCUMENT,
  SAVE_REGISTRATION_DOCUMENT
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/registration/document.styl';
import { Form, Button, Icon, Alert, Upload, message, Skeleton } from 'antd';

export default Form.create({ name: 'document' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    [failText, setFailText] = useState(''),
    [documentLoading, setDocumentLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [templateUrl, setTemplateUrl] = useState(''),
    formDocumentUrl =
      getFieldValue('documentUrl') && getFieldValue('documentUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let registrationDocument = await proxyFetch(
          SELECT_REGISTRATION_DOCUMENT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationDocument && registrationDocument.url) {
          // 数据处理
          setFieldsValue({ documentUrl: [registrationDocument.url] });
          setIsNeedUrlFresh(true);
        }

        if (registrationDocument.failText) {
          setFailText(registrationDocument.failText);
        }

        delete registrationDocument.status;
        delete registrationDocument.statusText;
        delete registrationDocument.failText;

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue]);

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async file => {
    if (handleBeforeUpload(file)) {
      // loading
      setDocumentLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_WORD_FILE, {
        file: file.file,
        folderName: 'registration/document'
      });

      // loading
      setDocumentLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ documentUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const templateUrl = await proxyFetch(
        GET_FILE_URL,
        { fileUrl: 'sys/registration/用户文档集模板.doc' },
        'GET'
      );

      // 切换下载模板的url
      setTemplateUrl(templateUrl);
    })();
  }, []);

  useEffect(() => {
    if (formDocumentUrl && isNeedUrlFresh) {
      (async () => {
        setDocumentLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formDocumentUrl },
          'GET'
        );

        setDocumentLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formDocumentUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleSumbitSave = e => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseRegistrationUuid) {
        if (!err) {
          value.registrationUuid = enterpriseRegistrationUuid;
          value.documentUrl = value.documentUrl[0];

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_REGISTRATION_DOCUMENT, value);
          setSaveDataLoading(false);

          if (res) {
            history.push(`${REGISTRATION_PROFILE.path}`);
          }
        }
      }
    });
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>用户文档集</p>
      </div>
      {failText ? (
        <Alert
          message='上传错误,请按描述修改'
          description={failText}
          type='error'
          showIcon
        />
      ) : null}
      <div className='detail-document-box'>
        <Skeleton loading={getDataLoading}>
          <div className='document-left-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              <Form.Item label='下载用户文档集模板'>
                {templateUrl ? (
                  <a href={templateUrl}>
                    <Button className='button' icon='download' size='large'>
                      下载模板
                    </Button>
                  </a>
                ) : (
                  <Button disabled>请等待</Button>
                )}
              </Form.Item>
              {/* 内容 */}
              <Form.Item label='用户文档集'>
                {getFieldDecorator('documentUrl', {
                  valuePropName: 'fileList',
                  getValueFromEvent: e => {
                    return e && e.fileList;
                  },
                  rules: [
                    {
                      required: true,
                      message: '请上传用户文档集!'
                    }
                  ]
                })(
                  <Upload
                    showUploadList={false}
                    // 进行将图片格式和大小判断
                    customRequest={handleUploadFile}
                  >
                    {previewUrl && !documentLoading ? (
                      <Button.Group size='large'>
                        <Button
                          className='half-button'
                          onClick={() => window.open(previewUrl)}
                        >
                          查看上传
                        </Button>
                        <Button className='half-button'>重新上传</Button>
                      </Button.Group>
                    ) : (
                      <Button
                        className='button'
                        size='large'
                        loading={documentLoading}
                      >
                        点击文件上传word,PDF
                        <Icon type='inbox' />
                      </Button>
                    )}
                  </Upload>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={saveDataLoading}
                  className='button'
                  size='large'
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className='document-right-box'>
            <Alert
              message='上传用户文档集注意事项'
              description='请企业用户确保上传的word或PDF文件内容真实完整,确保上传完毕后点击下方提交按钮。'
              type='info'
              showIcon
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
  if (
    extensionName !== 'doc' &&
    extensionName !== 'docx' &&
    extensionName !== 'pdf'
  ) {
    message.error('文件类型必须为doc,docx,pdf');
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
