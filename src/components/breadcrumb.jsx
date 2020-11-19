import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import {Link, withRouter} from 'react-router-dom'

export default withRouter( class BreadCrumb extends Component{
    constructor(props){
        super(props);
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        this.state = {
            pathSnippets: pathSnippets,
            pathNames: {
                room: 'Room',
                playroom: 'PlayRoom'
            }
        }
    }
    
    render(){
        return <Breadcrumb style={this.props.inlineStyle}>
                {
                    this.state.pathSnippets.map((item, i) => {
                        return i!==(this.state.pathSnippets.length-1)? <Breadcrumb.Item key={i}><Link to={'/' + item}>{this.state.pathNames[item]}</Link></Breadcrumb.Item>:<Breadcrumb.Item key={i}>{this.state.pathNames[item]}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
    }
})