import Mock from 'mockjs'
import '@/mock/user/login'
<<<<<<< HEAD
import '@/mock/workplace'
import '@/mock/user/routes'
import '@/mock/goods'
=======
import '@/mock/user/routes'
>>>>>>> basic_admin

// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
