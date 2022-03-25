import React, { memo } from 'react'
import { withRouter } from 'react-router-dom';

import { Form, Input, Button, Checkbox, message } from 'antd';

import { login } from '../../services/loginService';

const LoginContent = memo((props) => {
    console.log(props);

    const onFinish = (values) => {
        console.log('Success:', values);
        login(values).then((res) => {
            console.log(res);
            message.success("登录成功！")
            window.localStorage.setItem('token', JSON.stringify(res.token));
            props.history.push('/')
        }).catch(err => {
            console.log(err);
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入您的用户名或者邮箱' }]}
                >
                    <Input placeholder='请输入您的用户名或者邮箱' />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入您的密码' }]}
                >
                    <Input.Password placeholder='请输入您的密码' />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
})

export default withRouter(LoginContent)