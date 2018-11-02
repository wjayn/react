import React, {Component} from 'react'
import './Lottery.css'
import doLottery from '../assets/do_lottery.png'

class Lottery extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        return (
            <div className={this.props.className} onClick={this.onLotteryClick}>
                <img className='lottery_img' src={doLottery}/>
            </div>
        )
    }

    onLotteryClick = ()=>{
    }
}

export default Lottery;
