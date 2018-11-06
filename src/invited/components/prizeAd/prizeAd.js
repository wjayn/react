import React, {Component} from 'react';
import './prizeAd.less';

class prizeAd extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const imgBoxDom = this.props.imgs.map((item, index) => {
            return (
                <img src={item} alt='图片' key={index}/>
            );
        })
        return (
            <div className='ad-box'>
                <div className='gray-box'></div>
                <h5 className='caption'>
                    <p>
                        <span className='border-1px-h'></span>{this.props.title}<span className='border-1px-h'></span>
                    </p>
                </h5>
                {imgBoxDom}
            </div>
        )
    }
}

export default prizeAd;