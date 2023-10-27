
<script>
	export default {
		onLaunch: function() {
			// this.login()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			login(){
				uni.login({
					provider:"weixin",
					scopes:"auth_base",
					success:(res)=>{
						console.log(res)
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>