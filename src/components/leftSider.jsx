import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Link, withRouter} from 'react-router-dom'

const { Sider } = Layout;
const { SubMenu } = Menu;

export default withRouter (class LeftSider extends Component{
    constructor(props){
        super(props);
        this.state = {
            defaultSelectedKeys: [this.props.location.pathname],
            defaultOpenKeys: ['sub1']
        }
    }
    render(){
        return <Sider collapsed={this.props.toggleState} className="border-right">
            <Menu
                mode="inline"
                defaultSelectedKeys={this.state.defaultSelectedKeys}
                defaultOpenKeys={this.state.defaultOpenKeys}
                theme="dark"
                style={{ height: '100%', borderRight: 0 }}
                >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                    <Menu.Item key="/"><Link to="/">123</Link></Menu.Item>
                    <Menu.Item key="/about"><Link to="/room">room</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                    
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                    
                </SubMenu>
            </Menu>
        </Sider>
    }
}) 