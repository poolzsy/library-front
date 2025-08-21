<template>
    <div class="home-container">

        <div class="filter-card">
            <el-input v-model="searchContent" placeholder="请输入内容" style="width: 240px; margin-right: 15px;" clearable />
            <el-input v-model="searchContact" placeholder="请输入联系方式" style="width: 240px; margin-right: 15px;"
                clearable />
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>

        <div class="table-card" :data="tableData">
            <el-table :data="tableData" stripe>
                <el-table-column label="名称" prop="name" />
                <el-table-column label="年龄" prop="age" />
                <el-table-column label="地址" prop="address" />
                <el-table-column label="联系方式" prop="phone" />
                <el-table-column label="性别" prop="gender" />
            </el-table>

            <div class="pagination-container">
                <el-pagination background layout="prev, pager, next" :total="50" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from '../utils/request';
const searchContent = ref('');
const searchContact = ref('');

const tableData = ref([]);

const fetchTableData = async () => {
    try {
        const data = await request.get('/user/list'); 
        
        tableData.value = data;
    } catch (error) {
        console.error('获取数据失败:', error);
    }
};
const handleSearch = () => {
    console.log('查询内容:', searchContent.value);
    console.log('查询联系方式:', searchContact.value);
};

onMounted(() => {
    fetchTableData();
});
</script>

<style scoped>
@import "../style/Home.css";
</style>
