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
						<u-button type="primary" text="我要借阅" :disabled="book.BCount == 0"></u-button>
					</view>
				</view>
			</view>
		</u-skeleton>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isLoading: true,
				book: {}
			};
		},
		onLoad(option) {
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
	}
</style>