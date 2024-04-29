import { valueAxis } from 'echarts/lib/theme/dark';
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
 
    state: {
      // 存储token
      Token: localStorage.getItem('Token') ? localStorage.getItem('Token') : '',
      VuexStore:localStorage.getItem('VuexStore') ? localStorage.getItem('VuexStore') : '',
      MemberName:localStorage.getItem('MemberName') ? localStorage.getItem('MemberName') : '',
      UnitName:localStorage.getItem('UnitName') ? localStorage.getItem('UnitName') : '',
      UserType:localStorage.getItem('UserType') ? localStorage.getItem('UserType') : '',
      MemberID:localStorage.getItem('MemberID') ? localStorage.getItem('MemberID') : '',
    
    },
   
    mutations: {
      // 修改token，并将token存入localStorage
      changeToken(state, token) {
        state.Token = token;
        localStorage.setItem('Token',  token );
      },
      changeVuexStore(state, v)
      {state.VuexStore = v;
        localStorage.setItem('VuexStore', JSON.stringify(v) );
      },
      changeMemberName(state, v) {
        state.MemberName = v;
        localStorage.setItem('MemberName', v) ;
      },
      changeUnitName(state, v) {
        state.UnitName = v;
        localStorage.setItem('UnitName', v) ;
      },
      changeUserType(state, v) {
        state.UserType = v;
        localStorage.setItem('UserType', v) ;
      },
      changeMemberID(state, v) {
        state.MemberID = v;
        localStorage.setItem('MemberID', v) ;
      },
    }
  });
 
  export default store;