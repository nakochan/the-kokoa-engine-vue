const dotenv        = require('dotenv')
const axios         = require('axios')
const qs            = require('qs')


dotenv.config()
/* 
   로컬 테스트키 
   프론트 6Lei67wUAAAAAO4tRQNrHteMLSWMjZFE0LoCEcia
   백엔드 6Lei67wUAAAAACpmWy5hP9kcEql65sG8wSq_oC2G
*/
const { RECAPTCHA_KEY } = process.env


  const auth = async (token, ip) => {
    const Token = token
    const url = 'https://www.google.com/recaptcha/api/siteverify'
    const opt = {
        secret: RECAPTCHA_KEY,
        response: Token,
        remoteip: ip
      }
    try{
        const res = await axios.post(url, qs.stringify(opt))
        console.log(res.data)
        return res.data
      } catch(e) {
        return e
     }
   }
     

   module.exports.authRecaptcha = async (token, ip) => { 
     try{
    const res = await auth(token, ip) 
    if(!res.success || res.score < 0.9) return false
    else return true
  } catch (e) {
    throw e
  }
}