import axios from 'axios'


class ConfiguredAxios{

    defaultPostConfig = {
        method: 'post',
        responseType: 'json',
    }
    defaultGetConfig ={
        method: 'get',
        responseType: 'json',
    }
    defaultGetImgConfig ={
        method: 'get',
        responseType: "arraybuffer"
    }
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.getBaseUrl(),
            timeout: 5000
        });
    }

    getBaseUrl(){
        if (process.env.NODE_ENV === "qa"){
            return "http://wechat.sxeccellentdriving.com";//测试包地址
        }else if(process.env.NODE_ENV === 'production'){
            return "https://mobile.sxwinstar.net";//线上包地址
        }else if(process.env.NODE_ENV === 'development'){
            return "http://wechat.sxeccellentdriving.com";//开发地址
        }
        throw new Error(
            '未知环境错误'
        );
    }

    doGet(url,params){
        if (params){
            return this.axiosInstance.get(url,{...this.defaultGetConfig,params:params}).then(this.responseProcess);
        }else {
            return this.axiosInstance.get(url,{...this.defaultGetConfig}).then(this.responseProcess);
        }
    }
    //获取图片
    doGetImage(url){
        return this.axiosInstance.get(url,{...this.defaultGetImgConfig}).then(this.responseProcess);
    }

    doPost(url,params){
        return this.axiosInstance.post(url,{...this.defaultPostConfig,params:params}).then(this.responseProcess);
    }

    responseProcess = (response)=>{
        if (response.status == 200){
            return response.data;
        }
        throw new Error(response.status)
    }
}

export default new ConfiguredAxios()