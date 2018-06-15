import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


export default class Selector extends React.Component{

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    
    render(){
        return(
            <div>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                    {
                        this.props.taglist.map(function(item, index) {
                            return <Option value={item._id} key={index}>{item._id}</Option>;
                        })
                    }
                </Select>                
            </div>
        )
    }
}