import React, { useEffect, useState } from 'react';

// 样式
import '@/style/home/registration/welcome.styl';
import { Input, Icon, Button } from 'antd';

// 请求
import proxyFetch from '@/util/request';
import * as APIS from '@/constants/api-constants';

export default props => {
  const [registrationName, setRegistrationName] = useState(''),
    [loading, setLoading] = useState(false),
    [isInsert, setIsInsert] = useState(false);

  useEffect(() => {
    if (isInsert) {
      (async () => {
        setLoading(true);

        const res = await proxyFetch(APIS.CREATE_NEW_ENTERPRISE, {
          name: registrationName
        });

        setLoading(false);

        if (res) {
          // 跳转页面
        }
      })();
    }
  }, [isInsert, registrationName]);

  return (
    <div className='welcome-box'>
      <div className='left-box'>
        <div className='top-box'>
          <h1 className='caption'>
            <Icon type='audit' />
            <span>登记办理新测试</span>
          </h1>
          <p className='passage'>
            请务必诚实、独立地回答问题，只有如此，才能得到有效的结果。
            《专业分析报告》展示的是你的专业倾向，而不是你的知识、技能、经验。
            本测试共60题；需时约10分钟。所有题目没有对错之分，请根据自己的实际情况选择。
            只要你认真、真实地填写了测试问卷，那么通常情况下你都能得到一个确实和你的性格相匹配地类型，从而我们可以得知您所适合报考的专业。
          </p>
        </div>
        <div className='bottom-box'>
          <Input
            size='large'
            placeholder='请输入测试产品名称'
            className='input'
            onChange={e => {
              setRegistrationName(e.target.value);
            }}
          />
          <Button
            size='large'
            type='primary'
            className='button'
            onClick={() => {
              setIsInsert(true);
            }}
            loading={loading}
          >
            确认
          </Button>
        </div>
      </div>
      <div className='right-box'>
        <img
          className='image'
          src='https://i.pinimg.com/564x/8c/b7/16/8cb7165c0ef95552988f3b4de4a7c402.jpg'
          alt='Paris'
        />
      </div>
    </div>
  );
};
