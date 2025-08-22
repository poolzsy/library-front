<template>
    <div class="user-container"> <!-- 建议使用 user-container 保持一致性 -->
        <!-- 筛选/搜索区域 -->
        <div class="filter-card">
            <el-input v-model="params.name" placeholder="请输入姓名" style="width: 240px; margin-right: 15px;" clearable />
            <el-input v-model="params.phone" placeholder="请输入联系方式" style="width: 240px; margin-right: 15px;"
                clearable />
            <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
            <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </div>

        <!-- 表格和分页区域 -->
        <div class="table-card">
            <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-bottom: 20px;">新增用户</el-button>
            <el-table :data="tableData" stripe v-loading="loading">
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="年龄" prop="age" />
                <el-table-column label="地址" prop="address" />
                <el-table-column label="联系方式" prop="phone" />
                <el-table-column label="性别" prop="gender">
                    <template #default="scope">
                        <span>{{ scope.row.gender === '0' ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" size="small" :icon="Edit"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" :icon="Delete"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination background v-model:current-page="params.pageNum" v-model:page-size="params.pageSize"
                    :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange" />
            </div>
        </div>

        <!-- 表单 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="35%" @close="resetForm">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="form.age" :min="1" :max="120" style="width: 180px;" />
                </el-form-item>

                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入联系方式" />
                </el-form-item>

                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" type="textarea" placeholder="请输入地址" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmit">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import request from '../utils/request';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue';

const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const params = reactive({
    pageNum: 1,
    pageSize: 10,
    name: '',
    phone: ''
});

const dialogVisible = ref(false);
const dialogTitle = ref('新增用户');
const formRef = ref(null);

const getInitialForm = () => ({
    id: null,
    username: '',
    name: '',
    age: undefined,
    address: '',
    phone: '',
    gender: ''
});
const form = reactive(getInitialForm());

// 手机号校验
const validatePhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入联系方式'));
    }
    const reg = /^1[3-9]\d{9}$/;
    if (!reg.test(value)) {
        return callback(new Error('请输入有效的11位手机号码'));
    }
    callback();
};

const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
    age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
    phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
});

const fetchData = async () => {
    loading.value = true;
    try {
        const res = await request.get('/user/page', { params: params });
        tableData.value = res.data?.rows || [];
        total.value = res.data?.total || 0;
    } catch (error) {
        console.error('获取数据失败:', error);
        ElMessage.error('数据加载失败');
    } finally {
        loading.value = false;
    }
};

const resetForm = () => {
    Object.assign(form, getInitialForm());
    formRef.value?.clearValidate();
};

const handleSubmit = async () => {
    if (!formRef.value) return;
    try {
        await formRef.value.validate();
        const url = form.id ? `/user/update` : '/user/save'; 
        const method = form.id ? 'put' : 'post';
        
        await request[method](url, form);
        ElMessage.success(form.id ? '更新成功' : '新增成功');
        dialogVisible.value = false;
        fetchData();
    } catch (error) {
        console.error('操作失败:', error);
    }
};

const handleAdd = () => {
    resetForm();
    dialogTitle.value = '新增用户';
    dialogVisible.value = true;
};

const handleEdit = (row) => {
    resetForm();
    dialogTitle.value = '编辑用户';
    Object.assign(form, JSON.parse(JSON.stringify(row)));
    dialogVisible.value = true;
};

const handleDelete = (id) => {
    ElMessageBox.confirm(
        '您确定要删除这位用户吗？此操作不可撤销。',
        '警告',
        {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        try {
            await request.delete(`/user/delete/${id}`);
            ElMessage.success('删除成功');
            fetchData();
        } catch (error) {
            ElMessage.error('删除失败');
        }
    }).catch(() => {
        ElMessage.info('已取消删除');
    });
};

const handleSearch = () => {
    params.pageNum = 1;
    fetchData();
};

const handleReset = () => {
    params.name = '';
    params.phone = '';
    params.pageNum = 1;
    fetchData();
};

const handleSizeChange = (pageSize) => {
    params.pageNum = 1;
    params.pageSize = pageSize;
    fetchData();
};

const handlePageChange = (pageNum) => {
    params.pageNum = pageNum;
    fetchData();
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
@import "../style/User.css";
</style>