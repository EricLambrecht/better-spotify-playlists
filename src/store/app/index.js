import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  error: null,
  openedModal: null,
  toastMessages: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
