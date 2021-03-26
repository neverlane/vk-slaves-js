
// vk slaves js
// author ronnyevans
// version 1.0

const axios = require("axios")

class Slaves {

    constructor(token) {
        // check token
        if(!token) {
            throw new Error(`"token" is missed`)
        }
        this.token = token
    }

    async call(method, params = {}) {
        
        // check bearer
        if(!this.bearer) {
            const barres = await axios.get("https://api.vk.com/method/apps.get", {
                params: {
                    app_id: 7794757,
                    platform: "ios",
                    v: "5.130",
                    access_token: this.token
                }
            })
            if(!barres.data.response || !barres.data.response.items || !barres.data.response.items[0] || !barres.data.response.items[0].webview_url) throw new Error("invalid response");
            const args = barres.data.response.items[0].webview_url.match(/index\.html\?(.*)/mi)[1]
            if(typeof args != "string") throw new Error("cant parse bearer");
            this.bearer = args
        }

        let req_method = params && params.body ? "POST" : "GET";
        console.log(params.body,req_method)
        
        const res = await axios({
            method: req_method,
            url: `https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/${method}`,
            data: params && params.body ? params.body : {},
            params: params && params.params ? params.params : {},
            headers: {
                "authorization": `Bearer ${this.bearer}`,
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
            },
            validateStatus: s => s != 0,
        })
        return res.data
    }

    // start
    // args: {ref:int}
    async start(args) {
        return await this.call("start", {
            params: args
        })
    }

    // user
    // args: {id:int}
    async user(args) {
        return await this.call("user", {
            params: args
        })
    }

    // slave_list
    // args: {id:int}
    async slave_list(args) {
        return await this.call("slaveList", {
            params: args
        })
    }

    // top_users
    // args: none
    async top_users() {
        return await this.call("topUsers")
    }

    // sale slave
    // args: {slave_id:int}
    async sale_slave(args) {
        return await this.call("saleSlave", {
            body: args
        })
    }
    
    // buy slave
    // args: {slave_id:int}
    async buy_slave(args) {
        return await this.call("buySlave", {
            body: args
        })
    }
    
    // job slave
    // args: {slave_id:int, job_name:string}
    async job_slave(args) {
        return await this.call("jobSlave", {
            body: args
        })
    }

    // buy Fetter
    // args: {slave_id:int}
    async buy_fetter(args) {
        return await this.call("buyFetter", {
            body: args
        })
    }


};

module.exports = Slaves;
