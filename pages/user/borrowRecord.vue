<template>
	<view>
		<u-tabs :list="tabList" @click="clickTab" :scrollable="false"></u-tabs>
		<u-skeleton :loading="isLoading" :animate="true" rows="15" rowsHeight="30">
			<view class="content" :show='borrowList.length != 0'>
				<u-cell-group>
					<u-cell :title="item.bookInfo.BName" v-for="(item, index) in borrowList" :key="index">
						<view slot="value" class="u-slot-title">
							<u-tag :text="tabList[item.status+1].name" plain size="mini" :type="typeList[item.status]">
							</u-tag>
						</view>
						<view slot="label" class="u-slot-title">
							<view class="author label-item">
								<u--text type="info" text="  作者:" size='12' class="key"></u--text><u--text type="info"
									:text="item.bookInfo.Author" size='12'></u--text>
							</view>
							<view class="borrowTime label-item">
								<u--text type="info" text="借书时间:" width="100" size='12' class="key"></u--text><u--text mode="date"
									:text="item.borrowTime" type='info' size='12'></u--text>
							</view>
							<view class="returnTime label-item">
								<u--text type="info" text="还书时间:" size='12' class="key"></u--text><u--text mode="date"
									:text="item.returnBookTime" :type="textTypeList[item.status]" size='12'></u--text>
							</view>
						</view>
					</u-cell>
				</u-cell-group>
			</view>
			<u-empty marginTop="30" :show='borrowList.length == 0' mode="list"
				icon="http://cdn.uviewui.com/uview/empty/list.png" width="250" height="250">
			</u-empty>
		</u-skeleton>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					name: "全部"
				}, {
					name: "未取"
				}, {
					name: "已借到"
				}, {
					name: "已归还"
				}, {
					name: "逾期"
				}],
				typeList: ["warning", "success", "info", "error"],
				textTypeList: ["info", "info", "info", "error"],
				borrowList: [],
				isLoading: true,
				curStatus: -1,
			};
		},
		onLoad() {
			this.getBorrowList()
		},
		watch: {
			curStatus(newVal, oldVal) {
				if (newVal != oldVal) {
					this.borrowList = []
					this.getBorrowList()
				}
			}
		},
		methods: {
			clickTab(item) {
				this.curStatus = item.index - 1
			},
			getBorrowList() {
				this.isLoading = true
				const user_id = this.$auth.getLocalUserInfo()._id
				this.$api.getBorrowList(user_id, this.curStatus).then(res => {
					this.borrowList = res.data
					this.isLoading = false
					console.log(res.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-tabs__wrapper__nav__item__tex {
		font-size: 20rpx !important;

	}

	.label-item {
		display: flex;

		.key-item:first-child {
			display: block !important;
			flex: none !important;
		}

		.u-text:last-child {
			flex: 2 !important;
		}
	}
</style>