<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menutab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="mini"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="20"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button size="mini" type="success" class="block">
                获取验证码
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api'
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from '@/utils/validate'
export default {
  name: 'login',
  setup(props, context) {
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!validateEmail(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback() //true
      }
    }
    //验证密码
    let validatePassword = (rule, value, callback) => {
      //过滤后的数据
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      if (value === '') {
        callback(new Error('请输入用户名密码'))
      } else if (!validatePass(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else {
        callback()
      }
    }
    //验证重复密码
    let validatePasswords = (rule, value, callback) => {
      //如果模块值modle是login，直接通过
      if (model.value === 'login') {
        callback()
      }
      //过滤后的数据
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }
    //验证验证码
    let validateCode = (rule, value, callback) => {
      //过滤后的数据
      ruleForm.code = stripscript(value)
      value = ruleForm.code

      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (!validateVCode(value)) {
        return callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }

    /**
     * 声明数据
     */
    //这里面放置data数据、生命周期、自定义函数
    const menutab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' }
    ])
    console.log(menutab)
    //模块值
    const model = ref('login')
    console.log(model.value)
    //表单绑定的数据
    const ruleForm = reactive({
      username: '',
      password: '',
      code: '',
      passwords: ''
    })
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
      code: [{ validator: validateCode, trigger: 'blur' }],
      passwords: [{ validator: validatePasswords, trigger: 'blur' }]
    })

    /**
     * 声明函数
     */
    //切换登录和注册按钮
    const toggleMenu = data => {
      console.log(data)
      menutab.forEach(el => {
        el.current = false
      })
      //高亮
      data.current = true
      //修改模块值
      model.value = data.type
    }
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    /**
     * 生命周期
     */
    //挂载完成后
    onMounted(() => {})
    return {
      menutab,
      model,
      ruleForm,
      rules,
      toggleMenu,
      submitForm
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgb(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 20px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
