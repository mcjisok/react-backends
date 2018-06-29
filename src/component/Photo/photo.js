import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'

// 引入选择器组件
import Selector from '../Common/selector'

import { Row, Col,Form, Icon, Input, Button,notification,Divider,Table ,Select,Tag,Modal ,Card  } from 'antd';
// import {  } from 'antd';
import {openNotification,DelopenNotification} from '../Common/popupMessage'


const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { Meta } = Card;

const host = 'http://localhost:3000';

// 公用参数 layout之类的
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};


class PhotoGroup extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        photoGroupList:{}
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
                <Divider orientation="left">相册列表</Divider>
                <Row>
                    <Col span={24}>
                        {/* <GroupList/> */}
                    </Col>
                </Row>                
            </div>
        )
    }
}





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
        // console.log(e);
        // this.setState({
        //     visible: false,
        // });
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values);
                axios.post(host+'/savePhotoGroup',values)
                    .then(res=>{
                        console.log(res)
                        if(res.data.code === 200 ){
                            openNotification();
                            this.props.form.resetFields()
                            // 触发父组件重新从后台获取数据并更新数据
                            // this.props.onUpdata()
                            this.setState({
                                visible: false,
                            });
                        }
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                }
            });
        
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.handleReset()
    }

    // 重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const nameError = isFieldTouched('imageGroupName') && getFieldError('imageGroupName');
        const descriptionError = isFieldTouched('imageGroupDec') && getFieldError('imageGroupDec');
        // const passwordError = isFieldTouched('password') && getFieldError('password');
        return(
            <div>
                <Button type="primary" onClick={this.showModal}>新建相册</Button>
                <Modal
                    title="新建相册"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="保存"
                    cancelText="取消"
                    >
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="相册名称"
                            validateStatus={nameError ? 'error' : ''}
                            help={nameError || ''
                        }
                        >
                            {getFieldDecorator('imageGroupName', {
                            rules: [{ required: true, message: '请输入相册名称' },{max:15,message:'不允许超过15个字符'}],
                            })(
                            <Input placeholder="请输入相册名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="相册描述"
                            validateStatus={descriptionError ? 'error' : ''}
                            help={descriptionError || ''
                        }
                        >
                            {getFieldDecorator('imageGroupDec', {
                            rules: [{ required: true, message: '请输入相册描述' },{max:150,message:'不允许超过150个字符'}],
                            })(
                            <TextArea rows={4} placeholder="请输入相册描述" />
                            )}
                        </FormItem>
                        
                        {/* <FormItem 
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
                        </FormItem> */}
                    </Form>
                </Modal>
            </div>
            
        )
    }
}
const AddGroup = Form.create()(AddPhotoGroup);


class GroupList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            a:'1',
            b:'2',
            c:[1,12,2,3,1,121,1,21]
        }
    }

    getPhotoGroup(){
        axios.get(host+'/getPhotoGroupList')
        .then(res=>{
            // console.log(res)
            // console.log(typeof(res.data.data))
            this.setState({
                photoGroupList:res.data.data
            })
            // console.log(this.state.photoGroupList instanceof Array)

        })
        .catch(e=>{
            console.log(e)
        })
    }

    componentWillMount(){
        this.getPhotoGroup()
    }



    render(){     
        
        // const a = Object.keys(this.state.photoGroupList).forEach(key => {
        //     return <p>{key}</p>   
        // });
        return(
            <div>
                {
                    /* {this.state.photoGroupList.map((key)=>{
                    console.log(key)
                })} */
                    // console.log(this.state.photoGroupList === Array)
                    console.log(this.state.photoGroupList)
                }
            </div>
        )
    }
}

{/* <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                    />
                </Card> */}

export default PhotoGroup