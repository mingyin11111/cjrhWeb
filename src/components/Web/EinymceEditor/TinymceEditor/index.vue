<template>
    <div class="tinymce-editor">
      <editor
        v-model="myValue"
        :init="init"
        :disabled="disabled"
        @onClick="onClick"
      ></editor>
    </div>
  </template>
  <script>
  import axios from "axios";
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
          language_url: "/static/plugins/tinymce/zh_CN.js", //如果语言包不存在，指定一个语言包路径
          language: "zh_CN", //语言
          skin_url: "/static/plugins/tinymce/skins/ui/oxide", //如果主题不存在，指定一个主题路径
          content_css: "/static/plugins/tinymce/mycontent.css",
          height: "700px",
          width: this.calcWidth(),
          plugins: this.plugins, //插件
          toolbar: this.toolbar, //工具栏
          branding: false, //技术支持(Powered by Tiny || 由Tiny驱动)
          menubar: true, //菜单栏
          theme: "silver", //主题
          zIndex: 1101,
        },
        myValue: this.value
      };
    },
    mounted() {
      tinymce.init({});
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
   