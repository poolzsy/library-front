<template>
    <div class="home-container">
        <!-- 筛选/搜索区域 -->
        <div class="filter-card">
            <el-input v-model="params.name" placeholder="请输入姓名" style="width: 240px; margin-right: 15px;" clearable />
            <el-input v-model="params.phone" placeholder="请输入联系方式" style="width: 240px; margin-right: 15px;"
                clearable />
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>
        <!-- 表格和分页区域 -->
        <div class="table-card">
            <el-table :data="tableData" stripe v-loading="loading">
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="年龄" prop="age" />
                <el-table-column label="地址" prop="address" />
                <el-table-column label="联系方式" prop="phone" />
                <el-table-column label="性别" prop="gender" />
            </el-table>

            <div class="pagination-container">
                <el-pagination background v-model:current-page="params.pageNum" v-model:page-size="params.pageSize"
                    :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import request from '../utils/request';

const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const params = reactive({
    pageNum: 1,
    pageSize: 10,
    name: '',
    phone: ''
});

const fetchData = async () => {
    loading.value = true;
    try {
        const responseData = await request.get('/user/page', { params: params });
        
        if (responseData && responseData.rows) {
            tableData.value = responseData.rows;
            total.value = responseData.total;
        } else {
            tableData.value = [];
            total.value = 0;
        }
    } catch (error) {
        console.error('获取数据失败:', error);
        tableData.value = [];
        total.value = 0;
    } finally {
        loading.value = false;
    }
};

const handleSearch = () => {
    params.pageNum = 1;
    fetchData();
};

const handleSizeChange = () => {
    params.pageNum = 1;
    fetchData();
};

const handlePageChange = () => {
    fetchData();
};

onMounted(() => {
    fetchData();
});
</script>
<style scoped>
@import "../style/Home.css";
</style>