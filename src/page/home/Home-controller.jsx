import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// 路由
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import RegistrationWelcomeController from '@/page/home/registration/Registration-welcome-controller.jsx';
import RegistrationProcessController from '@/page/home/registration/Registration-process-controller.jsx';
import RegistrationListController from '@/page/home/registration/Registration-list-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 样式
import '@/style/home/home.styl';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout,
  { SubMenu } = Menu;

export default props => {
  const token = window.localStorage.getItem(`${LOCAL_STORAGE}-token`),
    { uuid } = useSelector(state => state.enterpriseStore),
    history = useHistory(),
    dispatch = useDispatch();

  // 如果没有token就跳到首页
  useEffect(() => {
    if (!token) {
      history.push(ROUTES.INDEX.path);
    }
  }, [token, history]);

  // 刷新页面会导致uuid消失,需要用token再请求一遍
  useEffect(() => {
    if (!uuid && token) {
      // 由token获取enterprise信息
      // dispatch(enterpriseAction.());
    }
  }, [uuid, token, dispatch]);

  const homeIndex = useRouteMatch({
      path: ROUTES.HOME_INDEX.path,
      exact: true
    }),
    registrationWelcome = useRouteMatch({
      path: ROUTES.HOME_REGISTRATION_WELCOME.path,
      exact: true
    }),
    registrationProcess = useRouteMatch({
      path: ROUTES.HOME_REGISTRATION_PROCESS.path
    }),
    registrationList = useRouteMatch({
      path: ROUTES.HOME_REGISTRATION_LIST.path,
      exact: true
    });

  let content = null;

  if (homeIndex) {
    // 主首页
    content = <HomeIndexController />;
  } else if (registrationWelcome) {
    content = <RegistrationWelcomeController />;
  } else if (registrationProcess) {
    content = <RegistrationProcessController />;
  } else if (registrationList) {
    content = <RegistrationListController />;
  }

  return (
    <Layout>
      <Sider className='home-sider'>
        <div className='logo'>
          <Icon type='reconciliation' />
          <span>业务管理系统</span>
        </div>
        <Menu theme='dark' mode='inline'>
          <SubMenu
            key='register'
            title={
              <span>
                <Icon type='audit' />
                <span>登记测试</span>
              </span>
            }
          >
            <Menu.Item key='registrationDeal'>
              <Link to={ROUTES.HOME_REGISTRATION_WELCOME.path}>办理新测试</Link>
            </Menu.Item>
            <Menu.Item key='registrationList'>
              <Link to={ROUTES.HOME_REGISTRATION_LIST.path}>
                查看进行的测试
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='entrust'
            title={
              <span>
                <Icon type='file-search' />
                <span>委托测试</span>
              </span>
            }
          >
            <Menu.Item key='entrustDeal'>办理新测试</Menu.Item>
            <Menu.Item key='entrustList'>查看进行的测试</Menu.Item>
          </SubMenu>
          <SubMenu
            key='entrustContract'
            title={
              <span>
                <Icon type='profile' />
                <span>委托合同</span>
              </span>
            }
          >
            <Menu.Item key='entrustContractDeal'>办理新委托合同</Menu.Item>
            <Menu.Item key='entrustContractList'>查看进行的委托合同</Menu.Item>
          </SubMenu>
          <Menu.Item key='4'>
            <Icon type='setting' />
            <span className='nav-text'>企业情况设置</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='home-content'>
        <Header className='home-header' />
        <Content className='content-box'>
          <div className='content-inner-box'>{content}</div>
        </Content>
        <Footer className='home-footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
