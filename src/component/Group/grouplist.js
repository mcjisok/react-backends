import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'

import { Table, Icon, Divider, Button,Avatar,Switch,Tag ,Popconfirm, message } from 'antd';
import Link from 'react-router-dom/Link';
// 全局提示框
import {openNotification,DelopenNotification,ChangeSuccessNotification,ChangeFailNotification} from '../Common/popupMessage'

import mrimg from '../../../src/mr.jpg'

class GroupList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            grouplist:[],
            loading:true,
            HOST:'http://localhost:3000'
        };
        this.onChangeState =this.onChangeState.bind(this)
        this.columns = [
            {
                title:'分组标题',
                dataIndex:'groupName',
                key:'groupName'
            },
            {
                title:'分组描述',
                dataIndex:'groupDescription',
                key:'groupDescription',
                width:'200px'
            },
            {
                title:'创建者',
                dataIndex:'groupLeader.name',
                key:'groupLeader._id'
            },
            {
                title:'标签',
                dataIndex:'groupTag',
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
                title:'创建时间',
                dataIndex:'meta.createAt',
                key:'meta.createAt'
            },
            {
                title:'是否审核',
                dataIndex:'state',
                render: (text, record) => (
                    <span>
                        <Switch defaultChecked={text} onChange={(text)=>this.onChangeState(text,record._id)} />
                    </span>
                ),
            },
            {
                title:'封面图片',
                dataIndex:'groupImg',
                width:'150px',
                render:(text,record)=>{
                    if(text){
                        return(
                            <img src={'http://localhost:3000' + text} width="100%"/>
                        )
                    }
                    else{
                        return(
                            <img src={mrimg} width="100%"/>
                        )
                    }
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <span>
                        <Button type="primary" disabled={true} ><Link to={'/pushdetail/'+record._id}><Icon type="plus-square-o" />查看详情</Link></Button>
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
        ]
    }

    getdata(){
        axios.get(this.state.HOST + '/getGroupList')
        .then(res=>{
            console.log(res)
            if(res.data.code === 200){
                this.setState({
                    grouplist: res.data.data,
                    loading : false
                })
            }
        })
        .catch(e=>{
            console.log(e)
        })
    }

    onChangeState(checked,id){
        // console.log(`switch to ${checked}`);
        // console.log(id)
        axios.post(this.state.HOST + '/changeGroupState',{
            _id:id,
            state:checked
        })
        .then(res=>{
            // console.log(res)
            if(res.data.code === 200 ){
                ChangeSuccessNotification()
            }
        })
        .catch(e=>{
            console.log(e)
            ChangeFailNotification()
        })
    }

    //点击确认则删除对应的push 根据pushid提交给后台去删除
    confirm(e) {
        console.log(e);
        // message.success('Click on Yes');
        axios.post(this.state.HOST + '/delGroup',{
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

    componentWillMount(){
        this.getdata()
    }

    render(){
        return(
            <Table columns={this.columns} dataSource={this.state.grouplist} loading={this.state.loading} rowKey="_id" />
        )
    }
}

export default GroupList