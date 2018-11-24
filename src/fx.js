/**
 * Created by Administrator on 2018/9/11.
 */
import configuredAxios from './ConfiguredAxios'

//let betterCarLife = '/winstar-api/api/v1/wechatCommon/betterCarLife/noauth/getWechatShareData?url='
 let betterCarLife = '/wechat_access/api/v1/wechatCommon/noauth/getWechatShareData?url='

 let baseUrl = 'https://mobile.sxwinstar.net/finance/winstar-h5-finance/templet/sbd/';
//let baseUrl = 'http://wechat.sxeccellentdriving.com/finance/sbd/';

const fxObj = {
    fxTitle: '优驾行品牌日，每周六9折购油！！！',
    fxLink: `${baseUrl}#/receive/`,
    fxImgUrl: `${baseUrl}shareIco.png`,
    fxDesc: '年底钱包回血指南，优驾行一招让您无惧油价上涨~',
    fxTimeLineTitle: '恭喜您获得5元优惠券！优驾行品牌日，每周六9折购油！！！'
}

function judgeShareCondition(shareType) {
    if (localStorage.getItem('orderId')) {
        configShare1(shareType);
    }else{
        configShare1(shareType);
    }
}

function configShare1(shareType) {

    console.log('进入分享');
    let url = window.location.href.split('#')[0];
    return configuredAxios.doPost(`${betterCarLife}${url}`).then((data) => {
        console.log(data);
        window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.wxData.appid,
            timestamp: data.wxData.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.wxData.nonceStr, // 必填，生成签名的随机串
            signature: data.wxData.signature,// 必填，签名
            jsApiList: ['checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        let shareLink = '';
        if(shareType === 'receive'){
            let isApp = window.localStorage.getItem('isApp');
            if(isApp === '0'){
                shareLink = `${fxObj.fxLink}${window.localStorage.getItem('orderId')}?isApp=${isApp}`;
            }else{
                shareLink = `${fxObj.fxLink}${window.localStorage.getItem('orderId')}`;
            }
            fxObj.fxTitle = '恭喜您获得5元优惠券！优驾行品牌日，每周六9折购油！！！';
        }else{
            shareLink = 'https://mobile.sxwinstar.net/finance/winstar-h5-finance/templet/sbd/#/homePage';
            fxObj.fxTitle = '优驾行品牌日，每周六9折购油！！！';
        }
        window.wx.ready(function () {
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            window.wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage'
                ],
                success: function (res) {
                },
                fail: function (res) {
                }
            });


            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口


            window.wx.onMenuShareAppMessage({
                title: fxObj.fxTitle,
                desc: fxObj.fxDesc,
                link: shareLink,
                imgUrl: fxObj.fxImgUrl,
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            // alert('已注册获取“发送给朋友”状态事件');

            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

            window.wx.onMenuShareTimeline({
                title: fxObj.fxTitle,
                link: shareLink,
                imgUrl: fxObj.fxImgUrl,
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });


            // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

            window.wx.onMenuShareQQ({
                title: fxObj.fxTitle,
                desc: fxObj.fxDesc,
                link: shareLink,
                imgUrl: fxObj.fxImgUrl,
                trigger: function (res) {
                },
                complete: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });


            // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
            window.wx.onMenuShareWeibo({
                title: fxObj.fxTitle,
                desc: fxObj.fxDesc,
                link: shareLink,
                imgUrl: fxObj.fxImgUrl,
                trigger: function (res) {
                    alert('用户点击分享到微博');
                },
                complete: function (res) {
                    alert(JSON.stringify(res));
                },
                success: function (res) {
                    alert('已分享');

                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        });
        window.wx.error(function (res) {
            alert(res)
        });


    })
        .catch(res => {
            console.log(res);
        });
}

export default {
    judgeShareCondition: judgeShareCondition
}


