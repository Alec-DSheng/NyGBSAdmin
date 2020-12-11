import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
<<<<<<< HEAD
    children: [
      {
        router: 'dashboard',
        children: ['workplace', 'analysis'],
      },
      {
        router: 'form',
        children: ['basicForm', 'stepForm', 'advanceForm']
      },
      {
        router: 'basicForm',
        name: '验权表单',
        icon: 'file-excel',
        authority: 'queryForm'
      },
      {
        router: 'antdv',
        path: 'antdv',
        name: 'Ant Design Vue',
        icon: 'ant-design',
        link: 'https://www.antdv.com/docs/vue/introduce-cn/'
      },
      {
        router: 'document',
        path: 'document',
        name: '使用文档',
        icon: 'file-word',
        link: 'https://iczer.gitee.io/vue-antd-admin-docs/'
=======
    children: ['demo',
      {
        router: 'parent1',
        children: [{
          router: 'demo',
          name: 'demo1',
          authority: {
            permission: 'demo',
            role: 'admin'
          }
        }],
      },
      {
        router: 'parent2',
        children: [{
          router: 'demo',
          name: 'demo2'
        }],
      },
      {
        router: 'exception',
        children: ['exp404', 'exp403', 'exp500'],
      },
      {
        router: 'demo',
        icon: 'file-ppt',
        path: 'auth/demo',
        name: '验权页面',
        authority: {
          permission: 'form',
          role: 'manager'
        }
>>>>>>> basic_admin
      }
    ]
  }]
  return result
})
