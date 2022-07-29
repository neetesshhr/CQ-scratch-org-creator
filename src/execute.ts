import * as vscode from 'vscode';

export function executes(){

const jenkins = require('jenkins')({baseUrl: 'https://user:pass@ci-cd.compliancequest.com', crumb: true});
 jenkins.job.build({ name: 'CQ_N_ORGs_Creator', parameters: {"sqxBranchName": "development/12.0.0",
                                                             "numberOfOrgs": "1", "uiBranchName": "12.0.0", 
                                                             "durationOfOrg":"21",
                                                             "devHubUsername": "example@devhub.cq.com"},
                    token: "cqsqx123"},
 function(err:any, data:any){
    if(err){
        console.log("Error", err);
    }else{
        console.log("Triggered", data);
    }
 }
 );

}


