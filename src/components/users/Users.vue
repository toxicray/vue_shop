<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" border stripe>
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 列表区 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="150">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            {{ scope.null }}
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button
            ><el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 3, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input> </el-form-item
        ><el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input> </el-form-item
        ><el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input> </el-form-item
        ><el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证guize
    var checkEmail = (rules, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的邮箱'))
    }

    var checkMobile = (rules, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      // 获取用户列表的数据请求对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            message: '邮箱格式不正确，请重新输入',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          {
            validator: checkMobile,
            message: '手机号码不正确，请重新输入',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      console.log(res)
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getUserList()
    },
    // 页码改变
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage
      this.getUserList()
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      return this.$message.info('更新用户状态成功')
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped></style>
