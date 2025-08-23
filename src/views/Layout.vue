<template>
    <div class="common-layout">
        <!-- 头部区域 -->
        <header class="layout-header">
            <div class="logo-container">
                <img src="../assets/logo.svg" alt="logo" class="logo-img">
                <span class="system-title">图书管理系统</span>
            </div>
        </header>

        <!-- 主体区域 -->
        <div class="main-container">
            <!-- 侧边导航栏 -->
            <aside class="layout-sider">
                <el-menu :default-active="$route.path" :router="true" class="el-menu-vertical">
                    <el-menu-item index="/home">
                        <el-icon><House /></el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-sub-menu index="/users-management">
                        <template #title>
                            <el-icon><User /></el-icon>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="/admin">管理员</el-menu-item>
                        <el-menu-item index="/user">用户列表</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="/books-management">
                        <template #title>
                            <el-icon><Management /></el-icon>
                            <span>图书管理</span>
                        </template>
                        <el-menu-item index="/books">书籍管理</el-menu-item>
                        <el-menu-item index="/authors">作者管理</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </aside>

            <!-- 内容区域 -->
            <main class="layout-content">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
@import "../style/Layout.css";
</style>
