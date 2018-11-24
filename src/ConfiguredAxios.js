import axios from 'axios'
import qs from 'qs';
import {Toast} from 'antd-mobile';
import getToken from './getToken';

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
    responseProcess = (response)=>{
        console.log(response);
        if (response.status === 200){
            return this.processOnYjxRule(response);
        }else {
            return Promise.reject({code: response.data.code, message: response.data.message})
        }
    }

    getBaseUrl(){
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === "qa"){
            return "http://wechat.sxeccellentdriving.com";//测试包地址
        }else if(process.env.NODE_ENV === 'production'){
            return "https://mobile.sxwinstar.net";//线上包地址
        }else if(process.env.NODE_ENV === 'development'){
            return "";//开发地址
        }
        throw new Error(
            '未知环境错误'
        );
    }

    doGet(url,params, config={}){
        return this.axiosInstance.get(url, {...this.defaultGetConfig, ...config, params: params}).then(this.responseProcess).catch(this.defaultErrorProcess);

    }
    //获取图片
    doGetImage(url){
        return this.axiosInstance.get(url,{...this.defaultGetImgConfig}).then(this.responseProcess).catch(this.defaultErrorProcess);
    }

    doPost(path,params,isFromData, extraConfig={}){
        let config;
        let extraHeaders = this.remove(extraConfig, 'headers');
        if (isFromData){
            config = {...this.defaultPostConfig,headers:{'Content-Type':'application/x-www-form-urlencoded', ...extraHeaders}}
        }else{
            config = {...this.defaultPostConfig,headers:{'Content-Type':'application/json', ...extraHeaders}}
        }

        return this.axiosInstance.post(path,params,{...config, ...extraConfig}).then(this.responseProcess).catch(this.defaultErrorProcess);
    }

    remove(obj, key){
        let value = obj[key];
        if (value){
            delete obj[key];
        }
        return value
    }
    defaultErrorProcess = (error)=>{
        console.log(error);
        if(error.response){
            if(error.response.status === 401){
                getToken.relogin();
                throw new Error('登陆过期')
            }else if(error.response.status === 400){
                let error_code = error.response.data.code;
                let error_message = errorMessage[error_code] || '网络请求失败， 请稍后再试';
                error = {code: error_code, message: error_message}
            }
        }

        let message = error.message;
        if(message === 'Network Error'){
            message = '网络错误';
        }
        Toast.hide();
        Toast.fail(message, 2);
        return Promise.reject(error)
    }

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.getBaseUrl(),
            timeout: 50000,
        });
        this.axiosInstance.interceptors.request.use((request) => {
            if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                request.data = qs.stringify(request.data);
            }
            if(request.data && request.headers['Content-Type'] === 'application/json'){
                request.data = JSON.stringify(request.data);
            }
            return request;
        });
    }

    processOnYjxRule(response){
        if(!response.data.code){
            return response.data;
        }
        if(!response.data){
            return response;
        }
        if (response.data.code === 'success'){
            return response.data.data;
        }else {
            throw new Error(response.data.message || response.message);
        }
    }
}

const errorMessage = {
    'paramNotAllowNull.NotRule': '参数错误',
    'verifyCodeIsError.NotRule': '验证码错误',
    'frequency.message.NotRule': '当前手机号短信验证次数过多，请稍后再试',
    'noRedPackageLeft.ordersRedPackageInfo.NotRule': '红包已被领完',
    'mobileHasBeenBind': '手机号已被绑定',
    'code.is.error.NotRule':'验证码错误',
    'phone.had.bind.NotRule':'手机号已被绑定',
    'param.is.null.NotRule ':'手机号码不能为空',
};

export default new ConfiguredAxios()