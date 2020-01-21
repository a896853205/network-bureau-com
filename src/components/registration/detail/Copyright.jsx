import React, { useState, useEffect } from 'react';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import { UPLOAD_FILE, GET_FILE_URL } from '@/constants/api-constants';

// 样式
import '@/style/home/registration/copyright.styl';
import { Form, Button, Icon, Alert, Upload, message } from 'antd';

export default Form.create({ name: 'copyright' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const [copyprightLoading, setCopyprightLoading] = useState(false);
  const [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const formCopyrightUrl = getFieldValue('copyrightUrl');

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadImage = async file => {
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
      setFieldsValue({ copyrightUrl: fileUrl });
      setIsNeedUrlFresh(true);
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

  const handleBeforeUpload = file => {
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

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>软件著作权证书</p>
      </div>
      <div className='detail-copyright-box'>
        <div className='copyright-left-box'>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            {/* 内容 */}
            <Form.Item label='软件著作权证书'>
              {getFieldDecorator('copyrightUrl', {
                valuePropName: 'fileList',
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
                  beforeUpload={handleBeforeUpload}
                  customRequest={handleUploadImage}
                >
                  {previewUrl && !copyprightLoading ? (
                    <div>
                      <a href={previewUrl} onClick={e => e.stopPropagation()}>
                        <Button>查看上传</Button>
                      </a>
                      <Button>重新上传</Button>
                    </div>
                  ) : (
                    <Button size='large'>
                      <p>
                        <Icon type={copyprightLoading ? 'loading' : 'inbox'} />
                        点击文件上传jpg,jpeg,png
                      </p>
                    </Button>
                  )}
                </Upload>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Button type='primary' htmlType='submit'>
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
            showIcon
          />
        </div>
      </div>
    </>
  );
});
