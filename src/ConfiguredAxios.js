import axios from 'axios'


class ConfiguredAxios{

    axiosInstance;
    instace;

    defaultPostConfig = {
        method: 'post',
        responseType: 'json',
    }
    defaultGetConfig ={
        method: 'get',
        responseType: 'json',
    }
    constructor(name) {
        this.axiosInstance = axios.create({
            baseURL: this.getBaseUrl(),
            timeout: 5000
        });
        this.instace = null;
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

    static instance(){
        if(!this.instance) {
            this.instance = new ConfiguredAxios();
        }
        return this.instance;
    }

    doGet(url,params){
        return this.axiosInstance.get(url,{...this.defaultGetConfig,param:params});
    }

    doPost(url,params){
        return this.axiosInstance.post(url,{...this.defaultPostConfig,param:params});
    }

}

export default ConfiguredAxios