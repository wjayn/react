import React, {Component} from 'react'
import './Lottery.css'
import Gua from '../assets/js/guajiang'
import LotteryImg from '../assets/do_lottery.png'

class Lottery extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
        <div class="lottery_container">
            <img className='le' src={LotteryImg} onClick={this.onLotteryClick}/>
        </div>

        )
    }

    onLotteryClick = ()=>{
        this.props.onLotteryClick();
    }

}

export default Lottery;
