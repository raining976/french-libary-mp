<template>
	<view class="helpPage">
		<u-notice-bar :text="notice"></u-notice-bar>
		<view class="content">
			<view class="title">
						<u--text text="借书指南" size='18' :bold='true'></u--text>
						<u--text type="error" text="您还没有完成学生认证哦,请前往个人中心认证哦" v-if="isAuth == 1" size='12'></u--text>
					</view>
					<u-steps direction="column" :current="curStep" dot>
						<u-steps-item title="学生认证" :desc="stepOneTips[isAuth]" :error="curStep == 0 ? true : false">
						</u-steps-item>
						<u-steps-item title="查询到想要借的书籍" desc="被借完的书籍就不能借了哦">
						</u-steps-item>
						<u-steps-item title="点击借阅" desc="提交完可以去个人借书记录那里查询哦,查询到就可以去取书啦~"></u-steps-item>
					</u-steps>
					<u-divider></u-divider>
					<view class="title">
						<u--text text="还书指南" size='18' :bold='true'></u--text>
					</view>
					<u-steps direction="column" :current="curStep">
						<u-steps-item title="按时还到图书室交给管理员即可,记得说明学号和姓名哦" desc="是否已还可以在个人借书记录那里查到哦~"></u-steps-item>
					</u-steps>

		</view>
		<tab-bar :current='1'></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curStep: 0,
				isAuth: 0,
				stepOneTips: ['填写正确的姓名和学号', '您已完成认证,可以去借书啦!'],
				notice:"注意:借书前要先进行学生认证哦,前往个人页的学生认证中查看,提交一次就可以啦"
			}
		},
		onShow(){
			this.isAuth = this.$auth.getLocalUserInfo().stuAuthStatus
			this.curStep = this.isAuth == 1 ? 3 : 0
		},
		methods: {
			goStuAuth() {
				uni.switchTab({
					url: "/pages/user/user"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.helpPage {
		.content{
			padding: 0 40rpx;
		}
		.title {
			margin: 30rpx 0;
		}
	}
</style>