import React from 'react';
import '@/style/home/registration/process.styl';

// 样式
import { Timeline, Upload, Button, Icon } from 'antd';

export default props => {


  return (
    <div className='registion-process-box'>
      <div className='a-box'>
        <p className='a-top-box'>
          测试进度
        </p>
        <div className='a-bottom-box'>
          <Timeline >
            <Timeline.Item color="green" className='a-step'>
              提交上传7种材料
          </Timeline.Item>
            <Timeline.Item color="green" className='a-step'>
              电子签合同
          </Timeline.Item>
            <Timeline.Item color="green" className='a-step'>
              支付汇款
          </Timeline.Item>
            <Timeline.Item color="yellow" className='a-step'>
              现场测试
          </Timeline.Item>
            <Timeline.Item color="gray" className='a-step'>
              接受原始记录和测试报告
          </Timeline.Item>
            <Timeline.Item color="gray" className='a-step'>
              给予打分
          </Timeline.Item>
          </Timeline>
        </div>
      </div>
      <div className='b-box'>
        <p className='b-top-box'>
          <p>当前步骤-</p>
          <p>提交上传7种材料</p>
        </p>
        <div className='b-bottom-box'>
          <div className='b-inner-box'>
            <p className='b-passage'>1.评测合同</p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" /> 上传文件
            </Button>
            </Upload>
          </div>
          <div className='b-inner-box'>
            <p className='b-passage'>2.软件著作权证书</p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" /> 上传文件
            </Button>
            </Upload>
          </div>
          <div className='b-inner-box'>
            <p className='b-passage'>3.样品登记表</p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" /> 上传文件
            </Button>
            </Upload>
          </div>
          <div className='b-inner-box'>
            <p className='b-passage'>4.产品说明</p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" /> 上传文件
            </Button>
            </Upload>
          </div>
          <div className='b-inner-box'>
            <p className='b-passage'>
              5.用户文档集
          </p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" />
                上传文件
            </Button>
            </Upload>
          </div>
          <div className='b-inner-box'>
            <p className='b-passage'>6.产品介质</p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" /> 上传文件
            </Button>
            </Upload>
          </div>
          <div className='b-inner-box'>
            <p className='b-passage'>7.现场测试申请表</p>
            <Upload >
              <Button className='b-button'>
                <Icon type="upload" /> 上传文件
            </Button>
            </Upload>
          </div>
        </div>
      </div>
      <div className='c-box'>
        <p className='c-top-box'>
          用户信息
        </p>
        <div className='c-bottom-box'>
          <Icon type='user' className='c-icon' />
          <div className='c-passage'>
            <p>
              <Icon type='user' className='c-icon2' />用户名
          </p>
            <p>张博荣</p>
          </div>
          <div className='c-passage'>
            <p>
              <Icon type='phone' className='c-icon2' />电话
          </p>
            <p>18351923820</p>
          </div>
          <div className='c-passage'>
            <p>
              <Icon type='tag' className='c-icon2' />办理编号
            </p>
            <p>111</p>
          </div>
          <div className='c-passage'>
            <p>
              <Icon type='star' className='c-icon2' />星级
          </p>
            <p>★★★★★</p>
          </div>
        </div>
      </div>
    </div>
  );
};
