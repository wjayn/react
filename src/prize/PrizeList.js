import React, {Component} from 'react'
import './PrizeList.css'
import ConfiguredAxios from '../ConfiguredAxios'

class PrizeList extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
        ConfiguredAxios.doGet("",{});
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        return (
            <div>
                <h1>PrizeList</h1>
            </div>
        )
    }
}

export default PrizeList;
