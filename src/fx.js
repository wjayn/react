/**
 * Created by Administrator on 2018/9/11.
 */
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import configuredAxios from './ConfiguredAxios'
import '../../assets/image/shareIcon.png'

const BASE_URL = 'http://wechat.sxeccellentdriving.com';
const ONLINE_URL = 'https://mobile.sxwinstar.net';
let link = '';
// let betterCarLife = '/winstar-api/api/v1/wechatCommon/betterCarLife/noauth/getWechatShareData?url='
let youjiaxing = '/wechat_access/api/v1/wechatCommon/noauth/getWechatShareData?url='

const fxTitle = '优驾行“出行无忧，邀您相伴”'
const fxImgUrl = `${BASE_URL}/ccb/fission/static/images/shareIcon.png`//线上图片地址:'https://mobile.sxwinstar.net/ccb/fission/static/images/shareIcon.png'
const fxDesc = '送你一张最高30元加油优惠券，愿我们的友情稳步上涨！'
const fxTimeLineTitle = '优驾行“出行无忧，邀您相伴”送加油优惠券！'


function toShareBack() {
    //loading  show
    Toast.loading('Loading...', 3, () => {
        console.log('Load complete !!!');
    });
    indexApi.validateInvite()


        .then((bindPhoneData) => {
            Toast.hide();
            alert(bindPhoneData.ac_state)
            if (bindPhoneData.ac_state === '0') {
                alert('in 0')
                let inviteUserId = localStorage.getItem('token_id')
                let inviteName = localStorage.getItem('nickname')
                link = `${BASE_URL}/ccb/fission/?inviteUserId=${inviteUserId}&inviteName=${inviteName}#/pages/invitee/inviteeIndex/inviteeIndex`
                link = encodeURI(link)
            } else if (bindPhoneData.ac_state === '1') {
                alert('in 1')
                link = `${BASE_URL}/ccb/fission/#/pages/index/ineligible/ineligible`
            } else {
                alert('in 2')
            }
            configShare()
        })
}

function configShare() {
    let url = window.location.href.split('#')[0]
    return configuredAxios.doGet({
        'url': `${BASE_URL}${youjiaxing}${url}`,
        'method': 'POST'
    }).then((data) => {
            window.wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.data.wxData.appid,
                timestamp: data.data.wxData.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.wxData.nonceStr, // 必填，生成签名的随机串
                signature: data.data.wxData.signature,// 必填，签名
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
            })

            window.wx.ready(function () {
                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断

                window.wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType',
                        'onMenuShareAppMessage',
                        'previewImage',
                        'onMenuShareTimeline',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'updateAppMessageShareData',
                        'updateTimelineShareData'
                    ],
                    success: function () {
                        //alert(JSON.stringify(res));
                    }
                })


                window.wx.onMenuShareTimeline({
                    title: fxTimeLineTitle,
                    link: link,
                    imgUrl: fxImgUrl,
                    trigger: function () {
                        //alert('用户点击分享到朋友圈');
                    },
                    success: function () {
                        //alert('分享成功！');
                        // toShareBack()
                    },
                    cancel: function () {
                        //alert('已取消');
                    },
                    fail: function () {
                        //alert(JSON.stringify(res));
                    }
                })


                // 2. 分享接口
                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口

                window.wx.onMenuShareAppMessage({
                    title: fxTitle,
                    desc: fxDesc,
                    link: link,
                    imgUrl: fxImgUrl,

                    trigger: function () {
                        //alert('用户点击发送给朋友');
                    },
                    success: function () {
                        //alert('分享成功！')
                        // toShareBack()
                    },
                    cancel: function () {
                        //alert('已取消')
                    },
                    fail: function () {
                        //alert('shibai')
                    }
                })
                // alert('已注册获取“发送给朋友”状态事件');

                // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口


                // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

                window.wx.onMenuShareQQ({
                    title: fxTitle,
                    desc: fxDesc,
                    link: link,
                    imgUrl: fxImgUrl,
                    trigger: function () {
                        //alert('用户点击分享到QQ');
                    },
                    complete: function () {
                        //alert(JSON.stringify(res));
                    },
                    success: function () {
                        //alert('分享成功！')

                    },
                    cancel: function () {
                        //alert('已取消');
                    },
                    fail: function () {
                        //alert(JSON.stringify(res));
                    }
                })


                // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
                window.wx.onMenuShareWeibo({
                    title: fxTitle,
                    desc: fxDesc,
                    link: link,
                    imgUrl: fxImgUrl,
                    trigger: function () {
                        //alert('用户点击分享到微博')
                    },
                    complete: function (res) {
                        //alert(JSON.stringify(res))
                    },
                    success: function () {
                        //alert('已分享')

                    },
                    cancel: function () {
                        //alert('已取消')
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res))
                    }
                })


                window.wx.updateAppMessageShareData({

                    title: fxTitle, // 分享标题
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: fxImgUrl, // 分享图标
                    desc: fxDesc,
                    function(res){
                        alert(res)
                    }

                })


                window.wx.updateTimelineShareData({

                    title: fxTimeLineTitle, // 分享标题
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: fxImgUrl, // 分享图标

                    function(res){
                        alert(res)
                    }

                })
            })


            window.wx.error(function () {
            })


        }
    )
}

export default {
    toShareBack: toShareBack
}
