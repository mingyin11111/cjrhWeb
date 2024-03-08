import lm from '@/components/CustomComponets/LeftMenu.vue'
const leftmenu={};
leftmenu.install=function(Vue) {
  Vue.component('LeftMenu',lm);
}
export default leftmenu;