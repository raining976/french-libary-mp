<template>
	<view class="index">
		<u-sticky bgColor="#fff">
			<u-tabs :list="Categories" @click="changeCategory"></u-tabs>
		</u-sticky>
		<u-skeleton :loading="isLoading" :animate="true" rows="15" rowsHeight="30">
			<view class="content">
				<view class="searchBox">
					<u-search placeholder="输入书名,作者搜索" v-model="keyword" :showAction="false" :clearabled="true"
						height="80rpx" margin="10rpx" @search="search(keyword)"></u-search>
				</view>
				<view class="u-page" v-if='bookList.length != 0'>
					<u-list @scrolltolower="scrolltolower" height='1150rpx' :showScrollbar='true'>
						<u-list-item class="bookBox" v-for="(book, index) in bookList" :key="index">
							<u-cell size="large" :title="book.BName" :value="'x'+book.BCount"
								:label="'作者：' + book.Author" @click="goBookInfo(book)"></u-cell>
						</u-list-item>
					</u-list>
				</view>
				<u-empty marginTop="30" :show='bookList.length == 0' mode="search"
					icon="http://cdn.uviewui.com/uview/empty/search.png" width="250" height="250">
				</u-empty>
			</view>
		</u-skeleton>
		<u-toast ref="uToast"></u-toast>
		<tab-bar :current='0'></tab-bar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				keyword: "",
				oldKeyword: "",
				bookList: [],
				isLoading: true,
				tabbarIndex: 0,
				oleCategory: "",
				curCategory: "",
				Categories: [{
					name: '全部',
				}, {
					name: '中文教辅',
				}, {
					name: '法文教辅'
				}, {
					name: '中文文史哲'
				}, {
					name: '法语文史哲'
				}, {
					name: '字典'
				}, {
					name: '英语书籍'
				}, {
					name: '杂项书籍'
				}, {
					name: '中法对照读物'
				}]
			}
		},
		watch: {
			curCategory(newV, oldV) {
				if (oldV != newV) {
					this.bookList = []
					this.search(this.keyword)
				}
			},
		},
		onLoad() {

			this.init()
		},

		methods: {
			async updateUserInfo() {
				const _id = this.$auth.getLocalUserInfo()._id
				const _this = this
				await this.$api.getUserInfoById(_id).then(res => {
					_this.$auth.updateTokenStorage(res.data)
				})
			},
			init() {
				this.bookList = []
				this.keyword = ""
				this.search(this.keyword)
				this.updateUserInfo()
			},

			search(keyword, isLoadMore = false) {
				this.changeKeyword(keyword)
				if (!isLoadMore) this.isLoading = true
				this.$api.searchBooks(keyword, this.curCategory, this.bookList.length).then(res => {
					this.bookList = [...this.bookList, ...res.data]
					console.log(this.bookList)
					this.isLoading = false
				})
			},

			// 检测 关键字 或者 分类发生变化 并清空 booklist
			changeKeyword(keyword) {
				if (keyword != this.oldKeyword) {
					this.oldKeyword = keyword
					this.bookList = []
				}
			},

			// 下滑到底部触发
			scrolltolower() {
				this.loadmore()
			},

			// 加载更多
			loadmore() {
				this.search(this.keyword, true)
			},

			// 前往图书详情页
			goBookInfo(book) {
				if (book.BCount == 0) {
					this.emptyTip()
					return
				}
				const _id = book._id
				uni.navigateTo({
					url: "/pages/bookInfo/bookInfo?_id=" + _id
				})
			},

			// 数量为空的提示
			emptyTip() {
				this.$refs.uToast.show({
					type: "default",
					message: "这本书已经被借完了哦～"
				})
			},

			changeCategory(item) {
				this.curCategory = item.index == 0 ? "" : item.name
			},


			// handleInput(value) {
			// 	const regex = /^[\u4e00-\u9fa5a-zA-Z0-9\u00C0-\u017F]*$/; // 使用正则表达式限制输入特殊字符，允许输入中文、英文、数字和法语

			// 	if (!regex.test(value)) {
			// 		// 如果输入的值包含特殊字符，则进行处理
			// 		const sanitizedValue = value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\u00C0-\u017F]/g, ''); // 过滤掉特殊字符
			// 		this.keyword = sanitizedValue; // 更新输入框的值
			// 	}
			// }

		},
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100%;

		.searchBox {
			position: fixed;
			width: 100%;
			background-color: #fff;
			z-index: 999;
		}

		.u-page {
			margin-top: 100rpx;
		}
	}

	.bookBox {
		height: 100rpx;
	}
</style>