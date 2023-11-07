<template>
	<view class="stuAuthPage">
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" :model="StuInfo" :rules="rules" ref="uForm" >
			<u-form-item label="姓名" prop="Sname" borderBottom ref="item1">
				<u--input v-model="StuInfo.Sname" border="none" :disabled="isDisable"></u--input>
			</u-form-item>
			<u-form-item label="学号" prop="SNo" borderBottom ref="SNo">
				<u--input v-model="StuInfo.SNo" border="none" :disabled="isDisable"></u--input>
			</u-form-item>
		</u--form>
		<u-button @click="submit" type="primary" class="submitBtn" :disabled="isDisable">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSex: false,
				StuInfo: {
					Sname: '',
					SNo: '',
				},
				isDisable:false,
				rules: {
					Sname: [{
							type: 'string',
							min: 2,
							required: true,
							message: '请填写姓名',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.chinese(value);
							},
							message: '乖乖写名字哦~',
							trigger: ['change', 'blur'],
						}
					],
					SNo: [{
							type: 'string',
							len: 11,
							required: true,
							message: '不要填错了哦',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.digits(value);
							},
							message: '不要调皮哦~',
							trigger: ['change', 'blur'],
						}
					]
				},
			};
		},
		onLoad(){
			const stuAuthStatus = this.$auth.getLocalUserInfo().stuAuthStatus
			if(stuAuthStatus == 1 || stuAuthStatus == 2){
				const _this = this
				const user_id = this.$auth.getLocalUserInfo()._id
				this.$api.getStuInfo(user_id).then(res=>{
					_this.StuInfo = res.data
					_this.isDisable = true
					console.log(res.data)
				})
			}else if(stuAuthStatus == 3 || stuAuthStatus == 0){
				this.isDisable = false
			}
		}
		,
		methods: {
			submit() {
				const _this = this
				this.$refs.uForm.validate().then(res => {
					const user_id = _this.$auth.getLocalUserInfo()._id
					_this.$api.submitStuAuth(user_id,_this.StuInfo).then(res=>{
						uni.showToast({
							title:res.msg
 						})
						setTimeout(()=>{
							uni.reLaunch({
								url:"/pages/user/user"
							})
						},1000)
					}).catch(err=>{
						uni.$u.toast('出错啦!')
					})
				}).catch(errors => {
					uni.$u.toast('再检查一下,不要填错了哦')
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
	};
</script>
<style scoped>
	.stuAuthPage{
		margin: 30rpx;
	}
	.submitBtn{
		margin: 30rpx 0;
	}
</style>