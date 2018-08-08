import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'

import { Form, Input, Button,Row, Col,Icon,Checkbox,Card,List,Avatar,Collapse ,Tag } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;


export default class PushDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            detailData:[],
            userInfo:[],
            commentList:[],
            pushImageList:[]
        }
    }

    getPushDetail(){
        // let id = this.props.params.id
        // console.log(id)
        let id = this.props.match.params.id
        console.log(id)
        axios.post('http://localhost:3000/getPushDetail',{_id:id})
        .then(res=>{
            console.log(res)
            this.setState({
                detailData:res.data.data,
                userInfo:res.data.data.userID,
                commentList:res.data.data.comment,
                pushImageList:res.data.data.pushImageList
            })
            console.log(this.state)
            
        })
        .catch(e=>{

        })
    }
    
    componentWillMount(){   
        this.getPushDetail()
    }

    

    render(){   
        const text = (
            <p style={{ paddingLeft: 24 }}>
              A dog is a type of domesticated animal.
              Known for its loyalty and faithfulness,
              it can be found as a welcome guest in many households across the world.
            </p>
          );   

        const style = {
            position: 'absolute',
            right: '0'

        }

        let imgList =null;
        if(this.state.pushImageList){
            imgList = <List
                        grid={{ gutter: 24, column: 6 }}
                        dataSource={this.state.pushImageList}
                        renderItem={item => (
                        <List.Item>
                            <Card ><img src={'http://localhost:3000' + item} width="100%"/></Card>
                        </List.Item>
                        )}
                    />
        }
        else{
            imgList = null
        }
        return(
            <div>
                <Row gutter={24}>
                    <Col span={12}>
                        <Card title={"标题:"+this.state.detailData.pushTitle}  >
                            <p>推送内容：{this.state.detailData.pushContent}</p>
                            <p>推送时间：{this.state.detailData.pushdateAt}</p>
                            
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={"作者："+this.state.userInfo.name}  >
                            <p>用户ID:<strong>{this.state.userInfo._id}</strong></p>
                            <p>登录账号:<strong>{this.state.userInfo.username}</strong></p>
                        </Card>
                    </Col>                    
                </Row>
                <br/>                 
                <Row gutter={24}>
                    {imgList}
                </Row>
                
                <br/>
                <Row gutter={24}>
                    <Col span={24}>
                        <Card title="评论&回复">
                        <Collapse bordered={false} >
                            {
                                this.state.commentList.map((item,index)=>{
                                    return(
                                        <Panel 
                                            header={                                                
                                                <div>
                                                    <Avatar src={"http://localhost:3000" + item.from.userInfoPhoto} />&nbsp;&nbsp;{item.from.name}：&nbsp;&nbsp;{item.content}&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span style={style}><Tag color="#87d068">{item.meta.createAt}</Tag></span>
                                                </div>                                               
                                                
                                            } 
                                            key={index}
                                            disabled={item.reply.length>0?false:true}
                                        >
                                            {/* {item.content} */}
                                            <Row gutter={16}>
                                                <Col span={1} ></Col>
                                                <Col span={23} >
                                                    <List
                                                    itemLayout="horizontal"
                                                    dataSource={item.reply}
                                                    renderItem={i => (
                                                        <List.Item>
                                                            <List.Item.Meta
                                                            avatar={<Avatar src={"http://localhost:3000" + i.from.userInfoPhoto} />}
                                                            title={<p>{i.from.name} 回复 {i.to.name}</p>}
                                                            description={
                                                                <div>
                                                                    {i.content}
                                                                    <span style={style}><Tag color="#f50">{item.meta.createAt}</Tag></span>
                                                                </div>
                                                            }
                                                            />
                                                        </List.Item>
                                                        )}
                                                    />                         
                                                </Col>
                                            </Row>
                                            
                                        </Panel>
                                    )
                                })                              
                            }
                        </Collapse>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}