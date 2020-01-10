import React from 'react';
import '@/style/home/registration/process.styl';

// 样式
import { Timeline, Icon, Rate } from 'antd';

export default props => {
  return (
    <div className='registion-process-box'>
      <div className='process-item-box'>
        <p className='title-box'>测试进度</p>
        <div className='process-profile-bottom-box'>
          <Timeline>
            <Timeline.Item color='green' className='process-profile-step'>
              提交上传7种材料
            </Timeline.Item>
            <Timeline.Item color='green' className='process-profile-step'>
              电子签合同
            </Timeline.Item>
            <Timeline.Item color='green' className='process-profile-step'>
              支付汇款
            </Timeline.Item>
            <Timeline.Item color='yellow' className='process-profile-step'>
              现场测试
            </Timeline.Item>
            <Timeline.Item color='gray' className='process-profile-step'>
              接收原始记录和测试报告
            </Timeline.Item>
            <Timeline.Item color='gray' className='process-profile-step'>
              给予打分
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
      <div className='process-item-box current-profile-box'>
        <p className='title-box'>
          <span>当前步骤</span>-<span>提交上传7种材料</span>
        </p>
        <ol className='process-profile-ol'>
          <li>
            <p className='current-profile-inner-left-box'>评测合同</p>

            <span className='current-right-box current-upload-button'>
              <Icon type='upload' /> 上传文件
            </span>
          </li>
          <li>
            <p className='current-profile-inner-left-box'>软件著作权证书</p>

            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          </li>
          <li>
            <p className='current-profile-inner-left-box'>样品登记表</p>

            <span className='current-right-box current-upload-button'>
              <Icon type='edit' /> 填写内容
            </span>
          </li>
          <li>
            <p className='current-profile-inner-left-box'>产品说明</p>
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          </li>
          <li>
            <p className='current-profile-inner-left-box'>用户文档集</p>
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          </li>
          <li>
            <p className='current-profile-inner-left-box'>产品介质</p>
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          </li>
          <li>
            <p className='current-profile-inner-left-box'>现场测试申请表</p>
            <div className='current-right-box'>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          </li>
        </ol>
      </div>
      <div className='process-item-box'>
        <p className='title-box'>咨询者信息</p>
        <ul className='manager-info-bottom-box'>
          <li className='manager-info-head-box'></li>
          <li className='manager-into-item-box'>
            <p>
              <Icon type='user' className='manager-info-icon' />
              用户名
            </p>
            <p>张博荣</p>
          </li>
          <li className='manager-into-item-box'>
            <p>
              <Icon type='phone' className='manager-info-icon' />
              电话
            </p>
            <p>18351923820</p>
          </li>
          <li className='manager-into-item-box'>
            <p>
              <Icon type='tag' className='manager-info-icon' />
              办理业务次数
            </p>
            <p>111</p>
          </li>
          <li className='manager-into-item-box'>
            <p>
              <Icon type='star' className='manager-info-icon' />
              星级
            </p>
            <Rate disabled defaultValue={4} />
          </li>
        </ul>
      </div>
    </div>
  );
};
