import React, {Component} from 'react'
import Lottery from './Lottery'
import './Index.css'
import titleText from '../assets/title_text.png'
import viewList from '../assets/view_list.png'
import jingli from '../assets/jingli.png'
import Button from 'antd-mobile'
import {
    Link
} from 'react-router-dom'

class InviterIndex extends Component {


    constructor(props) {
        super(props)
        this.state = {

        }
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
            <div class="inviter_index_container" >
                <img class="title_text_img" src={titleText} />
                <Lottery className='inviter_index_lottery'/>
                <li><Link to="/prize/prizeList"><img class="view_list_img" src={viewList} /></Link></li>
                <img class="jingli_img" src={jingli}/>
                <h1></h1>
                <h1></h1>
                <h1></h1>

            </div>
        )
    }

}

export default InviterIndex;
