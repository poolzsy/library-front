<template>
    <div class="home-container">
        <el-card class="welcome-card" shadow="never">
            <h1 class="welcome-title">欢迎使用图书管理系统！</h1>
            <p class="welcome-text">在这里，您可以轻松管理系统中的图书、作者和用户信息。祝您工作愉快！</p>
        </el-card>

        <el-row :gutter="20" class="stats-card-row">
            <el-col :span="8">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-icon-wrapper bg-blue">
                        <el-icon><Collection /></el-icon>
                    </div>
                    <div class="card-content">
                        <div class="stats-title">图书总量</div>
                        <div class="stats-number">{{ totalBooks }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-icon-wrapper bg-green">
                        <el-icon><User /></el-icon>
                    </div>
                    <div class="card-content">
                        <div class="stats-title">用户总数</div>
                        <div class="stats-number">{{ totalUsers }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-icon-wrapper bg-orange">
                        <el-icon><Avatar /></el-icon>
                    </div>
                    <div class="card-content">
                        <div class="stats-title">作者数量</div>
                        <div class="stats-number">{{ totalAuthors }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Collection, User, Avatar } from '@element-plus/icons-vue';

const totalBooks = ref(0);
const totalUsers = ref(0);
const totalAuthors = ref(0);
const fetchStatsData = () => {
    setTimeout(() => {
        totalBooks.value = Math.floor(Math.random() * 1000) + 500;
        totalUsers.value = Math.floor(Math.random() * 200) + 50;
        totalAuthors.value = Math.floor(Math.random() * 100) + 20;
    }, 500);
};

onMounted(() => {
    fetchStatsData();
});
</script>

<style scoped>
@import "../style/Home.css";
</style>
