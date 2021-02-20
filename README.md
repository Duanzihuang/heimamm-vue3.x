# heimamm-vue3.x

## Vue2.x 与 Vue3.x 不一样的地方

### watch

vue2.x

```vue
<script>
export default {
	data() {
      return {
          dialogVisible: false
      }  
    },
    watch: {
        dialogVisible (newValue) {
            if (!newValue) {
                // 调用表单的清空方法（把校验也清空）
                this.$refs.form.resetFields()

                // 清空预览的图片
                this.imageUrl = ''
            }
        }
    }
}
</script>
```

vue3.x

```vue
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        // 调用表单的清空方法（把校验也清空）
        this.$refs.form.resetFields()

        // 清空预览的图片
        this.imageUrl = ''
      }
    }
  }
})
export default class Register extends Vue {
    data () {
        return {
            dialogVisible: false
        }
    }
}
</script>
```

