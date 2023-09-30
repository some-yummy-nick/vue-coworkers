export async function request(url) {
    const response = await fetch(process.env.VUE_APP_BASE_API + url)
    return response.json()
}