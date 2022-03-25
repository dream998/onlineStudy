import React, { memo, useState } from 'react'

import { Card } from 'antd';
import { LoginWrapper } from './style'
import LoginContent from './login-content';
import RegisterContent from './register-content';

const Login = memo(() => {

  const tabListNoTitle = [
    {
      key: 'login',
      tab: '登录'
    },
    {
      key: 'register',
      tab: '注册'
    }
  ]
  const [activeTabKey, setActiveTabKey] = useState('login');
  const contentListNoTitle = {
    login: <LoginContent/>,
    register: <RegisterContent setActiveTabKey = {setActiveTabKey}/>,
  };
  
  const onTabChange = key => {
    setActiveTabKey(key);
  };

  return (
    <LoginWrapper>
      <div className='card-wrapper'>
        <Card style={{width: '70%', margin: 'auto'}}
          tabList={tabListNoTitle}
          
          activeTabKey={activeTabKey}
          
          onTabChange={key => {
            onTabChange(key)
          }}
        >
          {contentListNoTitle[activeTabKey]}
        </Card>
      </div>

    </LoginWrapper>
  )
})

export default Login