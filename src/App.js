import React, { Component } from 'react';
import { Layout } from 'antd';
import TopHeader from '@/components/header'
import LeftSider from '@/components/leftSider'
import CenterContent from '@/components/content'
import '@/css/index.scss';
export default class App extends Component{
    constructor(){
        super();
        this.state = {
            toggleState: false
        }
    }
    changeSider = (bol) => {
        this.setState({toggleState: bol})
    }
    render(){
        return <Layout>
            <TopHeader toggleSider={this.changeSider.bind(this)} toggleState={this.state.toggleState}></TopHeader>
            <Layout>
                <LeftSider toggleState={this.state.toggleState}></LeftSider>
                <CenterContent></CenterContent>
            </Layout>
        </Layout>
    }
}
