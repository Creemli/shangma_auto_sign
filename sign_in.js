import axios from 'axios'
import { getHeaders } from './lib/http_util.js'
import getCookie from './cookies.js'

async function signIn() {
  const cookies = await getCookie()

  const tokenEntry = cookies.find(entry => entry['SHM_JWT_TOKEN'] !== undefined)
  if (tokenEntry === undefined) {
    throw Error('cannot get authorization')
  }

  let headers = getHeaders()
  headers.authorization = 'JwtUser '.concat(tokenEntry['SHM_JWT_TOKEN'])
  let data = JSON.stringify({
    //请求参数为：{}，经过AES算法加密之后就是: S1uAYaf/g6oBpv8DWUaQlQ==，在前端js代码中搜索encryptBody关键字
    "encryptedData":"dc5miVob6D+gz67VLLWV+g==",
    "encryptedKey":"GBjl2AIGe48yiuQL+pmVqAdD3qL6ltFbrabrU7biekYNLjqSCCh2ibvLMDkcWQFsaChA5bV85IQaxfch0EDQ76c/9Gr4HasHv5eBLVDoUavbyuOJk+PUpSBiLPeRuuwb3oy6KfZP0DfcAWW1j2mPaeZ0GtC2H6pZCv9JP7SVe7g="
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://apih5.shang-ma.com/app/web/user/checkin/1297116',
    headers: headers,
    data: data
  }

  const response = await axios.request(config)
  console.log(JSON.stringify(response.data))
  if (response.status !== 200) {
    throw Error('sign in return http status error:' + response.status)
  }
  if (response.data.code !== 0 && response.data.code !== 5001) {
    throw Error('sign in code error:' + response.data.code)
  }
}

export default signIn
