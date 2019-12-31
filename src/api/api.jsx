const host = 'http://192.168.0.100';

const getAction = (url, callback) => {
    fetch(host + url).then(res => res.json())
        .then(data => {
            console.log("【api】", url, data)
            
            if (typeof callback === 'function') {
                callback(data);
            }
        }).catch(e => console.log(e));
};

const partitionList = (callback) => getAction('/mer/partition/list', callback);
const groupList = (callback) => getAction('/mer/group/list', callback);
const productList = (callback) => getAction('/mer/product/list', callback);
const templateList = (callback) => getAction('/mer/template/list', callback);

module.exports = {partitionList, groupList, productList, templateList};