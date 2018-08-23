import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './photo.css';
import axios from 'axios'
import Link from 'react-router-dom/Link';

import { Row, Col,Form, Icon, Input, Button,notification,Divider,Table ,Select,Tag,Modal ,Card,Upload, message  } from 'antd';
// import {  } from 'antd';
import {openNotification,DelopenNotification} from '../Common/popupMessage'

// 开发环境和生产环境结构切换
import host from '../Common/global'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { Meta } = Card;







class UpLoadPhoto extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            uploadSet:{
                // 上传图片控件的属性
                name: 'file',
                action: host+'/uploadPhoto',
                headers: {
                    authorization: 'authorization-text',
                },
                // multiple:true,
                data:{_id:this.props.photoGroupId},
                showUploadList:{ showPreviewIcon: false, showRemoveIcon: false },
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} 上传成功`);
                        props.onUpdata()
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} 上传失败`);
                    }
                }
            }
        }
    }

    

    render(){
        return(
            <div>
                <Upload {...this.state.uploadSet}>
                    <Button>
                    <Icon type="upload" /> 点击上传图片
                    </Button>                    
                </Upload>
            </div>
        )
    }

}


class ImgList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let list = <div>
                        <Row gutter={16}>
                            {this.props.imgList.map((key)=>{
                            return  <Col span={3} key={key._id}>
                                        <div className="photoView">
                                        <img src={host+key.path} width="100%"/>
                                        </div>
                                    </Col>
                            })}
                        </Row>
                    </div>
        return(
            <div>
                {list}
            </div>
        )
    }
}



class PhotoGroupDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            _id:'',
            imgList:[]
        }
    }

    getPhotoList(){
        // let id = this.props.params.id
        // console.log(id)
        let id = this.props.match.params.id
        this.setState({
            _id:id
        })
        console.log(id)
        axios.post(host+'/getPhotoList',{_id:id})
        .then(res=>{
            console.log(res)
            this.setState({
                imgList:res.data.res[0].imageList
            })
            // console.log(this.state)
        })
        .catch(e=>{

        })
    }
    componentWillMount(){
        this.getPhotoList()
    }
    render(){
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <UpLoadPhoto photoGroupId={this.state._id} onUpdata={this.getPhotoList.bind(this)}/>
                    </Col>
                    {/* <Col span={12}>col-12</Col> */}
                </Row>
                <Divider orientation="left">照片列表</Divider>
                <Row>
                    <Col span={24}>
                        {/* <GroupList groupList={this.state.groupList} /> */}
                        <ImgList imgList={this.state.imgList}/>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PhotoGroupDetail