export default function({ $axios, error }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(err => {
    const statusCode = parseInt(err.response && err.response.status)
    const message = parseInt(err.response && err.response.data.code)
    error({
      statusCode,
      message
    })
    // switch (code) {
    //   case 400:
    //     console.log('状态码：400 ━━(￣ー￣*|||━━')
    //     // redirect('/400')    // 这中方式需要 pages 文件夹中有 400.vue, 所以采用上面的方法
    //     break
  })
}
