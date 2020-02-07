import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_ZIP_FILE,
  GET_FILE_URL,
  SELECT_REGISTRATION_PRODUCT,
  SAVE_REGISTRATION_PRODUCT
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/registration/product.styl';
import { Form, Button, Icon, Alert, Upload, message, Skeleton } from 'antd';

export default Form.create({ name: 'product' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    [failText, setFailText] = useState(''),
    [productLoading, setProductLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    formProductUrl =
      getFieldValue('productUrl') && getFieldValue('productUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let registrationProduct = await proxyFetch(
          SELECT_REGISTRATION_PRODUCT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationProduct && registrationProduct.url) {
          // 数据处理
          setFieldsValue({ productUrl: [registrationProduct.url] });
          setIsNeedUrlFresh(true);
        }

        if (registrationProduct.failText) {
          setFailText(registrationProduct.failText);
        }

        delete registrationProduct.status;
        delete registrationProduct.statusText;
        delete registrationProduct.failText;

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
      setProductLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_ZIP_FILE, {
        file: file.file,
        folderName: 'registration/product'
      });

      // loading
      setProductLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ productUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formProductUrl && isNeedUrlFresh) {
      (async () => {
        setProductLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formProductUrl },
          'GET'
        );

        setProductLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formProductUrl, isNeedUrlFresh]);

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
          value.productUrl = value.productUrl[0];

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_REGISTRATION_PRODUCT, value);
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
        <p className='subtitle-title'>产品介质</p>
      </div>
      {failText ? (
        <Alert
          message='上传错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='detail-product-box'>
        <Skeleton loading={getDataLoading}>
          <div className='product-left-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              {/* 内容 */}
              <Form.Item label='内容'>
                {getFieldDecorator('productUrl', {
                  valuePropName: 'fileList',
                  getValueFromEvent: e => {
                    return e && e.fileList;
                  },
                  rules: [
                    {
                      required: true,
                      message: '请上传产品介质文件！'
                    }
                  ]
                })(
                  <>
                    {previewUrl ? (
                      <Button
                        className='half-button'
                        size='large'
                        onClick={() => window.open(previewUrl)}
                      >
                        查看上传
                      </Button>
                    ) : null}
                    <Upload
                      showUploadList={false}
                      // 进行将压缩文件格式和大小判断
                      customRequest={handleUploadImage}
                    >
                      {previewUrl && !productLoading ? (
                        <Button className='half-button' size='large'>
                          重新上传
                        </Button>
                      ) : (
                        <Button
                          className='button'
                          size='large'
                          loading={productLoading}
                        >
                          点击文件上传zip,rar
                          <Icon type='inbox' />
                        </Button>
                      )}
                    </Upload>
                  </>
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
          <div className='product-right-box'>
            <Alert
              message='上传产品介质注意事项'
              description='请企业用户确保上传的rar或zip文件内容真实完整,确保上传完毕后点击下方提交按钮。'
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
  if (extensionName !== 'zip' && extensionName !== 'rar') {
    message.error('文件类型必须为zip,rar');
    return false;
  }

  // 判断大小是否符合
  if (file.size > 1024 * 1024 * 1024 * 10) {
    // 10MB
    message.error('文件大小必须小于10GB');
    return false;
  }

  return true;
};
