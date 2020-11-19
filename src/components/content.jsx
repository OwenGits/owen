import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import Home from '@/pages/home/index'
import Room from '@/pages/room/index'
import PlayRoom from '@/pages/playRoom/index'

const { Content } = Layout;

export default class CenterContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            contentHeight: 500
        }
    }
    componentDidMount(){
        const clientHeight = window.innerHeight;
        const newHeight = clientHeight - 64;
        this.setState({contentHeight: newHeight})
    }
    render(){
        return <Content style={{height: this.state.contentHeight}}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/room" component={Room}/>
            <Route exact path="/room/playroom" component={PlayRoom}/>
        </Content>
    }
}