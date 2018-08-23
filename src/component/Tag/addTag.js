import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'

// 引入选择器组件
import Selector from '../Common/selector'

import { Row, Col,Form, Icon, Input, Button,notification,Divider,Table ,Select,Tag,Modal ,Popconfirm } from 'antd';
// import {  } from 'antd';
import {openNotification,DelopenNotification} from '../Common/popupMessage'


// 开发环境和生产环境结构切换
import host from '../Common/global';

const FormItem = Form.Item;
const Option = Select.Option;




// 公用参数 layout之类的
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};



// 组件一  从后台获取标签数据列表
class TagList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagList:this.props.taglist,

            ModalText: '是否删除？',
            visible: false,
            confirmLoading: false,
        }
        this.columns = [{
            title: '标签名',
            dataIndex: 'tagName',
            key: 'tagName',
            width:30
          }, {
            title: '二级标签',
            dataIndex: 'subTagList',
            width:30,
            render:(text,record)=>{
                const listItems = text.map((item) =>
                    <Tag color="magenta" key={item._id}>{item.tagName}</Tag>
                );
                return(
                    listItems
                )
            }
          }, {
            title: '操作',
            key: 'action',
            width:40,
            render: (text, record) => (
                <span>
                    {/* <Button type="primary"><Icon type="edit" />操作</Button> */}
                    {/* <Divider type="vertical" /> */}
                    {/* <Button type="danger" onClick={this.showModal}><Icon type="delete" />删除</Button> */}
                    <Popconfirm title="是否确定要删除？" onConfirm={()=>this.confirm(record._id)} onCancel={()=>this.cancel} okText="Yes" cancelText="No">
                        <Button type="danger"><Icon type="delete" /> 删除</Button>
                    </Popconfirm>
                    {/* <Divider type="vertical" />
                    <a href="javascript:;" className="ant-dropdown-link">
                        More actions <Icon type="down" />
                    </a> */}
                </span>
            ),
        }];

        this.pagination = {pageSize:5}//表格分页配置项
    }

    componentWillMount(){
        console.log('标签列表组件的props数据为',this.props.taglist)
    }

    confirm(e) {
        console.log(e);
        axios.post(host+'/delTag',{
            _id:e
        })
        .then(res=>{
            // console.log(res)
            if(res.data.code === 200){
                DelopenNotification()
                this.props.onUpdata()    
            }
            
        })
        .catch(e=>{
            console.log(e)
        })
    }
    render(){
        return(
            <div>
                <Table columns={this.columns} dataSource={this.props.taglist} rowKey="_id" pagination={this.pagination} />                
                <Modal title="确定"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                >
                    <p>{this.state.ModalText}</p>
                </Modal>
            </div>
            
        )
    }
}


// 组件二：添加一级标签
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class firstTag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
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
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const nameError = isFieldTouched('name') && getFieldError('name');
        // const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
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
        );
    }
}

const AddfirstTag = Form.create()(firstTag);




// 组件三：添加二级标签
class SubTag extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            taglist:this.props.taglist,
            firstTagID:'',
            subTagName:''
        }
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();

        console.log('二级标签组件的props',this.props)
        console.log('二级标签组件的state',this.state)

    }    
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    handleSubmit = (e) => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ',this.state.firstTagID, values);
                // value.firstTagID = this.state.firstTagID
                if(!this.state.firstTagID){

                }
                else{
                    let postdata = {
                        firstTagID:this.state.firstTagID,
                        subTagName:values.subTag
                    }
                    console.log(postdata)
                    
                    axios.post(host+'/saveTag',postdata)
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
            }
        });
    }
    firstTagSelect = (value) =>{
        console.log(`selected ${value}`);
        this.setState({
            firstTagID:value
        })
        // console.log(`选中了什么？？ ${this.state.firstTagID}`)
    }
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const nameError = isFieldTouched('name') && getFieldError('name');
        let _this = this
        
        return(
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem 
                {...formItemLayout}
                label="选择一级标签"
            >      
                <Select defaultValue="请选择一个一级标签" style={{ width: 320 }} onChange={this.firstTagSelect}>                    
                    {
                        this.props.taglist.map(function(item, index) {
                            return <Option value={item._id} key={index}>{item.tagName}</Option>;
                        })
                    }
                </Select> 
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="二级标签名"
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''
            }
            >
                {getFieldDecorator('subTag', {
                rules: [{ required: true, message: '请输入标签名' },{max:8,message:'不允许超过8个文字'}],
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
        )
    }
}
const AddSubTag = Form.create()(SubTag);


// 组件主体
export default class addTag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taglist:[]
        }
    }

    getTagList(){
        axios.get(host+'/getTagList')
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    // this.state.tagList = res.data.data
                    console.log('从后台获取的数据为',res.data.data)
                    this.setState({
                        taglist:res.data.data
                    })
                    console.log('主体组件的state')
                    console.log(this.state)
                }
            })
            .catch(e=>{
                console.log(e)
            })
    }
    
    componentWillMount(){
        this.getTagList()
    }

    render(){
        return(
            <div>
                <Divider orientation="left" >标签列表</Divider>                
                <Row>
                    <Col span={24}><TagList taglist={this.state.taglist} onUpdata={this.getTagList.bind(this)} /></Col>
                    {/* <Col span={12}>col-12</Col> */}
                </Row>
                <Divider orientation="left">添加一级标签</Divider>
                <Row>
                    <Col span={24}><AddfirstTag onUpdata={this.getTagList.bind(this)}/></Col>
                </Row>
                <Divider orientation="left">添加二级标签</Divider>                
                <Row>
                    <Col span={24}><AddSubTag taglist={this.state.taglist} onUpdata={this.getTagList.bind(this)} test={3}/></Col>
                </Row>
            </div>
        )
    }            
} 