import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Room extends Component{
    constructor(){
        super();
        this.state = {
            roomList: [1,2,3,4,5,6]
        }
        window.localStorage.removeItem('socketId');
    }
    render(){
        return <div className="full-height">
            {
                this.state.roomList.map((item, i) => {
                    return  <Link to="/room/playroom" key={i}><div className='roomItem' key={i}></div></Link>
                })
            }
        </div>
    }
}