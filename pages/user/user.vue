<template>
	<view>
		<view class="user" v-if="!disabled">
			<u-avatar :src="userInfo.avatarUrl" size="120"></u-avatar>
			<view class="nickName">
				<text>{{ userInfo.nickName }}</text>
			</view>
		</view>
		<view class="user" v-if="disabled">
			<u-avatar :src="noLoginInfo.avatarUrl" size="120"></u-avatar>
			<view class="nickName">
				<text>{{ noLoginInfo.nickName }}</text>
			</view>
		</view>
		<view class="setBox">
			<u-cell-group>
				<u-cell size="large" :title="item.title" :isLink="item.isLink" :disabled="item.disabled" :url="item.url"
					:label="item.statusText" v-for='(item,index) in setItems' :key="index"
					@click="clickSetItem(index)"></u-cell>
			</u-cell-group>
		</view>
		<tab-bar :current='2'></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				disabled: false,
				noLoginInfo: {
					avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
					nickName: "请登录!"

				},
				setItems: [{
						title: "个人信息修改",
						icon: "share",
						isLink: true,
						disabled: false,
						url: "/pages/user/editInfo"
					},
					{
						title: "学生信息认证",
						label: "",
						isLink: true,
						disabled: false,
						url: "/pages/user/stuAuth"
					},
					{
						title: "我的借书记录",
						label: "",
						isLink: true,
						disabled: false,
						url: "/pages/user/borrowRecord"
					},
					{
						title: "退出登录",
						label: "",
						isLink: false,
						disabled: false,
						url: ""
					}
				],
				statusTexts: ["未认证，请点击认证", "认证成功，可以借书啦！", "正在审核，请耐心等待", "认证失败，请重新填写"],
				statusIndex: 0,
			};
		},
		onLoad() {
			this.$auth.checkIsAuthorized()
			this.disabled = !this.$auth.getIsLogin()
			const _this = this
			this.setItems.forEach((item) => {
				item.disabled = _this.disabled
			})
			this.getUserInfo()
		},
		onShow() {

		},
		methods: {
			getUserInfo() {
				const _this = this
				const _id = this.$auth.getLocalUserInfo()._id
				this.$api.getUserInfoById(_id).then(res => {
					_this.$auth.updateTokenStorage(res.data)
					this.userInfo = res.data
					this.statusIndex = this.userInfo.stuAuthStatus
					this.setItems[1].statusText = this.statusTexts[this.statusIndex]
					console.log("个人信息", this.userInfo)
				})
			},
			clickSetItem(idx) {
				// if (idx == 0) {
				// 	uni.showToast({
				// 		title: "未开放",
				// 		icon: "none"
				// 	})
				// 	return
				// }
				if (idx != 3) return
				const _this = this
				uni.showModal({
					title: '温馨提示',
					content: "确定要退出登录?",
					success(res) {
						if (res.confirm) {
							_this.$auth.updateIsLoginStorage()
							uni.showToast({
								title: "您已退出登录~",
								duration: 1000
							})
							setTimeout(() => {
								_this.$auth.checkIsAuthorized()
							}, 1000)
						}
					},
				})
			}

		}

	}
</script>

<style lang="scss">
	.user {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 40rpx 0;

		.nickName {
			margin: 40rpx 0;
			font-size: 40rpx;
		}

	}
</style>