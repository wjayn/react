/**
 * Created by Administrator on 2018/11/20.
 */
import configuredAxios from './ConfiguredAxios'

//获取Token
function token() {
    if (!localStorage.getItem('openid')) {
        // const openid = '123123213';
        // 线下
        window.location.href = `http://wechat.sxeccellentdriving.com?type=callback&menu=weekendBrand`;
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
        'openid': localStorage.getItem('openid'),
        'headImgUrl': localStorage.getItem('headimgurl'),
        'nickName': localStorage.getItem('nickname')
    };
    return configuredAxios.doPost('/ccb-api/api/v1/cbc/account/getToken', JSON.stringify(jsonData)).then((res) => {
        console.log(res.data);
        if (res.statusCode === 200) {
            return res.data;
        } else {
            alert(res)
        }
    }).catch((error) => {
        console.log(error)
    })
}


export default {
    token: token
}