import axios from 'axios'

class Session{
  //make sure there is only one instance
  static instance

  constructor(){
    //return existing instance or make new
    if(Session.instance){
      return Session.instance
    }
    this.axios = false
    this.url = false
    Session.instance = this
  }

  logIn(url, user, pass, func){
    this.url = url ? 'https://' + url + '.checkfront.com/' : null
    this.axios = require('axios').create({
      baseURL: this.url ? this.url + 'api/3.0/' : '',
      auth: {
        username: user ? user : '',
        password: pass ? pass : ''
      }
    })
    this.loggedIn(func)
  }

  logOut(){
    this.url = false
    this.axios = false
  }

  loggedIn(func){
    if(!this.axios){
      func(false)
      return
    }
    try{
      this.axios.get('ping').then(resp=>{
        func(resp.data.request.status === 'OK')
      }).catch(error=>{
        this.axios = false
        this.url = false
        console.log(error)
        func(false)
      })
    }catch(error){
      this.axios = false
      this.url = false
      func(false)
      console.log(error)
    }
  }
}

export default new Session()
