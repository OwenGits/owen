import React, { Component } from 'react';
import Card from '@/pages/playRoom/components/card';

export default class CardBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    getClassNames = () => {
        let classNames = [
            'play-room-box-bottom',
            'change-origin'
        ];
            classNames.push(this.props.positionClass)
        let _class = classNames.join(' ');
        return _class;
    }
    selectCardCallBack = (item, isselect) => {
        this.props.selectCardCallBack(item, isselect);
    }
    render(){
        return <div className={this.getClassNames()}>
            <div className={'play-room-box-center'}>
                {
                    this.props.cards.map((item, i) => {
                        return <Card key={item.id} cardItem={item} inlineStyle={{left: (i*30)+'px' }} keyi={i} isOutCard={this.props.isOutCard} selectCardCallBack={this.selectCardCallBack}></Card>
                    })
                }
            </div>
        </div>
    }
}