<template>
	<view>
		<u-tabbar v-model='current' :safeAreaInsetBottom="true" :fixed="true" :placeholder="true" @change="changeBar">
			<u-tabbar-item :text="tab.text" :icon="tab.iconPath" v-for="(tab, index) in tabList"
				:key="index"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name: "tabBar",
		props:{
			current:Number
		},
		data() {
			return {
				tabList: [{
						"text": "图书",
						"iconPath": "home",
						"pagePath": "pages/index/index"
					},
					{
						"text": "帮助",
						"iconPath": "question-circle",
						"pagePath": "pages/help/help"
					},
					{
						"text": "我的",
						"iconPath": "account",
						"pagePath": "pages/user/user"
					}
				],
			};
		},
		methods: {
			changeBar(e) {
				uni.switchTab({
					url: '/' + this.tabList[e].pagePath
				})
			}
		}

	}
</script>

<style>

</style>