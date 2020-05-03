const debug = require('debug');

const debugLog = debug('users:apiKeyGen');

module.exports = {
    getApiKey() {
        let apiKey = Math.ceil(Math.random() * 10000);
        debugLog("Api key generated is %s", apiKey);
        return apiKey;
    }
}