import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
});

service.interceptors.response.use(

    response => {
        const res = response.data;

        if (res.code === 200 || res.code === '200') {
            return res; 
        } else {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject(new Error(res.message || 'Error'));
        }
    },
    error => {
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
