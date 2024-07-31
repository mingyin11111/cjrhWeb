 <template>
    <div class="tinymce-editor">
      <editor
        v-model="myValue"
        :init="init"
        :disabled="disabled"
        
      ></editor>
    </div>
  </template>
  <script>
  import tinymce from "tinymce";
  import Editor from "@tinymce/tinymce-vue";
  import "tinymce/themes/silver";
  import "tinymce/plugins/paste";
  import "tinymce/plugins/image";
  import "tinymce/plugins/link";
  import "tinymce/plugins/code";
  import "tinymce/plugins/table";
  import "tinymce/plugins/lists";
  import "tinymce/plugins/wordcount";
  //import './tinymce.min.js'
  import './langs/zh_CN.js';
  import './icons/default/icons.min.js';
  import './plugins/wordcount/plugin.min.js'
  export default {
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default:
          "link lists image code table wordcounts"
      },
      toolbar: {
        type: [String, Array],
        default:
          "bold italic underline strikethrough | fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat"
      }
    },
    data() {
      return {
        init: {
          language_url: "/static/TinymceEditor/plugins/tinymce/zh_CN.js", //如果语言包不存在，指定一个语言包路径
          language: "zh_CN", //语言
          skin_url: "/static/TinymceEditor/skins/ui/oxide", //如果主题不存在，指定一个主题路径
          content_css: "/static/TinymceEditor/plugins/tinymce/mycontent.css",
          height: "700px",
          width: "100%",
          plugins: this.plugins, //插件
          toolbar: this.toolbar, //工具栏
          branding: false,  
          menubar: true, //菜单栏
          theme: "silver", //主题
          zIndex: 1101,
        },
        myValue: this.value
      };
    },
    mounted() {
      tinymce.init({
        language:'zh_CN',
      });
    },
    methods: {
      calcWidth() {
        return document.body.clientWidth / 2 + "px";
      },
    },
    watch: {
      value(newValue) {
        this.myValue = newValue;
      },
      myValue(newValue) {
        this.$emit("input", newValue);
      }
    }
  };
  </script>
 