export const verifyImgUrl = getSmsUrl()+`/api/v3/smsSend/getRandomCode`; // 获取图片验证码
export const verifyImgCodeUrl = getSmsUrl()+`/api/v3/smsSend/checkImgCode?validateCode=`;  //验证图片验证码
export const verifyUrl = getSmsUrl()+`/api/v3/smsSend`; // 发送短信验证码
export const prizeListUrl = `/wechat_access/api/v1/activity/noauth/doubleElvenSharing/getRewardList`; // 获取奖品列表
export const activeStatusUrl = `/wechat_access/api/v1/activity/noauth/doubleElvenSharing/getActiveStatus`; // 获取奖品列表
export const receiveInvite = `/wechat_access/api/v1/activity/noauth/doubleElvenSharing/receiveInvite`; // 获取奖品列表


function getSmsUrl(){
    if (process.env.NODE_ENV === "qa"){
        return "/online";//测试包地址
    }else if(process.env.NODE_ENV === 'production'){
        return "";//线上包地址
    }else if(process.env.NODE_ENV === 'development'){
        return "/online";//开发地址
    }
    throw new Error(
        '未知环境错误'
    );
}