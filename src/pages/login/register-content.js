import React, { useState, memo } from 'react';

import {
    Form,
    Input,
    Select,
    Button,
    message,
} from 'antd';

import Avatar from './avator';
//import axios from 'axios';
import {register} from '../../services/registerService'


const { Option } = Select;

const RegisterContent = memo((props) => {

    const [studentFormsDisplay, setStudentFormsDisplay] = useState(true)
    const [, setTeacherFormDisplay] = useState(false)
    const [adminFormsDisplay, setAdminFormsDisplay] = useState(false)

    //const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        register(values).then((res)=>{
            message.success(res+" 请使用注册的用户名密码登录")
            props.setActiveTabKey('login')
            console.log(res);
        }).catch((err)=>{
            console.log("错误信息");
            console.log(err);
        })
    };

    // 注册身份不同时需要的信息也不同，该方法用来控制相关form组件的显示与隐藏
    function changeMessage(value) {
        switch (value) {
            case 'student':
                setStudentFormsDisplay(true)
                setAdminFormsDisplay(false)
                setTeacherFormDisplay(false)
                break
            case 'teacher':
                setStudentFormsDisplay(false)
                setAdminFormsDisplay(false)
                setTeacherFormDisplay(true)
                break
            case 'admin':
                setStudentFormsDisplay(false)
                setAdminFormsDisplay(true)
                setTeacherFormDisplay(false)
                break
            default:
                break
        }
    }


    return (
        <div>
            <Form name="register"
                onFinish={onFinish}>
                <Form.Item
                    name="userKind"
                    label="注册类型"
                    rules={[
                        {
                            required: true,
                            message: '请选择注册类型!',
                        },
                    ]}
                    initialValue={'student'}

                >
                    <Select placeholder="选择您的注册类型"
                        onChange={changeMessage}>
                        <Option value="student">学生</Option>
                        <Option value="teacher">教师</Option>
                        <Option value="admin">管理员</Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"

                    rules={[
                        {
                            type: 'email',
                            message: '请输入正确的邮箱地址!',
                        },
                        {
                            required: true,
                            message: '请输入邮箱地址!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="用户名"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的用户名!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认您的密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('您输入的两次密码不一致!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="school"
                    label="学校"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的学校!',
                            whitespace: true,
                        },
                    ]}
                    style={adminFormsDisplay ? { display: 'none' } : { display: 'block' }}

                >
                    <Input />
                </Form.Item><Form.Item
                    name="college"
                    label="学院"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的学院!',
                            whitespace: true,
                        },
                    ]}
                    style={adminFormsDisplay ? { display: 'none' } : { display: 'block' }}

                >
                    <Input />
                </Form.Item><Form.Item
                    name="stuClass"
                    label="班级"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的班级!',
                            whitespace: true,
                        },
                    ]}
                    style={studentFormsDisplay ? { display: 'block' } : { display: 'none' }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="intro"
                    label="自我简介"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的个人简介!',
                            whitespace: true,
                        },
                    ]}
                    style={adminFormsDisplay ? { display: 'none' } : { display: 'block' }}
                >
                    <Input.TextArea showCount maxLength={500} />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="上传头像"
                    rules={[
                        {
                            required: false                          
                        },
                    ]}
                >
                    <Avatar />
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>


            </Form>
        </div >
    )
})

export default RegisterContent