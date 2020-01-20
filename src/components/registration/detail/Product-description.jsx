import React from 'react';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/registration/product-description.styl';
import { Form, Button, Icon, Alert, Upload } from 'antd';
const { Dragger } = Upload;

export default Form.create({ name: 'productDescription' })(props => {
  const { getFieldDecorator } = props.form;

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>产品说明表</p>
      </div>
      <div className='detail-description-box'>
        <div className='description-left-box'>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {/* 内容 */}
            <Form.Item label='内容'>
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: '请输入内容！'
                  }
                ]
              })(
                <Dragger {...props}>
                  <p className='ant-upload-drag-icon'>
                    <Icon type='inbox' />
                  </p>
                  <p className='ant-upload-text'>点击或拖拽文件上传</p>
                  <p className='ant-upload-hint'>请上传产品说明表word或PDF</p>
                </Dragger>
              )}
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='description-right-box'>
          <Alert
            message='上传产品说明表注意事项'
            description='请企业用户确保上传的word或PDF文件内容真实完整,并加盖公章,确保上传完毕后点击下方提交按钮。'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
});
