export const coworkers = {
    state: () => ({coworkers: null}),
    mutations: {
        setCoworkers(state, payload) {
            state.coworkers = payload
        }
    },
    actions: {
        setCoworkers({commit}, payload) {
            commit("setCoworkers", payload)
        }
    },
    getters: {
        coworkers: state => {
            return state.coworkers;
        }
    }
}