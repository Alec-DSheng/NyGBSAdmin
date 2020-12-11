<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :style="{backgroundColor: color}">
        {{user.name.substring(0, 1)}}
      </a-avatar>
      <span class="name">{{user.name}}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
<<<<<<< HEAD:src/layouts/header/HeaderAvatar.vue
=======
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
>>>>>>> basic_admin:src/layouts/header/HeaderAvatar.vue
import {mapGetters} from 'vuex'
import {logout} from '@/services/user'

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters('account', ['user']),
<<<<<<< HEAD:src/layouts/header/HeaderAvatar.vue
=======
  },
  data () {
    return {
      color: colorList[Math.floor(Math.random()*4)]
    }
>>>>>>> basic_admin:src/layouts/header/HeaderAvatar.vue
  },
  methods: {
    logout() {
      logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
