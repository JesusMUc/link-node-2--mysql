const {format} = require('timeago.js');
const helpers={

};
//este nos da el tiempo trancurrido desde que se suvio exmaple 13 ago later
helpers.timeago = (timestamp)=>{
    return format(timestamp);
};
module.exports = helpers;
