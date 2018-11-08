import axios from 'axios'
import qs from 'qs';
import {Toast} from 'antd-mobile';

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
            timeout: 5000,
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

    getBaseUrl(){
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

    doGet(url,params){
        if (params){
            return this.axiosInstance.get(url,{...this.defaultGetConfig,params:params}).then(this.responseProcess).catch(this.defaultErrorProcess);
        }else {
            return this.axiosInstance.get(url,{...this.defaultGetConfig}).then(this.responseProcess).catch(this.defaultErrorProcess);;
        }
    }
    //获取图片
    doGetImage(url){
        return this.axiosInstance.get(url,{...this.defaultGetImgConfig}).then(this.responseProcess).catch(this.defaultErrorProcess);;
    }

    doPost(path,params,isFromData){
        let  config;
        if (isFromData){
            config = {...this.defaultPostConfig,headers:{'Content-Type':'application/x-www-form-urlencoded'}}
        }else{
            config = {...this.defaultPostConfig,headers:{'Content-Type':'application/json'}}
        }
        return this.axiosInstance.post(path,params,config).then(this.responseProcess).catch(this.defaultErrorProcess);
    }

    responseProcess = (response)=>{
        if (response.status === 200){
            return this.processOnYjxRule(response);
        }else {
            throw new Error('网络错误：'+response.status)
        }
    }
    processOnYjxRule(response){
        if(!response.data.code){
            return response.data;
        }
        if (response.data.code === 'success'){
            return response.data.data;
        }else {
            throw new Error(response.message);
        }
    }

    defaultErrorProcess = (error)=>{
        let  message = error.message;
        if(message === 'Network Error'){
            message = '网络错误';
        }
        Toast.fail(message, 2);
        throw error;
    }
}

export default new ConfiguredAxios()