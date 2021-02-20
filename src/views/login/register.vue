<template>
  <!--
      visible.sync: 决定是否显示
      center: 居中
    -->
  <el-dialog title="用户注册" v-model="dialogVisible" width="600px" center>
    <!--
        model: 绑定的模型，它的值是一个对象，对象里面的属性必须跟接口中的一致
        rules：校验规则
      -->
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
    >
      <!-- prop必须要写，否则校验和清空不起作用，并且它的值要跟model和rules中一致 -->
      <el-form-item label="头像" prop="avatar">
        <!--
            action: 上传的地址，要换成我们自己到的
            data：上传时附带的额外参数
            show-file-list: 是否展示上传之后的文件列表
            on-success：当上传成功之后需要执行的方法（他需要做两件事，第一：预览，第二：把上传之后服务器返回的地址，赋值给form.avatar属性）
            before-upload：上传之前，校验格式和大小
           -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :data="uploadObj"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="16">
          <el-form-item label="图形码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" style="margin-left:10px;">
          <img
            :src="registerCaptcha"
            alt=""
            style="width:100%;height:40px;"
            @click="changeRegisterCaptcha"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="验证码" prop="rcode">
            <el-input v-model="form.rcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" style="margin-left:10px;">
          <el-button style="width:150px;" @click="getRcode"
            >获取用户验证码</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <template #footer class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="register">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        // 调用表单的清空方法（把校验也清空）
        this.$refs.form.resetFields()

        // 清空预览的图片
        this.imageUrl = ''
      }
    }
  }
})
export default class Register extends Vue {
  dialogVisible = false
  registerCaptcha: any = process.env.VUE_APP_BASEURL + '/captcha?type=sendsms' // 注册时候的图像码地址
  uploadUrl = process.env.VUE_APP_BASEURL + '/uploads' // 上传头像的地址
  imageUrl = '' // 预览的图片地址
  uploadObj = {
    // 上传时的额外参数
    image: null
  }

  $refs: any

  $axios: any

  $message: any

  form: any

  data () {
    return {
      dialogVisible: false,
      imageUrl: '',
      form: {
        avatar: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        code: '',
        rcode: ''
      },
      rules: {
        avatar: [
          { required: true, message: '头像不能为空', trigger: 'change' }
        ],
        username: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            validator: (rule: any, value: any, callback: Function) => {
              // rule：规则，value:输入的值 callback回调函数
              if (!value) return callback(new Error('邮箱不能为空'))

              // 在下一行禁用eslint，类似上一种方法，只是写的位置不同罢了
              // eslint-disable-next-line
              const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
              if (!reg.test(value)) return callback(new Error('邮箱不合法'))

              // 不要忘了我，这是处理正确的情况
              callback()
            },
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            /**
             * rule：规则
             * value: 输入的值
             * callback：回调，决定是否校验通过
             */ validator: (rule: any, value: any, callback: Function) => {
              if (!value) return callback(new Error('手机号不能为空'))

              const reg = /^1[3456789][0-9]{9}$/
              if (!reg.test(value)) return callback(new Error('手机号不合法'))

              // 能来到这里肯定是成功了，callback也要执行
              callback()
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度必须是6-16位之间',
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '图形码不能为空', trigger: 'blur' }],
        rcode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    }
  }

  changeRegisterCaptcha () {
    this.registerCaptcha =
      process.env.VUE_APP_BASEURL +
      `/captcha?type=sendsms&t=${Number(new Date()) - 0}`
  }

  // 获取验证码
  async getRcode () {
    let count = 0

    this.$refs.form.validateField(['phone', 'code'], (errorMessage: any) => {
      if (!errorMessage) {
        count++
      }
    })

    if (count === 2) {
      const res = await this.$axios.post('/sendsms', {
        phone: this.form.phone,
        code: this.form.code
      })

      if (res.code === 200) {
        // 给验证码赋值
        this.form.rcode = res.data.captcha
      } else {
        this.$message.error(res.message)

        // 刷新验证码
        this.changeRegisterCaptcha()
      }
    }
  }

  // 上传成功之后
  /**
   * res 是上传之后，服务器的返回结果
   * file  就是你选中的那个上传的文件
   */
  handleAvatarSuccess (res: any, file: any) {
    // 实现预览
    this.imageUrl = URL.createObjectURL(file.raw)

    if (res.code === 200) {
      this.form.avatar = res.data.file_path
    }
  }

  // 上传之前
  /**
   * file  就是你选中的那个上传的文件
   */
  beforeAvatarUpload (file: any) {
    const isImage =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isImage) {
      this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }

    // 给额外参数image，赋值
    this.uploadObj.image = file

    // 只有返回的值为true，才会真正的发起请求，实现文件上传
    return isImage && isLt2M
  }

  // 注册
  register () {
    this.$refs.form.validate(async (valid: boolean) => {
      if (!valid) return

      const res = await this.$axios.post('/register', this.form)
      if (res.code === 200) {
        // 成功
        this.$message.success('注册成功~')

        // 关闭当前窗口
        this.dialogVisible = false
      } else {
        // 失败
        this.$message.error(res.message)

        // 刷新验证码
        this.changeRegisterCaptcha()
      }
    })
  }
}
</script>

<style lang="less">
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
