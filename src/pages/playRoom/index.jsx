import React, { Component } from 'react';
import PageTop from '@/components/pageTop';
import BreadCrumb from '@/components/breadcrumb';
import BackBtn from '@/components/backBtn';
import { createBrowserHistory } from 'history';
import { Button, message } from 'antd';
import CardBox from '@/pages/playRoom/components/cardBox'
import OtherPeople from '@/pages/playRoom/components/otherPeople'
import PokerArithmetic from '@/utils/pkArithmetic';
import PokerSokect from '@/utils/wsconnection'

const history = createBrowserHistory();

export default class PlayRoom extends Component{
    constructor(){
        super();
        this.state = {
            allCard: this.setcards(),
            peopleA: [],
            peopleB: [],
            peopleC: [],
            outCards: [],
            selectCardResult: {},
            aCardsNumber: 0,
            bCardsNumber: 0,
            socketId: '',
            canPlay: false,
            isCurrentPlayer: false,
            isWinnerText: '',
            cannotPass: false
        }
    }
    componentDidMount(){
        this.startWS();
    }
    componentWillUnmount(){
        PokerSokect.emitUserLeave(this.state.socketId);
    }
    startWS = () => {
        let socketId = window.localStorage.getItem('socketId');
        PokerSokect.emitUserConnect(socketId);
        PokerSokect.onSendSoketId((data) => {
            window.localStorage.setItem('socketId', data);
            this.setState({socketId: data});
        });
        PokerSokect.onCanPlay(data => {
            this.setState({canPlay: true})
        })
        PokerSokect.onCurrentPlayer(data => {
            this.setState({isCurrentPlayer: true})
        })
        PokerSokect.onGetCards(data => {
            this.setState({peopleB: data, aCardsNumber: 16, bCardsNumber: 16});
        })
        PokerSokect.onReceiveMessage((result) => {
            this.setState({selectCardResult: result})
            if(result.cards.length){
                let myCards = JSON.parse(JSON.stringify(this.state.peopleB));
                let newCards = myCards.filter(item => !item.isSelect);
                this.setState(state => {
                    state.peopleB = newCards;
                    state.outCards = result.cards;
                    return {
                        peopleB: newCards,
                        outCards: result.cards
                    };
                })
            }
        });
        PokerSokect.onBpokerCardNumber(data => {
            this.setState({bCardsNumber: data});
        })
        PokerSokect.onApokerCardNumber(data => {
            this.setState({aCardsNumber: data});
        })
        PokerSokect.onCannotPass(data => {
            this.setState({cannotPass: true})
            this.setState({isCurrentPlayer: true})
            message.error('Than in small, please select right cards Or pass');
        })
        PokerSokect.onGotWinner(data => {
            this.setState({
                peopleA: [],
                peopleB: [],
                peopleC: [],
                outCards: [],
                selectCardResult: {},
                aCardsNumber: 0,
                bCardsNumber: 0,
                isCurrentPlayer: false,
            })
            if(this.state.socketId  === data){
                this.setState({
                    socketId: '',
                    isWinnerText: 'You win',
                    canPlay: true,
                })
            }else{
                this.setState({
                    socketId: '',
                    isWinnerText: 'You lose',
                })
            }
        })
    }
    divergencyCards = () => {
        // let peopleA = [], peopleB = [], peopleC = [];
        // let arr = Utils.shuffle(this.state.allCard);
        // arr.forEach((item, i) => {
        //     if((i+1) % 3 == 0){
        //         peopleC.push(item)
        //     }else if((i+1) % 2 == 0){
        //         peopleB.push(item)
        //     }else{
        //         peopleA.push(item)
        //     }
        // })
        // // peopleA = this.sortCard(peopleA);
        // peopleB = this.sortCard(peopleB);
        // // peopleC = this.sortCard(peopleC);

        // this.setState({peopleA: peopleA,peopleB: peopleB,peopleC: peopleC, aCardsNumber: 16, bCardsNumber: 16});
        PokerSokect.emitStartPlay(null);
    }
    sortCard = (arr) => {
        var newArr = JSON.parse(JSON.stringify(arr));
        newArr.sort((a,b) => {return b.number -a.number});
        let tIndex = newArr.findIndex(item => item.number === 15)
        let aIndex = newArr.findIndex(item => item.number === 14)
        if(tIndex >= 0){
            let _arr = newArr.splice(tIndex)
            newArr = _arr.concat(newArr);
        }else if(aIndex >= 0){
            let _arr = newArr.splice(aIndex);
            newArr = _arr.concat(newArr);
        }
        return newArr;
    }
    setcards = () => {
        const cardArr = [];
        for(let j = 0; j < 4; j++){//Math.floor(Math.random()*4)
            for (let i = 3; i < 16; i++) {

                let obj = {
                    number: i,
                    color: j,
                    isSelect: false,
                    id: i + '-' + j
                }
                cardArr.push(obj);
            }
        }

        let newArr = cardArr.filter(item => {
            if(item.number === 14 && item.color < 3){
                return item
            }
            if(item.number === 15 && item.color < 1){
                return item
            }
            if(item.number < 14){
                return item
            }
            return item;
        })
        return newArr;
    }
    backBtnCallBack = () => {
        window.localStorage.removeItem('socketId');
        history.goBack()
    }
    outCard = () => {
        let myCards = JSON.parse(JSON.stringify(this.state.peopleB));
        let selectCards = myCards.filter(item => item.isSelect);
        if(!selectCards.length){
            return;
        }
        let result = PokerArithmetic.cardJudge(selectCards);
        PokerSokect.emitPokerMsg({
            pokerCount: this.state.peopleB.length,
            result: result,
            socketId: this.state.socketId
        })
        this.setState({isCurrentPlayer: false})
    }
    passCard = () => {
        PokerSokect.emitPassCard(this.state.socketId)
        this.setState({isCurrentPlayer: false})
    }
    selectCardCallBack = (cardItem, isselect) => {
        let myCards = JSON.parse(JSON.stringify(this.state.peopleB));
        myCards.forEach(item => {
            if(item.id === cardItem.id){
                item.isSelect = isselect;
            }
        })
        this.setState({peopleB: myCards})
    }
    render(){
        return <div className="full-height position-relative">
            <PageTop>
                <BreadCrumb inlineStyle={{lineHeight: '36px', marginLeft: '10px', float:'left'}} ></BreadCrumb>
                <BackBtn inlineStyle={{marginTop: '5px', marginRight: '10px', float:'right'}} callback={this.backBtnCallBack}></BackBtn>
            </PageTop>
            {
                this.state.canPlay? <Button onClick={this.divergencyCards}>deal cards</Button> : ''
            }
            
            <div className='play-room-box'>
                <div>{PokerArithmetic.jargon[this.state.selectCardResult.text]}</div>
                <OtherPeople position='left' otherCardsNumber={this.state.aCardsNumber}></OtherPeople>
                <OtherPeople position='right' otherCardsNumber={this.state.bCardsNumber}></OtherPeople>
                <CardBox cards={this.state.peopleB} selectCardCallBack={this.selectCardCallBack}></CardBox>
                
                {
                    this.state.isCurrentPlayer? <div className='play-btns-div'>
                        <Button onClick={this.passCard}>Pass</Button>
                        <Button onClick={this.outCard}>Out</Button>
                    </div>
                    : ''
                }
                <div className='last-word'>{this.state.isWinnerText}</div>
                <CardBox cards={this.state.outCards} positionClass='half-bottom' isOutCard={true}></CardBox>
            </div>
        </div>
    }
}