 <template>
<section id="tinymce-edutir"> sfsdf</section>
 </template>
 <script>
 
import './tinymce.min.js'
import './themes/silver/theme.min.js'
export default{
    mounted()
    {
        tinymce.init({
            selector:'#tinymce-edutir',
        })
    }
}
</script>
<style lang="less" scoped>
 @import url("./skins/ui/oxide/skin.min.css");
</style>