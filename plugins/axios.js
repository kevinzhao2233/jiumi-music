export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      case 400:
        console.log('状态码：400')
        redirect('/400')
        break
      case 401:
        console.log('状态码：401')
        redirect('/401')
        break
      case 404:
        console.log('状态码：404')
        redirect('/404')
        break
      case 500:
        console.log('状态码：500')
        redirect('/500')
        break
    }
  })
}
