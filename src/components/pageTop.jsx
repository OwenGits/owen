import React, { Component } from 'react';
import '@/css/index.scss'
export default class PageTop extends Component{
    
    render(){
        return <div className='page-top-div'>
            {this.props.children}
        </div>
    }
}