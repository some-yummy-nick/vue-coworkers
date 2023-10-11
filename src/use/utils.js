export function prepareSearch(q) {
    const qToArray = q.split(",")
    const ids = []
    const names = []

    let query = ''

    qToArray.forEach(item => {
        if (+item) {
            ids.push(item.trim())
        } else {
            names.push(item.trim())
        }
    })

    names.forEach(item => {
        if (!item.length) {
            return false
        }
        if (!query.length) {
            query += '?username=' + item
        } else {
            query += '&username=' + item
        }
    })

    ids.forEach(item => {
        if (!item.length) {
            return false
        }
        if (!query.length) {
            query += '?id=' + item
        } else {
            query += '&id=' + item
        }
    })

    return query
}