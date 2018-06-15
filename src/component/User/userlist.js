import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'


import { Table, Icon, Divider, Button ,Popconfirm, message,Avatar } from 'antd';

// 引入封装好的全局弹窗提示
import {openNotification,DelopenNotification} from '../Common/popupMessage'
// console.log(popupMessage)

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            userlist:[],
            loading: true,
        };
        this.columns = [
            {
                title: '用户头像',
                dataIndex: 'userInfoPhoto',
                key: 'userInfoPhoto',
                render: text => {
                    if(text != ''){
                        return(
                            <span>
                                <Avatar src={'http://localhost:3000'+text} />
                            </span>
                        )
                    }
                    else{
                        return(
                            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        )
                    }
                    
                }   
            },
            {
                title: '用户昵称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            }, 
            {
                title: '登录账号',
                dataIndex: 'username',
                key: 'username',
            }, 
            {
                title: '邮箱',
                dataIndex: 'useremail',
                key: 'useremail',
            }, 
            {
                title: '手机',
                dataIndex: 'usermobile',
                key: 'usermobile',
            }, 
            {
                title: '所在地',
                dataIndex: 'userAddress',
                key: 'userAddress',
            }, 
            {
                title: '用户权限',
                dataIndex: 'role',
                key: 'role',
            }, 
            {
                title: '创建时间',
                dataIndex: 'meta.createAt',
                key: 'meta.createAt',     
            },
            // {
            //     title: '邮箱',
            //     dataIndex: 'usermail',
            //     key: 'usermail',
            // }, 
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary"><Icon type="edit" />操作</Button>
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
        // console.log(this.props)
        axios.get('http://localhost:3000/userlist').then(res=>{
            // console.log(res)
            if(res.data.code === 200){
                // console.log(res.data.data)
                // this.state.userlist = res.data.data
                this.setState({ 
                    userlist: res.data.data,
                    loading : false
                })
                // console.log(this.state)
            }
        }).catch(e=>{
            // console.log(e)
        })
    }

    confirm(e) {
        // console.log(e);
        // message.success('Click on Yes');
        axios.post('http://localhost:3000/delUser',{
            _id:e
        })
        .then(res=>{
            // console.log(res)
            DelopenNotification()
            this.getdata()
        })
        .catch(e=>{
            console.log(e)
        })
    }
    
    componentWillMount(){
        this.getdata()
    }

    render(){
        return(
            // <h1>用户列表</h1>
            <Table columns={this.columns} dataSource={this.state.userlist} loading={this.state.loading} rowKey="_id" />
        )
    }
}

export default UserList