
export function useDebounce(cb, timeoutMs) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            if (typeof cb === 'function') {
                cb(...args)
            }
        }, timeoutMs)
    }
}