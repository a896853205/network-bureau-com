import React, { useEffect, useState } from 'react';

import { Icon, Rate } from 'antd';
import proxyFetch from '@/util/request';
// redux
import { useSelector } from 'react-redux';

import { GET_MANANGER_INFO } from '@/constants/api-constants';

export default props => {
  const { steps, registration } = useSelector(state => state.enterpriseStore);

  const [phone, setPhone] = useState('');

  const [name, setName] = useState('');

  const [headPortraitUrl, setHeadPortraitUrl] = useState('');
  useEffect(() => {
    console.log('steps', steps, 'registration', registration);
    // 根据registration中的currentStep属性
    // 找steps数组中的step属性对应,然后其对应的对象的managerUuid属性查找管理员信息
    // 写对应的后台路由并调用和显示
    (async () => {
      if (registration) {
        let managerUuid = await steps.find(item => {
          if (item.step === registration.currentStep) {
            return item.managerUuid;
          }
        });

        let res = await proxyFetch(GET_MANANGER_INFO, managerUuid, 'GET');

        console.log(res.headPortraitUrl);
        setHeadPortraitUrl(res.headPortraitUrl);
        setPhone(res.phone);

        setName(res.name);
      }
    })();
  }, [steps, registration]);

  return (
    <div className="process-item-box">
      <p className="title-box">咨询者信息</p>
      <ul className="manager-info-bottom-box">
        <li className="manager-info-head-box">
          <img src={headPortraitUrl} alt="" />
        </li>
        <li className="manager-into-item-box">
          <p>
            <Icon type="user" className="manager-info-icon" />
            用户名
          </p>
          <p>{name}</p>
        </li>
        <li className="manager-into-item-box">
          <p>
            <Icon type="phone" className="manager-info-icon" />
            电话
          </p>
          <p>{phone}</p>
        </li>
        <li className="manager-into-item-box">
          <p>
            <Icon type="tag" className="manager-info-icon" />
            办理业务次数
          </p>
          <p>111</p>
        </li>
        <li className="manager-into-item-box">
          <p>
            <Icon type="star" className="manager-info-icon" />
            星级
          </p>
          <Rate disabled defaultValue={4} />
        </li>
      </ul>
    </div>
  );
};
