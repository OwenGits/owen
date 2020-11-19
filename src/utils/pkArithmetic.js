export default class PokerArithmetic {
    static compareSingle(oldP, newP) {
        let _oldNumber = oldP.number, _newNumber = newP.number;
        return (_newNumber - _oldNumber) > 0;
    }
    static twain(cards) {
        let arr = JSON.parse(JSON.stringify(cards))
        if (arr.length !== 2) {
            return false;
        }
        if (arr[0].number === arr[1].number) {
            return arr;
        }
        return false;
    }
    static compareTwain(arr1, arr2) {
        let isBig = PokerArithmetic.compareSingle(arr1[0], arr2[0]);
        return isBig;
    }
    static airplane(cards){
        let arr = JSON.parse(JSON.stringify(cards))
        arr.sort((a, b) => {return b.number - a.number})
        let _jl = [];
        arr.forEach(item => {
            let _idx = _jl.findIndex(jl => jl.number === item.number)
            if (_idx < 0) {
                _jl.push({
                    number: item.number,
                    time: 1
                })
            } else {
                _jl[_idx].time++;
            }
        });
        let _timeArr = _jl.filter(item => {
            return item.time === 3;
        })
        if(_timeArr.length < 2){
            return false;
        }
        if(_timeArr.length > 3){
            let conditionArr1 = _timeArr[0], conditionArr2 = _timeArr[_timeArr.length-1];
            if(conditionArr1.number - _timeArr[1].number !== 1){
                _timeArr.splice(0, 1);
            }
            if(_timeArr[_timeArr.length-2].number - conditionArr2.number !== 1){
                _timeArr.splice(_timeArr.length-1, 1);
            }
        }
        let result = PokerArithmetic.straightCard(_timeArr);
        if(!result){
            return false;
        }
        let newArr = [];
        let _numArr = _timeArr.map(el => {return el.number});
        let _ap = arr.filter(el => {return _numArr.indexOf(el.number) >= 0 });
        let _aps = arr.filter(el => {return _numArr.indexOf(el.number) < 0 });
        newArr = _ap.concat(_aps)
        return newArr;
    }
    static threeTakeTwo(cards) {
        let arr = JSON.parse(JSON.stringify(cards))
        if (arr.length !== 5) return false;
        let _jl = [];
        arr.forEach(item => {
            let _idx = _jl.findIndex(jl => jl.number === item.number)
            if (_idx < 0) {
                _jl.push({
                    number: item.number,
                    time: 1
                })
            } else {
                _jl[_idx].time++;
            }
        });
        let threeTime = _jl.find(item => item.time === 3)
        if (threeTime) {
            let _arr = arr.filter(item => item.number === threeTime.number);
            let _other = arr.filter(item => item.number !== threeTime.number);
            _other.sort((a, b) => b.number - a.number);
            return _arr.concat(_other);
        }
        return false;
    }
    static fourTakeThree(cards){
        let arr = JSON.parse(JSON.stringify(cards));
        if (arr.length !== 7) {
            return false;
        }
        let _jl = PokerArithmetic.getSameCrad(arr);
        let fourTime = _jl.find(item => item.time === 4);
        if(!fourTime){
            return false;
        }
        let _index = arr.findIndex(item => {return item.number === fourTime.number});
        let fourArr = arr.splice(_index, 4);
        return fourArr.concat(arr);
    }
    static getSameCrad(arr){
        let _jl = [];
        arr.forEach(item => {
            let _idx = _jl.findIndex(jl => jl.number === item.number)
            if (_idx < 0) {
                _jl.push({
                    number: item.number,
                    time: 1
                })
            } else {
                _jl[_idx].time++;
            }
        });
        return _jl;
    }
    static straight(cards) {
        let arr = JSON.parse(JSON.stringify(cards))
        if (arr.length < 5) { return false; }
        return PokerArithmetic.straightCard(arr);
    }
    static straightCard(arr) {
        let _orderArr = arr.sort((a, b) => { return b.number - a.number });
        let _isStraight = true;
        _orderArr.forEach((item, i) => {
            let nextNumber = item.number;
            let preNumber = _orderArr[i + 1] ? _orderArr[i + 1].number : -1;
            if (preNumber > -1 && (nextNumber - preNumber) !== 1) {
                _isStraight = false;
                return false;
            }
        })
        return _isStraight ? _orderArr : _isStraight;
    }
    static connectTwain(cards) {
        let arr = JSON.parse(JSON.stringify(cards))
        if(arr.length < 4){
            return false;
        }
        if ((arr.length % 2) !== 0) {
            return false;
        }
        let _orderArr = arr.sort((a, b) => { return b.number - a.number });
        let checkArr = _orderArr.filter((item, i) => { return i % 2 === 1 });
        let result = PokerArithmetic.straightCard(checkArr);
        if(result){
            return _orderArr;
        }else{
            return false;
        }
    }
    static boom(arr) {
        if (arr.length !== 4) {
            return false;
        }
        let count = 0;
        arr.forEach(item => {
            count += item.number;
        })
        if (count / 4 === arr[0].number) {
            return arr;
        }
        return false;
    }

    static cardJudge(arr) {
        if(arr.length === 1){
            PokerArithmetic.cardJudgeResult.cards = arr;
            PokerArithmetic.cardJudgeResult.text = 'SINGLE';
            return PokerArithmetic.cardJudgeResult;
        }
        arr.sort((a, b) => {return b.number - a.number})
        let _arr = JSON.parse(JSON.stringify(arr));

        let result = PokerArithmetic.twain(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'TWAIN';
            return PokerArithmetic.cardJudgeResult;
        }

        result = PokerArithmetic.connectTwain(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'CONNECTTWAIN';
            return PokerArithmetic.cardJudgeResult;
        }

        result = PokerArithmetic.boom(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'BOOM';
            return PokerArithmetic.cardJudgeResult;
        }

        result = PokerArithmetic.straight(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'STRAIGHT';
            return PokerArithmetic.cardJudgeResult;
        }

        result = PokerArithmetic.threeTakeTwo(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'THREETAKETWO';
            return PokerArithmetic.cardJudgeResult;
        }

        result = PokerArithmetic.airplane(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'AIRPLANE';
            return PokerArithmetic.cardJudgeResult;
        }
        
        result = PokerArithmetic.fourTakeThree(_arr);
        if (result) {
            PokerArithmetic.cardJudgeResult.cards = result;
            PokerArithmetic.cardJudgeResult.text = 'FOURTAKETHREE';
            return PokerArithmetic.cardJudgeResult;
        }

        PokerArithmetic.cardJudgeResult.cards = [];
        PokerArithmetic.cardJudgeResult.text = 'XXXX';
        return PokerArithmetic.cardJudgeResult;
    }

    static jargon = {
        'TWAIN': '一对',
        'CONNECTTWAIN': '连对',
        'BOOM': 'BOOM',
        'STRAIGHT': '顺子',
        'THREETAKETWO': '三带二',
        'AIRPLANE': '飞机',
        'FOURTAKETHREE': '四带三',
        'SINGLE': '单张'
    }

    static cardJudgeResult = {
        cards: [],
        text: 'XXXX',
    }
}

