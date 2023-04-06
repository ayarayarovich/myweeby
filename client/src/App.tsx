import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, Space} from 'antd';
import axios from "axios";

const App: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<any>([])
    const [needRefetch, setNeedRefetch] = useState(true);

    useEffect(() => {
        if (needRefetch) {
            console.log('NEED REFETCH')
            axios
                .get('/api/get')
                .then(res => {
                    setData(res.data)
                    setNeedRefetch(false)
                })
        }
    })

    const submit = (values: any) => {
        console.log(values)
        axios
            .post('/api/insert', values)
            .then(() => {
                alert('success post')
                setNeedRefetch(true)
            })
    }

    return (
        <Space direction='vertical' size={32} align='center' style={{width: '100%', marginTop: '2rem'}}>
            <Form
                layout='inline'
                form={form}
                onFinish={submit}
                initialValues={{ layout: 'inline' }}
            >
                <Form.Item name='setBookName' label="Book Name">
                    <Input placeholder="Enter book's name" />
                </Form.Item>
                <Form.Item name='setReview' label="Book Review">
                    <Input placeholder="Enter book's review" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>

            <Space direction='vertical' align='center'>
                {data.map((book: any) => (
                    <Card title={book.book_name} bordered={true} style={{width: '600px'}}>
                        {book.book_review}
                    </Card>
                ))}
            </Space>
        </Space>
    );
};

export default App;
