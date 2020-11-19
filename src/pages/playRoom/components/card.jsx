import React, { Component } from 'react';

export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            colors: [ '♠', '♥', '♣', '♦'],
            cards: ['0','0','0', '3','4','5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A','2'],
        }
    }
    componentDidUpdate(nextProps){
        
    }
    clickCard = () => {
        if(this.props.isOutCard){
            return;
        }
        if(this.props.cardItem.isSelect){
            this.props.selectCardCallBack(this.props.cardItem, false);
        }else{
            this.props.selectCardCallBack(this.props.cardItem, true);
        }
    }
    getClassName = () => {
        let classNames = [
            'poker-card'
        ];
        if(!this.props.isOutCard){
            classNames.push('p-k-hover');
        }
        if(this.props.cardItem.isSelect){
            classNames.push('select-bottom')
        }else{
            classNames.push('unselect-bottom')
        }
        let _class = classNames.join(' ');
        return _class;
    }
    render(){
        return <div className={this.getClassName()} style={this.props.inlineStyle} onClick={this.clickCard}>
                <p>{this.state.cards[this.props.cardItem.number]}</p>
                <p>{this.state.colors[this.props.cardItem.color]}</p>
                {/* <p>{this.props.cardItem.number}</p> */}
        </div>
    }
}