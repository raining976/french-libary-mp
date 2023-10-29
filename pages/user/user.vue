<template>
	<view>
		<view class="user">
			<u-avatar :src="userInfo.avatarUrl" size="120"></u-avatar>
			<view class="nickName">
				<text>{{ userInfo.nickName }}</text>
			</view>
		</view>
		<view class="setBox">
			<u-cell-group>
				<u-cell size="large" :title="item.title" :isLink="item.isLink" :url="item.url" :label="item.statusText" v-for='(item,index) in setItems'
					:key="index" @click="clickSetItem(index)"></u-cell>
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
				setItems: [{
						title: "个人信息修改",
						icon: "share",
						isLink:true,
						url: "/pages/user/editInfo"
					},
					{
						title: "学生信息认证",
						label: "",
						isLink:true,
						url: "/pages/user/stuAuth"
					},
					{
						title: "退出登录",
						label: "",
						isLink:false,
						url: ""
					}
				],
				statusTexts:["未认证，请点击认证","认证成功，可以借书啦！","正在审核，请耐心等待","认证失败，请重新填写"],
				statusIndex:0,
			};
		},
		onLoad() {
		},
		onShow() {
			this.$auth.checkIsAuthorized()
			this.getUserInfo()
		},
		methods: {
			getUserInfo(){
				const _id = this.$auth.getLocalUserInfo()._id
				this.$api.getUserInfoById(_id).then(res=>{
					this.userInfo = res.data
					this.statusIndex= this.userInfo.stuAuthStatus
					this.setItems[1].statusText = this.statusTexts[this.statusIndex]
					console.log("个人信息",this.userInfo)
				})
			},
			clickSetItem(idx){
				if(idx!=2)return
				const _this = this
				uni.showModal({
					title: '温馨提示',
					content:"确定要退出登录?",
					success(res){
						if(res.confirm){
							_this.$auth.updateIsLoginStorage()
							uni.showToast({
								title:"您已退出登录~",
								duration:1000
							})
							setTimeout(()=>{
							_this.$auth.checkIsAuthorized()
							},1000)
						}else{
							uni.showToast({
								title:"您取消了登录",
								icon:"none"
							})
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