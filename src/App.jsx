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
  let index = useRouteMatch({ path: ROUTES.INDEX.path, exact: true }),
    login = useRouteMatch({ path: ROUTES.LOGIN.path, exact: true }),
    register = useRouteMatch({ path: ROUTES.REGISTER.path, exact: true }),
    home = useRouteMatch(ROUTES.HOME.path);

  if (index || login) {
    // 登录页
    return <LoginController />;
  } else if (register) {
    // 注册页
    return <RegisterController />;
  } else if (home) {
    //
    return <HomeController />;
  }

  return <div>404</div>;
};
