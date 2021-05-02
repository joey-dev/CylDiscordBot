module.exports.getHeaderInfo = (serverId, services) => {
    const getHeaderInfo = require("./getHeaderInfo");
    return getHeaderInfo.run(serverId, services);
}

module.exports.get = (serverId, url, callback, services) => {
    const get = require("./get");
    get.run(serverId, url, callback, services);
}

module.exports.post = (serverId, url, callback, services, body) => {
    const post = require("./post");
    post.run(serverId, url, callback, services, body);
}

module.exports.put = (serverId, url, callback, services, body) => {
    const put = require("./put");
    put.run(serverId, url, callback, services, body);
}

module.exports.patch = (serverId, url, callback, services, body) => {
    const patch = require("./patch");
    patch.run(serverId, url, callback, services, body);
}

module.exports.delete = (serverId, url, callback, services, body) => {
    const deleteMethod = require("./delete");
    deleteMethod.run(serverId, url, callback, services, body);
}
