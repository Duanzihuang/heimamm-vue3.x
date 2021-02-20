import 'element-plus/lib/theme-chalk/index.css'
import {
  ElButton,
  ElCard,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElUpload,
  ElMessage,
  ElMessageBox,
  ElAside,
  ElHeader
} from 'element-plus'

const components = [
  ElButton,
  ElCard,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElAside,
  ElHeader,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElUpload
]

const plugins = [ElMessage, ElMessageBox]

export default (app: any) => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
