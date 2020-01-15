import React, { useEffect, useState } from 'react';

// 组件
import SubmitFileProfile from './current/Submit-file-profile.jsx';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { registration } = useSelector(state => state.enterpriseStore),
    [content, setContent] = useState(null);

  useEffect(() => {
    if (registration) {
      switch (registration.currentStep) {
        case 1:
          // 步骤一的预览组件
          setContent(<SubmitFileProfile />);
          break;
        default:
          setContent(<></>);
      }
    }
  }, [registration]);

  return <> {content} </>;
};
