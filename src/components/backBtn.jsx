import React, { Component } from 'react';
import { Button } from 'antd';
import {
    ArrowLeftOutlined,
} from '@ant-design/icons'

export default class BackBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        return <Button size="small" type="primary" style={this.props.inlineStyle} onClick={this.props.callback} icon={<ArrowLeftOutlined />}>back</Button>
    }
}