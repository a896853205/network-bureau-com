import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { DELEGATION_PROFILE } from '@/constants/route-constants';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_WORD_FILE,
  GET_FILE_URL,
  SELECT_DELEGATION_PRODUCT_DESCRIPTION,
  SAVE_DELEGATION_PRODUCT_DESCRIPTION,
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/delegation/product-description.styl';
import { Form, Button, Icon, Alert, Upload, message, Skeleton } from 'antd';

export default Form.create({ name: 'productDescription' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { enterpriseDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    history = useHistory(),
    [failText, setFailText] = useState(''),
    [productDescriptionLoading, setProductDescriptionLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [templateUrl, setTemplateUrl] = useState(''),
    formProductDescriptionUrl =
      getFieldValue('productDescriptionUrl') &&
      getFieldValue('productDescriptionUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetDataLoading(true);
        let delegationProductDescription = await proxyFetch(
          SELECT_DELEGATION_PRODUCT_DESCRIPTION,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        // 数据回显
        if (
          delegationProductDescription &&
          delegationProductDescription.url
        ) {
          // 数据处理
          setFieldsValue({
            productDescriptionUrl: [delegationProductDescription.url],
          });
          setIsNeedUrlFresh(true);
        }

        if (delegationProductDescription.failText) {
          setFailText(delegationProductDescription.failText);
        }

        delete delegationProductDescription.status;
        delete delegationProductDescription.statusText;
        delete delegationProductDescription.failText;

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid, setFieldsValue]);

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setProductDescriptionLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_WORD_FILE, {
        file: file.file,
        folderName: 'delegation/productDescription',
      });

      // loading
      setProductDescriptionLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ productDescriptionUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formProductDescriptionUrl && isNeedUrlFresh) {
      (async () => {
        setProductDescriptionLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formProductDescriptionUrl },
          'GET'
        );

        setProductDescriptionLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formProductDescriptionUrl, isNeedUrlFresh]);

  useEffect(() => {
    (async () => {
      const templateUrl = await proxyFetch(
        GET_FILE_URL,
        { fileUrl: 'sys/delegation/product-instruction-template.doc' },
        'GET'
      );

      // 切换下载模板的url
      setTemplateUrl(templateUrl);
    })();
  }, []);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseDelegationUuid) {
        if (!err) {
          value.delegationUuid = enterpriseDelegationUuid;
          value.productDescriptionUrl = value.productDescriptionUrl[0];

          setSaveDataLoading(true);
          const res = await proxyFetch(
            SAVE_DELEGATION_PRODUCT_DESCRIPTION,
            value
          );
          setSaveDataLoading(false);

          if (res) {
            history.push(`${DELEGATION_PROFILE.path}`);
          }
        }
      }
    });
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${DELEGATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>产品说明表</p>
      </div>
      {failText ? (
        <Alert
          message='上传错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='detail-description-box'>
        <Skeleton loading={getDataLoading}>
          <div className='description-left-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              <Form.Item label='产品说明表模板'>
                {templateUrl ? (
                  <a
                    href={`http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                      templateUrl
                    )}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button className='button' icon='download' size='large'>
                      下载模板
                    </Button>
                  </a>
                ) : (
                  <Button disabled>请等待</Button>
                )}
              </Form.Item>
              {/* 内容 */}
              <Form.Item label='内容'>
                {getFieldDecorator('productDescriptionUrl', {
                  valuePropName: 'fileList',
                  getValueFromEvent: (e) => {
                    return e && e.fileList;
                  },
                  rules: [
                    {
                      required: true,
                      message: '请上传产品说明文件！',
                    },
                  ],
                })(
                  <Upload
                    showUploadList={false}
                    // 进行将文件格式和大小判断
                    customRequest={handleUploadFile}
                  >
                    {previewUrl && !productDescriptionLoading ? (
                      <div>
                        <Button
                          className='half-button'
                          size='large'
                          onClick={(e) => {
                            e.stopPropagation();
                            const urlArr = previewUrl.split('?');
                            var urlArrList = urlArr[0],
                              appU = urlArrList.split('/');
                            var fileName = appU[appU.length - 1];
                            if (
                              fileName.split('.')[1].toLowerCase() !== 'pdf'
                            ) {
                              window.open(
                                `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                                  previewUrl
                                )}`
                              );
                            } else {
                              window.open(previewUrl);
                            }
                          }}
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
                        loading={productDescriptionLoading}
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
                  保存
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className='description-right-box'>
            <Alert
              message='上传产品说明表注意事项'
              description='请企业用户确保上传的word或PDF文件内容真实完整,并加盖公章,确保上传完毕后点击下方提交按钮。'
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
