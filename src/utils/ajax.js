// 封装axios
import axios from 'axios'

// 响应时间
axios.defaults.timeout = 500000;     

// 配置请求头         
axios.defaults.headers['Content-Type'] = 'text/plain';  

// 请求跨域cookies
axios.defaults.withCredentials = true;  
  
// 请求拦截器
axios.interceptors.request.use(function (config) {
    
    switch ( config.headers['Content-Type'].toLowerCase() ) {
        case 'text/plain':
            config.data = JSON.stringify( config.data );
            break;
    
        default:
            config.data = config.data;
            break;
    }
    
    return config;

}, (error)=> {
    return Promise.reject(error);
});


// 响应拦截器 (返回状态判断)
axios.interceptors.response.use((res) =>{
    let hasResult = res.data.hasOwnProperty('result');
    if ( !hasResult ) {
        return res;
    } else {
        return res.data.result_object;
    }
}, (error) => {
    modal.alert('网络异常' + error);
    return Promise.reject(error);
})



export default axios;
