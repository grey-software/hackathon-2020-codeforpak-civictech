export const state = () => ({
  rtl: false,
  phone: "",
  cnic: ""
});

export const mutations = {
  setRtl(state, payload) {
    state.rtl = payload.rtl;
  },
  setPhone(state, payload) {
    state.phone = payload.phone;
  },
  setCnic(state, payload) {
    state.cnic = payload.cnic;
  },
};

export const actions = {};
