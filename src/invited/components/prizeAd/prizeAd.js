import React, {Component} from 'react';
import ad1 from '../../../assets/ad1.png';
import ad2 from '../../../assets/ad2.png';
import ad3 from '../../../assets/ad3.png';
import ad4 from '../../../assets/ad4.png';
import './prizeAd.less';

// 区分图片
function divisionImg(types) {
    let src;
    switch (types) {
        case "99_999_BI":
            src = ad3;
            break;
        case '1_190':
            src = ad2;
            break;
        case '388_600':
            src = ad1;
            break;
        case '99_600':
            src = ad4;
            break;
        default:
            src = null;
    }
    return src;
}

class prizeAd extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let data = this.props.data;
        let imgDom = data.map((item, index) => {
            let src = divisionImg(item.rewardSerial);
            if(item.href){
                return <a href={item.href} className='box-shadow'><img src={src} alt='图片' key={index}/></a>;
            }else{
                return <img src={src} alt='图片' key={index}/>;
            }

        })

        return (
            <div className='ad-box'>
                <div className='gray-box'></div>
                <h5 className='caption'>
                    <p>
                        <span className='border-1px-h'></span>{this.props.title}<span className='border-1px-h'></span>
                    </p>
                </h5>
                {imgDom}
            </div>
        )
    }
}

export default prizeAd;