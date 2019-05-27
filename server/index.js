//这是所有api.js导出的地方
const API = require('./myapi.js');
const WXAPI = require('./wxapi.js');
const RECOM = require('./recom.js');
const MODULE1 = require('./module1.js');
const CIRCLE = require('./circle.js');

module.exports = {
    myapi: new API(),
    wxapi: new WXAPI(),
    recom: new RECOM(),
    module1: new MODULE1(),
    circleFetch: new CIRCLE()
}
