import { createStore } from 'vuex'
import {coworkers} from "./coworkers";
import {worker} from "./worker";
import {overlay} from "./overlay";
import {search} from "./search";

export const store = createStore({
    modules: {
        coworkers,
        worker,
        overlay,
        search
    }
})