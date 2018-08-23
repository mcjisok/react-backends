import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'

import { Table, Icon, Divider, Button,Avatar,Switch,Tag ,Popconfirm, message,Card } from 'antd';
import Link from 'react-router-dom/Link';
// 全局提示框
import {openNotification,DelopenNotification} from '../Common/popupMessage'
// 开发环境和生产环境结构切换
import host from '../Common/global'
import '../../App.css';


class PushList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pushlist: [],
            loading:true
        };
        this.columns = [
            {
                title: 'push标题',
                dataIndex: 'pushTitle',
                key: 'pushTitle',
                render: text => <a href="javascript:;">{text}</a>,
                width:'150px'
            },
            {
                title: 'push内容',
                dataIndex: 'pushContent',
                key: 'pushContent',
                width:'250px',
                render: (text,record) =>(
                    <p>
                        {text.length < 25?text:text.slice(0,25)+'...'}
                    </p>
                )
            },
            {
                title: '发布时间',
                // dataIndex: 'pushdateAt',
                key: 'pushdateAt',
                render: (text,record) =>(
                    <span>
                        {record.pushdateAt?record.pushdateAt:'未发布'}
                    </span>
                )
            },
            {
                title: '用户名称',
                // dataIndex: 'userID.name',
                key: 'userID.name',
                render: (text, record) => (
                    <span>
                        {/* <Avatar style={{ backgroundColor: '#87d068' }} icon="user" /> */}
                        <Avatar src={host+record.userID.userInfoPhoto} />
                        {/* <p>321312</p> */}
                        <Divider type="vertical" />
                        {record.userID.name}
                    </span>
                ),
            },
            {
                title: '是否为草稿',
                // dataIndex: 'isDrafts',
                key: 'isDrafts',
                render: (text, record) => (
                    <span>
                        <Switch defaultChecked={record.isDrafts} onChange={this.onChange} />
                    </span>
                ),
            },
            {
                title: '标签',
                dataIndex: 'tagID',
                render:(text,record)=>{
                    if(text.length >0){
                        console.log(text)
                        return(
                            <div>
                                <Tag color="magenta" key={text[0].pTag.tagName}>{text[0].pTag.tagName}</Tag>
                                <Tag color="magenta" key={text[0].tagName}>{text[0].tagName}</Tag>
                            </div>
                        )
                    }
                    else{
                        return(
                            <Tag color="#108ee9">无标签</Tag>
                        )
                    }
                    
                }
            },
            {
                title: '创建时间',
                dataIndex: 'meta.createAt',
                key: 'meta.createAt',
            },
            {
                title: '邮箱',
                dataIndex: 'usermail',
                key: 'usermail',
            }, 
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <span>
                        <Button type="primary" ><Link to={'/pushdetail/'+record._id}><Icon type="plus-square-o" />详细</Link></Button>
                        <Divider type="vertical" />
                        <Popconfirm title="是否确定要删除？" onConfirm={()=>this.confirm(record._id)} onCancel={()=>this.cancel} okText="Yes" cancelText="No">
                            <Button type="danger"><Icon type="delete" /> 删除</Button>
                        </Popconfirm>

                        {/* <Divider type="vertical" />
                        <a href="javascript:;" className="ant-dropdown-link">
                            More actions <Icon type="down" />
                        </a> */}
                    </span>
                ),
            }
        ];
    }
    getdata(){
        axios.get(host+'/pushlist')
        .then(res=>{
            console.log(res)
            if( res.data.code === 200){
                // console.log( res.data.data)
                this.setState({
                    pushlist: res.data.data,
                    loading : false
                })
                // this.state.loading = false
            }
        })
        .catch(e=>{
            console.log(e)
        })
    }

    onChange(checked){
        console.log(`switch to ${checked}`);
    }

    //点击确认则删除对应的push 根据pushid提交给后台去删除
    confirm(e) {
        console.log(e);
        // message.success('Click on Yes');
        axios.post(host+'/delPush',{
            _id:e
        })
        .then(res=>{
            // console.log(res)
            DelopenNotification()
            this.setState({
                loading:true
            })
            this.getdata()
        })
        .catch(e=>{
            console.log(e)
        })
    }
      
    // cancel(e) {
    //     console.log(e);
    //     message.error('Click on No');
    // }

    componentWillMount() {
        this.getdata()
    }

    
    render() {
        return (
            // <h1>用户列表</h1>
            // <Card loading={this.state.loading} title="push列表">
            <Table columns={this.columns} dataSource={this.state.pushlist} loading={this.state.loading} rowKey="_id" />
            // </Card>
        )
    }
}

export default PushList