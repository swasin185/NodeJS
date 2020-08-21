const fs = require('fs')
// กำหนดค่าเซิฟเวอร์ https
// sudo apt install libnss3-tools
// sudo apt install linuxbrew-wrapper
// brew install mkcert
// /home/linuxbrew/.linuxbrew/bin$ ./mkcert -install
// กำหนด ip เซิฟเวอร์ให้ตรงกับ host ip 
module.exports = {
    devServer: {
      // open: process.platform === 'darwin',
      // port: 8001, 
      // host: 'localhost',
      // https: {
      //   key: fs.readFileSync('./certs/kh-server.keehin.com+5-key.pem'),
      //   cert: fs.readFileSync('./certs/kh-server.keehin.com+5.pem'),
      // },
      hotOnly: false,
    },
    publicPath: '' // เพื่อให้รันแบบ file protocol
  }