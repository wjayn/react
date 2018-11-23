/**
 * Created by Administrator on 2018/11/20.
 */
import configuredAxios from './ConfiguredAxios'

//获取Token
function token() {
    if (!localStorage.getItem('openid')) {
        localStorage.setItem('openid', 'faaf020ac173474d98445f2c9ef23715');
        window.location.reload();
        // 线下
        // window.location.href = `http://wechat.sxeccellentdriving.com?type=callback&menu=weekendBrand`;
        // 线上
        // window.location.href = `https://mobile.sxwinstar.net?type=callback&menu=123`;
        return
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
        // localStorage.setItem('tokenId', res.tokenId);
        localStorage.setItem('tokenId', 'faaf020ac173474d98445f2c9ef23715');
        return res.data;
    }).catch((error) => {
        console.log(error)
    })
}


export default {
    token: token
}