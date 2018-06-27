import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'

// 引入选择器组件
import Selector from '../Common/selector'

import { Row, Col,Form, Icon, Input, Button,notification,Divider,Table ,Select,Tag,Modal  } from 'antd';
// import {  } from 'antd';
import {openNotification,DelopenNotification} from '../Common/popupMessage'


const FormItem = Form.Item;
const Option = Select.Option;

const host = 'http://localhost:3000';

// 公用参数 layout之类的
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddPhotoGroup extends React.Component{
    constructor(props){
        super(props)
    }
    state = { visible: false }
    showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
        visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
        visible: false,
        });
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values);
                axios.post(host+'/saveTag',values)
                    .then(res=>{
                        console.log(res)
                        if(res.data.code === 200 ){
                            openNotification();
                            this.props.form.resetFields()
                            // 触发父组件重新从后台获取数据并更新数据                            
                            this.props.onUpdata()
                        }
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                }
            });
        }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const nameError = isFieldTouched('name') && getFieldError('name');
        // const passwordError = isFieldTouched('password') && getFieldError('password');
        return(
            <div>
                <Button type="primary" onClick={this.showModal}>Open</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="一级标签名"
                            validateStatus={nameError ? 'error' : ''}
                            help={nameError || ''
                        }
                        >
                            {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入标签名' },{max:5,message:'不允许超过5个字符'}],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入一级标签名称" />
                            )}
                        </FormItem>
                        
                        <FormItem 
                            {...formItemLayout}
                            label="点击可保存"
                        >
                            <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                            >
                            保存
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
            
        )
    }
}
const AddGroup = Form.create()(AddPhotoGroup);

export default class PhotoGroup extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {/* <Divider orientation="left" >标签列表</Divider>                 */}
                <Row>
                    <Col span={24}>
                        <AddGroup/>
                    </Col>
                    {/* <Col span={12}>col-12</Col> */}
                </Row>
                <Divider orientation="left">添加一级标签</Divider>
                <Row>
                    <Col span={24}>
                    </Col>
                </Row>                
            </div>
        )
    }
}