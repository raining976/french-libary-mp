<template>
	<view class="userInfoPage">
		<view class="uploadBox">
			<u-upload maxSize='1024 * 1024' :fileList="fileList" @afterRead="afterRead" @delete="deletePic"  :maxCount="1" width="100"
				height="100" previewImage multiple>
	 			<image :src="userInfo.avatarUrl" mode="widthFix" style="width: 100px;height: 100px;"></image>
			</u-upload>
		</view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
			<u-form-item label="昵称" prop="nickName" borderBottom ref="item1">
				<u--input v-model="userInfo.nickName" border="none"></u--input>
			</u-form-item>
			<u-form-item label="性别" prop="gender" borderBottom @click="showSex = true;" ref="item1">
				<u--input v-model="userInfo.gender" disabled disabledColor="#ffffff" placeholder="请选择性别"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [], // 文件列表
				showSex: false,
				userInfo: {
					nickName: '',
					gender: '',
				},

				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
				],
				rules: {
					'nickName': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'gender': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		onShow() {
			this.userInfo = this.$auth.getLocalUserInfo()
			this.userInfo.gender = this.actions[this.userInfo.gender].name
		},
		methods: {
			sexSelect(e) {
				console.log(e)
				this.userInfo.gender = e.name
				this.$refs.uForm.validateField('gender')
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				console.log(event.name,event.file)
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length
				lists.map((item) => {
					this.fileList.push({
						...item,
					})
				})
				// for (let i = 0; i < lists.length; i++) {
				// 	const result = await this.uploadFilePromise(lists[i].url)
				// 	let item = this.fileList[fileListLen]
				// 	this.fileList.splice(fileListLen, 1, Object.assign(item, {
				// 		status: 'success',
				// 		message: '',
				// 		url: result
				// 	}))
				// 	fileListLen++
				// }
			},
			getGenderNum(gender){
				return gender == '男' ? 1 : 0
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
	};
</script>

<style scoped lang="scss">
	.userInfoPage {
		margin: 30rpx;
		.uploadBox{
			width: 190rpx;
			margin: 30rpx auto;
		}
	}
</style>