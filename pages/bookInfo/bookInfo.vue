<template>
	<view class="bookInfo">
		<u-skeleton :loading="isLoading" :animate="true" rows="15" rowsHeight="30">
			<view class="u-page">
				<view>
					<view class="bookInfoContent">
						<u-row customStyle="margin: 10px 0">
							<u-col span="3">
								<text class="label">图书名称：</text>
							</u-col>
							<u-col span="8">
								<text>{{book.BName}}</text>
							</u-col>
						</u-row>
						<u-line></u-line>
						<u-row customStyle="margin: 10px 0">
							<u-col span="3">
								<text class="label">图书编号：</text>
							</u-col>
							<u-col span="9">
								<text>{{book.BNo}}</text>
							</u-col>
						</u-row>
						<u-line></u-line>
						<u-row customStyle="margin: 10px 0">
							<u-col span="3">
								<text class="label">作者：</text>
							</u-col>
							<u-col span="9">
								<text>{{book.Author}}</text>
							</u-col>
						</u-row>
						<u-line></u-line>
						<u-row customStyle="margin: 10px 0">
							<u-col span="3">
								<text class="label">出版社：</text>
							</u-col>
							<u-col span="9">
								<text>{{book.Publisher}}</text>
							</u-col>
						</u-row>
						<u-line></u-line>
						<u-row customStyle="margin: 10px 0">
							<u-col span="3">
								<text class="label">出版年份：</text>
							</u-col>
							<u-col span="9">
								<text>{{book.PublishYear}}年</text>
							</u-col>
						</u-row>
						<u-line></u-line>
						<u-row customStyle="margin: 10px 0">
							<u-col span="3">
								<text class="label">数量：</text>
							</u-col>
							<u-col span="9">
								<text>{{book.BCount}}</text>
							</u-col>
						</u-row>
						<u-line></u-line>
					</view>
					<view class="btnBox">
						<u-button type="primary" text="我要借阅" :disabled="book.BCount == 0"
							@click="borrowBook"></u-button>
					</view>
				</view>
				<view>
					<u-modal :show="showModal" :title="modal.title" showCancelButton='true' confirmText="就借这本"
						cancelText="不借了" @confirm="confirmedBorrowBook" @cancel="canceledBorrowBook">
						<view class="borrowInfoBox">
							<view class="bookName item">
								{{book.BName}}
							</view>
							<view class="borrowCount item">
								借阅数量: 1本
							</view>
							<view class="borrowTime item">
								借阅时间: 一个月
							</view>
							<view class="returnBooktime item">
								还书时间: {{returnBookTime}}
							</view>
						</view>
					</u-modal>
					<u-toast ref="uToast"></u-toast>
				</view>
			</view>
		</u-skeleton>
	</view>
</template>
<script>
	import {
		data
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				returnBookTime: "",
				isLoading: true,
				book: {},
				showModal: false,
				modal: {
					title: "确认借阅",
				}
			};
		},
		onLoad(option) {
			this.setBookReturnTime()
			this.getBookData(option._id)
		},
		methods: {
			getBookData(_id) {
				this.isLoading = true
				this.$api.getBookByID(_id).then(res => {
					this.book = res.data[0]
					this.isLoading = false
					uni.setNavigationBarTitle({
						title: this.book.BName
					});
				})
			},
			borrowBook() {
				this.$auth.checkIsAuthorized()
				this.showModal = true
			},
			confirmedBorrowBook() {
				if(this.$auth.getLocalUserInfo().stuAuthStatus != 1){
					this.showModal = false
					uni.showModal({
						title:"提示",
						content:"你还没有进行学生认证哦",
						confirmText:"我知道了",
					})
					return
				}
				
				this.showModal = false
				uni.showLoading({
					title: "提交中"
				})
				this.$api.sumbitBorrowBook(this.$auth.getLocalUserInfo()._id, this.book._id).then(res => {
					uni.hideLoading()
					if (res.code == 0) {
						this.$refs.uToast.show({
							type: 'error',
							message: res.msg,
						})
					}else if(res.code == 1){
						this.$refs.uToast.show({
							type: 'success',
							message: res.msg,
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:"/pages/index/index"
							})
						},1000)
					}
				})
			},
			canceledBorrowBook() {
				this.showModal = false
			},
			getBookReturnTime() {
				return new Date().setMonth(new Date().getMonth() + 1)
			},
			getNowTime() {
				return new Date()
			},
			setBookReturnTime() {
				this.returnBookTime = uni.$u.timeFormat(this.getBookReturnTime(), 'yyyy-mm-dd')
			}
		}


	}
</script>

<style lang="scss">
	.bookInfoContent {
		padding: 20rpx;

		text {
			font-size: 38rpx;
		}

		.label {
			font-size: 34rpx;
		}

		.borrowInfoBox {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.item {
				width: 100%;
				text-align: center;
			}
		}
	}
</style>