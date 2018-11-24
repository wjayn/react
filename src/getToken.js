/**
 * Created by Administrator on 2018/11/20.
 */
import configuredAxios from './ConfiguredAxios'

//获取Token
function token(menu) {
    if (!localStorage.getItem('openid')) {
        // 线下 todo 配置PHP菜单
        // window.location.href = `http://wechat.sxeccellentdriving.com/php-api/wechat_front/ccb/ccb-php/index.php?type=callback&menu=${menu}`;
        // 线上
        window.location.href = `https://mobile.sxwinstar.net/wechat/index.php?type=callback&menu=${menu}`;
        return Promise.reject('openId获取失败')
    }

    if (!localStorage.getItem('headimgurl')) {
        localStorage.setItem('headimgurl', '优驾行无头像')
    }
    if (!localStorage.getItem('nickname')) {
        localStorage.setItem('nickname', '优驾行无名氏')
    }

    let jsonData = {
        "openid": localStorage.getItem('openid'),
        "headImgUrl": localStorage.getItem('headimgurl'),
        "nickName": localStorage.getItem('nickname')
    };
    return configuredAxios.doPost('/ccb-api/api/v1/cbc/account/getToken', jsonData).then((res) => {
        localStorage.setItem('ccbToken', res.tokenId);
        return res.data;
    })
}

function autoGetToken(menu) {
    let tokenId = localStorage.getItem('ccbToken');
    if (!tokenId) {
        return token(menu);
    }
    return Promise.resolve(tokenId);
}

function relogin() {
    localStorage.removeItem('ccbToken');
    localStorage.removeItem('openid');
    let locationHash = window.location.hash;
    if (locationHash && (locationHash.indexOf('receive') >= 0)) {
        window.location.href = './#/receive'
    } else {
        window.location.href = './#/homePage'
    }
}


export default {
    token,
    autoGetToken,
    relogin
}