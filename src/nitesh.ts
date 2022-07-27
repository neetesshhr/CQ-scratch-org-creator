
export async function nitesh() {  
    var jenkinsapi = require('jenkins-api');

var jenkins = jenkinsapi.init("http://jenkins.yoursite.com");
console.log(jenkins);
}