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
        <img slot="right" class="weui-vcode-img" src="http://localhost:9090/user/captcha"
             onclick="this.src='http://localhost:9090/user/captcha?'+new Date()*1">
      </x-input>
    </group>
    <group>
      <x-button type="primary" @click.native="loginA">登录</x-button>
    </group>
  </div>
</template>

<script>
  import {AlertModule, XHeader, XInput, Group, XButton, Cell, Alert} from 'vux'
  import {mapMutations} from 'vuex'
  import {login} from '../../util/beApi'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XHeader,
      Alert
    },
    data() {
      return {
        password: null,
        username: null,
        code: null,
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO',
      ]),
      async loginA() {
        let res = await login({
          username: this.username.replace(/\s/g, ""),
          password: this.password,
          code: this.code
        });
        if (res.data.code == 1) {
          this.RECORD_USERINFO({username: res.data.data.username});
          let params = this.$route.params;
          params && this.$router.push((params && params.redirect) ? params.redirect : '/home');
        } else {
          AlertModule.show({
            title: '错误',
            content: res.data.msg,
          });
          setTimeout(() => {
            AlertModule.hide()
          }, 3000)
        }
      },
    }
  }
</script>

<style scoped>

</style>
