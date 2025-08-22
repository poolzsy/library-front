import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
});

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200 || response.status === 200) {
            return res;
        } else {
            ElMessage.error(res.message || 'Error');
            return Promise.reject(new Error(res.message || 'Error'));
        }
    },
    error => {
        console.log('err' + error);
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);
export default service;