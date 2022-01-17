import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new Router({
	mode: "history",
		routes: [{
				path: '/',
				redirect: 'Index',
			},
			{
				//主页
				path: '/index',
				redirect: 'home',
				component: resolve => require(['../components/Index.vue'], resolve),
				name:'index',
				meta: {
					title: '主页'
				},
				children: [{
						//首页
						path: '/home',
						component: resolve => require(['../components/Home.vue'], resolve),
						meta: {
							title: '首页'
						}
					},{
						//blog页
						path:'/blog',
						component:resolve=>require(['../components/Blog.vue'],resolve),
						meta:{
							title:'博客'
						},
					},
					{
						path:'/blog/blogDetail',
						component:resolve=>require(['../components/BlogDetail.vue'],resolve),
						meta:{
							title:'博客详情'
						}
					},
					{
						path:'/newBlog',
						component:resolve=>require(['../components/NewBlog.vue'],resolve),
						meta:{
							title:'新建博客'
						}
					},
					{
						//个人页
						path:'/userCenter',
						redirect:'/userCenter/myFollow',
						component:resolve=>require(['../components/UserCenter.vue'],resolve),
						meta:{
							title:'个人中心'
						},
						children:[{
							path:'/userCenter/myFollow',
							component:resolve=>require(['../components/MyFollow.vue'],resolve),
							meta:{
								title:'我的关注'
							}
						},
						{
							path:'/userCenter/myCollect',
							component:resolve=>require(['../components/MyCollect.vue'],resolve),
							meta:{
								title:'我的收藏'
							}
						},
						{
							path:'/userCenter/myBlog',
							component:resolve=>require(['../components/MyBlog.vue'],resolve),
							meta:{
								title:'我的博文'
							}
						},
						{
							path:'/userCenter/myInfo',
							component:resolve=>require(['../components/MyInfo.vue'],resolve),
							meta:{
								title:'我的信息'
							}
						},
						{
							path:'/userCenter/myQG',
							component:resolve=>require(['../components/MyQG.vue'],resolve),
							meta:{
								title:'修改密码'
							}
						}
						]
					}
				]
			},
			{
				//用户登录注册
				path: '/sign',
				redirect: 'SignIn',
				component: resolve => require(['../components/Sign.vue'], resolve),
				meta: {
					title: '登录注册页面'
				},
				children: [{
						//用户登录
						path: '/signIn',
						component: resolve => require(['../components/SignIn.vue'], resolve),
						meta: {
							title: '登录页面'
						}
					},
					{
						//用户注册
						path: '/signUp',
						component: resolve => require(['../components/SignUp.vue'], resolve),
						meta: {
							title: '注册页面'
						}
					}
				]
			},
			{
				//管理员界面
				path: '/admin',
				redirect: '/admin/userManage',
				component: resolve => require(['../components/Administrator.vue'], resolve),
				meta: {
					title: '管理员界面页面'
				},
				children:[
					{
						//用户管理
						path: '/admin/userManage',
						component: resolve => require(['../components/userManage.vue'], resolve),
						meta: {
							title: '用户管理'
						}
					},
					{
						//博客管理
						path: '/admin/blogManage',
						component: resolve => require(['../components/BlogManage.vue'], resolve),
						meta: {
							title: '博客管理'
						}
					},
					{
						//评论管理
						path: '/admin/replyManage',
						component: resolve => require(['../components/replyManage.vue'], resolve),
						meta: {
							title: '评论管理'
						}
					}
				]
			}
		]
	})
