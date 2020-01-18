import React, { useEffect, useState } from 'react';

import { Icon, Rate } from 'antd';
import proxyFetch from '@/util/request';
// redux
import { useSelector } from 'react-redux';

import { GET_MANANGER_INFO } from '@/constants/api-constants';

export default props => {
  const { steps, registration } = useSelector(state => state.enterpriseStore),
    [phone, setPhone] = useState(''),
    [name, setName] = useState(''),
    [headPortraitUrl, setHeadPortraitUrl] = useState(''),
    [star, setStar] = useState(5);
    
  useEffect(() => {
    // 根据registration中的currentStep属性
    // 找steps数组中的step属性对应,然后其对应的对象的managerUuid属性查找管理员信息
    // 写对应的后台路由并调用和显示
    if (registration) {
      (async () => {
        let { managerUuid } = steps.find(item => {
          return item.step === registration.currentStep;
        });

        let { headPreviewUrl, phone, name, star } = await proxyFetch(
          GET_MANANGER_INFO,
          { managerUuid },
          'GET'
        );

        setHeadPortraitUrl(headPreviewUrl);
        setPhone(phone);
        setName(name);
        setStar(star);
      })();
    }
  }, [steps, registration]);

  return (
    <div className='item-box process-item-box'>
      <p className='title-box'>咨询者信息</p>
      <ul className='manager-info-bottom-box'>
        <li className='manager-info-head-box'>
          <img
            src={headPortraitUrl}
            alt=''
            style={{
              width: '100px',
              height: '100px'
            }}
          />
        </li>
        <li className='manager-into-item-box'>
          <p>
            <Icon type='user' className='manager-info-icon' />
            用户名
          </p>
          <p>{name}</p>
        </li>
        <li className='manager-into-item-box'>
          <p>
            <Icon type='phone' className='manager-info-icon' />
            电话
          </p>
          <p>{phone}</p>
        </li>
        {/* <li className='manager-into-item-box'>
          <p>
            <Icon type='tag' className='manager-info-icon' />
            办理业务次数
          </p>
          <p>111</p>
        </li> */}
        <li className='manager-into-item-box'>
          <p>
            <Icon type='star' className='manager-info-icon' />
            星级
          </p>
          <Rate disabled defaultValue={star} />
        </li>
      </ul>
    </div>
  );
};
