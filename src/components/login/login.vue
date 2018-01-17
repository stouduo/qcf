<template>
  <div>
    <x-header :left-options="{showBack: false}">QC</x-header>
    <group>
      <x-input mask="999 9999 9999" v-model="username" placeholder="请输入手机号码" keyboard="number"
               is-type="china-mobile"></x-input>
    </group>
    <group>
      <x-input v-model="password" placeholder="请输入密码" required type="password"></x-input>
    </group>
    <group>
      <x-input class="weui-cell_vcode" type="text" v-model="code">
        <img slot="right" class="weui-vcode-img" :src="captcha" @click.native="getCaptcha">
      </x-input>
    </group>
    <group>
      <x-button type="primary" @click.native="loginA">登录</x-button>
    </group>
  </div>
</template>

<script>
  import {XHeader,XInput, Group, XButton, Cell} from 'vux'
  import {mapState} from 'vuex'
  import {login, captcha} from '../../util/beApi'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XHeader
    },
    data() {
      return {
        password: null,
        username: null,
        code: null,
        captcha: null
      }
    },
    methods: {
      ...mapState(['RECORD_USERINFO']),
      async loginA() {
        let res = await login({username: this.username, password: this.password, code: this.code});
        if (res.code === 200) {
          this.RECORD_USERINFO(res.data);
        } else {
          parmas = this.$routes.parmas;
          this.$router.push((parmas && params.redirect) ? parmas.redirect : '/');
        }
      },
      async getCaptcha() {
        this.captcha = await captcha('/captcha?d=' + new Date() * 1);
      }
    }
  }
</script>

<style scoped>

</style>
