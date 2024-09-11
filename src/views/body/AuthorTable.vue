<template>

  <!--新增作者表单-->
  <el-dialog :title=operation v-model="showAuthorForm" width="25%">
    <el-form ref="authorForm" :model="authorInfo" label-width="80px">
      <div style="align-items: center">
        <img src="../../assets/author.png" style="margin: auto -30px -30px 10px; max-width: 20px">
        <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空' }]">
          <el-input v-model="authorInfo.name"></el-input>
        </el-form-item>
      </div>
      <div style="align-items: center">
        <img src="../../assets/local.png" style="margin: auto -30px -30px 10px; max-width: 20px">
        <el-form-item label="省份" prop="province" :rules="[{ required: true, message: '省份不能为空' }]">
          <el-input v-model="authorInfo.province"></el-input>
        </el-form-item>
      </div>

      <div style="align-items: center">
        <img src="../../assets/local.png" style="margin: auto -30px -30px 10px; max-width: 20px">
        <el-form-item label="市区" prop="city" :rules="[{ required: true, message: '市区不能为空' }]">
          <el-input v-model="authorInfo.city"></el-input>
        </el-form-item>
      </div>

      <div style="align-items: center">
        <img src="../../assets/local.png" style="margin: auto -30px -30px 10px; max-width: 20px">
        <el-form-item label="地址" prop="address" :rules="[{ required: true, message: '地址不能为空' }]">
          <el-input v-model="authorInfo.address"></el-input>
        </el-form-item>
      </div>

      <div style="align-items: center">
        <img src="../../assets/zip.png" style="margin: auto -30px -30px 10px; max-width: 20px">
        <el-form-item label="邮编" prop="zip" :rules="[{ required: true, message: '邮编不能为空' }]">
          <el-input v-model="authorInfo.zip"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="showAuthorForm = false">取 消</el-button>
      <el-button type="primary" @click=authorMethod(this.methodOption)>确 定</el-button>
    </span>
    </template>
  </el-dialog>

  <div
      style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); text-align: center; font-size: xx-large">
    <h1 style="color: white">作者管理</h1>
  </div>
  <div style="min-width: 35%; float: right; margin: 50px 20px 20px 20px">
    <el-input
        style="width:150px; margin-right:10px"
        size="default"
        placeholder="请输入姓名"
        prefix-icon="el-icon-search"
        v-model="search_content">
    </el-input>
    <el-button type="primary" size="default" @click="confirmSearch"><img src="../../assets/search.png"
                                                                         style="margin-right: 10px; max-width: 20px"> 搜索
    </el-button>
    <el-button type="warning" size="default" @click="addAuthor"><img src="../../assets/add.png"
                                                                     style="margin-right: 10px; max-width: 20px"> 新增
    </el-button>
  </div>

  <!--  作者信息表格-->
  <el-table :data="currentFilter" size="large" stripe border height="600px"
            style="width: 1520px; margin: auto;">
    <el-table-column sortable prop="id" label="序号" min-width="100" max-width="200">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column sortable prop="date" label="日期" min-width="160" max-width="200">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <img src="../../assets/time.png" style="margin-right: 10px; max-width: 20px">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column sortable prop="name" label="姓名" min-width="120" max-width="300">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <img src="../../assets/author.png" style="margin-right: 10px; max-width: 20px">
          <el-tag>{{ scope.row.name }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column sortable prop="province" label="省份" min-width="120" max-width="300">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <img src="../../assets/local.png" style="margin-right: 10px; max-width: 20px">
          <span style="margin-left: 10px">{{ scope.row.province }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column sortable prop="city" label="市区" min-width="120" max-width="300">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <img src="../../assets/local.png" style="margin-right: 10px; max-width: 20px">
          <span style="margin-left: 10px">{{ scope.row.city }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column sortable prop="address" label="地址" min-width="120" max-width="500">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <img src="../../assets/local.png" style="margin-right: 10px; max-width: 20px">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column sortable prop="zip" label="邮编" min-width="120" max-width="150">
      <template v-slot="scope">
        <div style="display: flex; align-items: center">
          <img src="../../assets/zip.png" style="margin-right: 10px; max-width: 20px">
          <span style="margin-left: 10px">{{ scope.row.zip }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="150" max-width="180" align="center">
      <template v-slot="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="currentSize"
      layout="total, sizes, prev, pager, next"
      :total="tableFilter.length"
      style="margin: 2% auto auto 18%">
  </el-pagination>
</template>

<script>

import userCommonApi from '@/api/authorReq.js';
import {ElMessage} from "element-plus";
import {Iphone, Timer} from "@element-plus/icons-vue";

export default {
  components: {Iphone, Timer},
  data() {
    return {
      tableData: [],
      tableFilter: [],
      currentFilter: [],
      currentSize: 10,
      currentPage: 1,
      search_content: '',

      showAuthorForm: false,
      operation: '',
      methodOption: 0,
      authorInfo: {
        name: '',
        province: '',
        city: '',
        address: '',
        zip: ''
      },
      formRef: null
    };
  },
  methods: {
    confirmSearch() {
      this.tableFilter = this.tableData.filter(data => !this.search_content || data.name.toLowerCase().includes(this.search_content.toLowerCase()));
      this.handleDataChange();
    },
    handleSizeChange(val) {
      this.currentSize = val;
      this.currentPage = 1;
      this.handleDataChange();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleDataChange();
    },
    handleDataChange() {
      if (Array.isArray(this.tableFilter)) {
        this.currentFilter = this.tableFilter.slice(
            (this.currentPage - 1) * this.currentSize,
            (this.currentPage) * this.currentSize
        )
      }
    },

    //删除作者
    handleDelete(row) {
      this.$confirm('此操作将永久删除该作者！是否继续？', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
          .then(() => {
            // 用户确认删除
            userCommonApi.deleteById(row.id).then(response => {
              if (response.data.success === true) {
                ElMessage.success(response.data.msg);
                this.updateData();
              } else {
                ElMessage.error(response.data.msg);
              }
            })
                .catch(error => {
                  ElMessage.error('删除失败，服务器异常！');
                  console.error('删除失败，服务器异常！', error);
                });
          })
    },

    //选择方法（新增/修改）
    authorMethod(opt) {
      if (opt === 1)
        this.saveNewAuthor()
      else if (opt === 2)
        this.saveEditAuthor()
      else
        ElMessage.error("系统内部错误，请联系管理员！");
    },

    //添加作者
    addAuthor() {
      this.operation = '新增作者';
      this.methodOption = 1;
      this.showAuthorForm = true;
      this.authorInfo = {
        name: '',
        province: '',
        city: '',
        address: '',
        zip: ''
      }
    },
    saveNewAuthor() {
      this.$refs.authorForm.validate((valid) => {
        if (valid) {
          // 调用后端接口保存新作者信息
          userCommonApi.addAuthor(this.authorInfo)
              .then(response => {
                if (response.data.success === true) {
                  ElMessage.success(response.data.msg);
                  this.showAuthorForm = false;
                  this.updateData(); // 更新表格数据
                } else {
                  ElMessage.error(response.data.msg);
                }
              })
              .catch(error => {
                ElMessage.error('保存新作者信息失败，服务器异常！');
                console.error('保存新作者信息失败，服务器异常！', error);
              });
        } else {
          // 表单验证失败
          ElMessage.error('请填写完整的作者信息！');
        }
      });
    },

    //修改作者信息
    handleEdit(row) {
      this.operation = '修改作者信息';
      this.methodOption = 2;
      this.showAuthorForm = true;
      // 将当前行的数据填充到 editAuthorInfo 中
      this.authorInfo = {
        id: row.id,
        name: row.name,
        province: row.province,
        city: row.city,
        address: row.address,
        zip: row.zip
      };
    },
    saveEditAuthor() {
      this.$refs.authorForm.validate((valid) => {
        if (valid) {
          // 调用后端接口更新作者信息
          userCommonApi.updateAuthor(this.authorInfo)
              .then(response => {
                if (response.data.success === true) {
                  ElMessage.success(response.data.msg);
                  this.showAuthorForm = false;
                  this.updateData(); // 更新表格数据
                } else {
                  ElMessage.error(response.data.msg);
                }
              })
              .catch(error => {
                ElMessage.error('保存编辑后的作者信息失败，服务器异常！');
                console.error('保存编辑后的作者信息失败，服务器异常！', error);
              });
        } else {
          // 表单验证失败
          ElMessage.error('请填写完整的作者信息！');
        }
      });
    },

    updateData() {
      userCommonApi.page().then(response => {
        this.tableData = response.data.data.records;
        this.tableFilter = this.tableData;
        this.handleDataChange();
      }).catch(error => {
        ElMessage.error('获取作者信息失败，连接服务器出错！');
        console.error('获取作者信息失败，连接服务器出错！', error);
      });
    }
  }
  ,
  created() {
    this.updateData();
  }
}

</script>

