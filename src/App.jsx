import React from 'react';
import '@/App.styl';
import { useRouteMatch } from 'react-router-dom';

// route
import * as ROUTES from '@/constants/route-constants';

// controller
import LoginController from '@/page/Login-controller.jsx';
import RegisterController from '@/page/Register-controller.jsx';
import HomeController from '@/page/home/Home-controller.jsx';

export default props => {
  let index = useRouteMatch(ROUTES.INDEX.path),
    login = useRouteMatch(ROUTES.LOGIN.path),
    register = useRouteMatch(ROUTES.REGISTER.path),
    home = useRouteMatch(ROUTES.HOME.path);

  if ((index && index.isExact) || (login && login.isExact)) {
    // 登录页
    return <LoginController />;
  } else if (register && register.isExact) {
    // 注册页
    return <RegisterController />;
  } else if (home) {
    //
    return <HomeController />;
  }

  return <div>404</div>;
};
