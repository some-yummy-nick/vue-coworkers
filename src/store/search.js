export const search = {
    state: () => ({search: null}),
    mutations: {
        setSearch(state, payload) {
            state.search = payload
        }
    },
    actions: {
        setSearch({commit}, payload) {
            commit("setSearch", payload)
        }
    },
    getters: {
        search: state => {
            return state.search;
        }
    }
}