
// import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
// const request = axios.create(
//   {
//     baseURL: 'http://localhost:3000',
//     timeout: 5000,
//   }
// )
// // 请求拦截器
// axios.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // 在发送请求之前做些什么 
//     return config;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// axios.interceptors.response.use(
//   (response: AxiosResponse<{ code: string }>): AxiosResponse<{ code: string }> => {
//     // 对响应数据做点什么
//     return response;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );


// export default request;


import { extend, type RequestOptionsInit } from 'umi-request';

const request = extend({
  prefix: 'http://localhost:3000',
  timeout: 3000,

});



// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  return { url, options };
});



// response拦截器, 处理response
request.interceptors.response.use((response: Response, options: RequestOptionsInit) => {
  return response;
});

export default request;


