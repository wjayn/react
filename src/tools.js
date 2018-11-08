class Tools{

    static getUrlParam(paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");

        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    }



    static typeset(str)//文字排版正则替换
    {
        //修正不规则标点
        str=str.replace(/,/gi,"，");
        str=str.replace(/\.\r/gi,"。\r");
        str=str.replace(/．/gi,"。");
        str=str.replace(/;/gi,"；");
        str=str.replace(/\"/gi,"＂");
        str=str.replace(/\'/gi,"｀");
        str=str.replace(/!/gi,"！");
        str=str.replace(/\(/gi,"（");
        str=str.replace(/\)/gi,"）");
        str=str.replace(/【/gi,"「");
        str=str.replace(/『/gi,"「");
        str=str.replace(/】/gi,"」");
        str=str.replace(/』/gi,"」");
        //修正不规则换行，其中 。？！…」”）\n\r 为有效换行标志符．（注意：此代码将破坏所有无效标点换行）
        str=str.replace(/([^。？！…」”）\n\r])[\n\r]{2}/gi,"$1");
        //修正不规则段落
        str="\n"+str;
        str=str.replace(/[\n|\r]+[ |　|\t]*/gi,"\n\n　　");
        str=str.replace("\n\n","");

        return str;
    }


    static doAppShare(url){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            var xo = {
                'title': '来和我一起领取200元加油大礼包！',
                'dsc': '注册优驾行APP，免费领取价值200元大礼包一份！油卡、电话卡应有尽有，更有100%中奖的抽奖，最高可抽全年免费加油！',
                'url': url
            };
            window.webkit.messageHandlers.iOSShare.postMessage(JSON.stringify(xo));
        } else if (isAndroid) {
            window.androidBaseInterface.doShare(
                '来和我一起领取200元加油大礼包！',
                '注册优驾行APP，免费领取价值200元大礼包一份！油卡、电话卡应有尽有，更有100%中奖的抽奖，最高可抽全年免费加油！',
                url)
        }
    }
}

export default Tools;
