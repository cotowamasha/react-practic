export function withLogger(axios) {
    axios.interceptors.request.use((request) => {
        // console.log(
        //     `%c AXIOS [request] ${request.url}:`,
        //     "color: #008000; front-weight: bold",
        //     request
        // )
        return request 
    }, error => {
        // console.log(
        //     `%c AXIOS [request]`,
        //     "color: red; front-weight: bold",
        //     error
        // )
        return Promise.reject(error)
    })

    axios.interceptors.response.use((config) => {
        // console.log(
        //     `%c AXIOS [res-success] ${config.config.url}:`,
        //     "color: #008000; front-weight: bold",
        //     config
        // )
        return config 
    }, error => {
        // console.log(
        //     `%c AXIOS [res-error]`,
        //     "color: red; front-weight: bold",
        //     error
        // )
        return Promise.reject(error.response)
    })

    return axios
}