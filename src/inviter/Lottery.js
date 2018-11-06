import React, {Component} from 'react'
import './Lottery.css'
import Gua from '../assets/js/guajiang'
import Le from '../assets/do_lottery.png'

class Lottery extends Component {

    constructor(props) {
        super(props)
        this.state = {showClickLe:true}
    }

    componentWillMount() {
    }

    componentDidMount() {

        let gua = new Gua();
        gua.addOnGuaCompleteListener(this.onGuaComplete)
        gua.run();
    }

    componentWillUnmount() {
    }


    onGuaComplete = ()=>{

    }

    render() {
        return (

        <div class="container">
            <img className='le' src={Le} onClick={this.onLeClick}/>
        </div>

        )
    }

    onLotteryClick = ()=>{
    }

    onLeClick = ()=>{
        this.setState({showClickLe:false});
    }
}

export default Lottery;
