import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_FILE,
  GET_FILE_URL,
  SELECT_REGISTRATION_COPYRIGHT,
  SAVE_REGISTRATION_COPYRIGHT
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/registration/copyright.styl';
import { Form, Button, Icon, Alert, Upload, Skeleton, message } from 'antd';

export default Form.create({ name: 'copyright' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    [failText, setFailText] = useState(''),
    [copyprightLoading, setCopyprightLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    formCopyrightUrl =
      getFieldValue('copyrightUrl') && getFieldValue('copyrightUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let registrationCopyright = await proxyFetch(
          SELECT_REGISTRATION_COPYRIGHT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationCopyright && registrationCopyright.url) {
          // 数据处理
          setFieldsValue({ copyrightUrl: [registrationCopyright.url] });
          setIsNeedUrlFresh(true);
        }

        if (registrationCopyright.failText) {
          setFailText(registrationCopyright.failText);
        }

        delete registrationCopyright.status;
        delete registrationCopyright.statusText;
        delete registrationCopyright.failText;

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue]);

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadImage = async file => {
    if (handleBeforeUpload(file)) {
      // loading
      setCopyprightLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_FILE, {
        file: file.file,
        folderName: 'registration/copyright'
      });

      // loading
      setCopyprightLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ copyrightUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formCopyrightUrl && isNeedUrlFresh) {
      (async () => {
        setCopyprightLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formCopyrightUrl },
          'GET'
        );

        setCopyprightLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formCopyrightUrl, isNeedUrlFresh]);

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
          value.copyrightUrl = value.copyrightUrl[0];

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_REGISTRATION_COPYRIGHT, value);
          setSaveDataLoading(false);

          if (res) {
            history.push(REGISTRATION_PROFILE.path);
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
        <p className='subtitle-title'>软件著作权证书</p>
      </div>
      {failText ? (
        <Alert
          message='上传错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='detail-copyright-box'>
        <Skeleton loading={getDataLoading}>
          <div className='copyright-left-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              {/* 内容 */}
              <Form.Item label='软件著作权证书'>
                {getFieldDecorator('copyrightUrl', {
                  valuePropName: 'fileList',
                  getValueFromEvent: e => {
                    return e && e.fileList;
                  },
                  rules: [
                    {
                      required: true,
                      message: '请上传软件著作权证书！'
                    }
                  ]
                })(
                  <Upload
                    showUploadList={false}
                    // 进行将图片格式和大小判断
                    customRequest={handleUploadImage}
                  >
                    {previewUrl && !copyprightLoading ? (
                      <div>
                        <Button
                          className='half-button'
                          size='large'
                          onClick={() => window.open(previewUrl)}
                        >
                          查看上传
                        </Button>
                        <Button size='large' className='half-button'>
                          重新上传
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className='button'
                        size='large'
                        loading={copyprightLoading}
                      >
                        点击文件上传jpg,jpeg,png
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
          <div className='copyright-right-box'>
            <Alert
              message='上传软件著作权证书注意事项'
              description='请企业用户扫描其软件著作权证书,确保上传完毕后点击下方提交按钮。'
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
  if (
    extensionName !== 'jpg' &&
    extensionName !== 'jpeg' &&
    extensionName !== 'png'
  ) {
    message.error('图片类型必须为jpg,jpeg,png');
    return false;
  }

  // 判断大小是否符合
  if (file.size > 1024 * 1024 * 10) {
    // 10MB
    message.error('图片文件大小必须小于10MB');
    return false;
  }

  return true;
};
