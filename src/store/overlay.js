export const overlay = {
    state: () => ({overlay: null}),
    mutations: {
        setOverlay(state, payload) {
            state.overlay = payload
        }
    },
    actions: {
        setOverlay({commit}, payload) {
            commit("setOverlay", payload)
        }
    },
    getters: {
        overlay: state => {
            return state.overlay;
        }
    }
}