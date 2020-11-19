import React, { Component } from 'react';

export default class OtherPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    setDivToBox = () => {
        let _divBox = [];
        for(let i=0; i<this.props.otherCardsNumber; i++){
            let _div = <div key={i} className='other-card' style={{top: (20*i)+'px'}}></div>
            _divBox.push(_div)
        }
        return _divBox;
    }

    render(){
        return <div className={this.props.position === 'left'? 'other-People-left' : 'other-People-right'}>
            {
               this.setDivToBox()
            }
        </div>
    }

}