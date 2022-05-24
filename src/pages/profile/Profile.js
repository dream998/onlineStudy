import React, { memo, useEffect, useState, useRef } from 'react'
import { Form, Input, Button, Avatar, message, Upload } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { getPersonalInfo } from '../../services/courseService'
import TextArea from 'antd/lib/input/TextArea'


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const Profile = memo(() => {

    const [message, setMessage] = useState([])
    const formRef = useRef()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    useEffect(() => {
        getPersonalInfo().then(res => {
            console.log(res);
            setImageUrl('http://' + res.user_avatar_url);
            setMessage(res)
            formRef.current.setFieldsValue(res)
        })


    }, [])


    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div style={{ marginLeft: '200px' }}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}


                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                width: '100%',
                            }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </div>


            <Form
                ref={formRef}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label='用户名'
                    name='user_name'
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                    initialValue={'1231'}>
                    <Input style={{ width: '500px' }} />
                </Form.Item>
                <Form.Item
                    label='学校'
                    name='user_school'
                    rules={[
                        {
                            required: true,
                            message: '请输入所在学校!',
                        },
                    ]}>
                    <Input style={{ width: '500px' }} />
                </Form.Item>

                <Form.Item
                    label='学院'
                    name='user_college'
                    rules={[
                        {
                            required: true,
                            message: '请输入所在学校!',
                        },
                    ]}>
                    <Input style={{ width: '500px' }} />
                </Form.Item>
                <Form.Item
                    label='班级'
                    name='user_class'
                    rules={[
                        {
                            required: true,
                            message: '请输入所在班级!',
                        },
                    ]}>
                    <Input style={{ width: '500px' }} />
                </Form.Item>
                <Form.Item
                    label='邮箱'
                    name='user_email'
                    rules={[
                        {
                            required: true,
                            message: '请输入用户邮箱!',
                        },
                    ]}>
                    <Input style={{ width: '500px' }} />
                </Form.Item>
                <Form.Item
                    label='自我介绍'
                    name='introduction'
                    rules={[
                        {
                            required: true,
                            message: '请输入自我介绍!',
                        },
                    ]}>
                    <TextArea style={{ width: '500px' }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        修改个人信息
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
})

export default Profile