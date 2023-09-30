export const worker = {
    state: () => ({worker: null}),
    mutations: {
        setWorker(state, payload) {
            state.worker = payload
        }
    },
    actions: {
        setWorker({commit}, payload) {
            commit("setWorker", payload)
        }
    },
    getters: {
        worker: state => {
            return state.worker;
        }
    }
}