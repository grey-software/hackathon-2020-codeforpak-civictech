import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'citizen_pay_app_data',
  })(store)
}
