export const state = () => ({
  rtl: false,
});

export const mutations = {
  setRtl(state, payload) {
    state.rtl = payload.rtl;
  },
};

export const actions = {};
