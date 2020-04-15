export default function({ $axios, error }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(err => {
    console.log('--- axios onError ---')
    const statusCode = parseInt(err.response && err.response.status)
    const message = parseInt(err.response && err.response.data.code)

    switch (statusCode) {
      case 400:
      case 404:
      case 500:
        error({ statusCode, message })
        break
    }
  })
}
