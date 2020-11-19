import React, { Component } from 'react';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons'

const { Header } = Layout;

export default class TopHeader extends Component{
    toggle = () => {
        return () => {
            this.props.toggleSider(!this.props.toggleState);
        }
    }
    render(){
        return <Header className="top-header">
            <span>header</span>
            {React.createElement(this.props.toggleState ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle(),
            })}
        </Header>
    }
}