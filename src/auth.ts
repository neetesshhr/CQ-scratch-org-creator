import { rejects } from 'assert';
import { resolve } from 'path';
import * as vscode from 'vscode';
import * as data from "./json/awt.json";
const {exec} = require("child_process");
const path = require('path');
const os = require('os');
const fs = require('fs');
export async function sfdxorgcreator() {
  
  // parameters: {"sqxBranchName": "development/12.0.0", "numberOfOrgs": "1", "uiBranchName": "12.0.0", "durationOfOrg":"21", "devHubUsername": "example@devhub.cq.com"}, token: "cqsqx123"},

  //--------------------------------------------------------------
    let username:any;
    let password:any;
    let sqxbranch:any;
    let noooforgs:any;
    let uibranch:any;
    let timeoforg:any;
    let devhubuname:any;
    // let imageTag:any;
    let jsonafterData:any;
    let jsonbeforeData:any;
    let sfUsernamejson:any;
    let sfPasswordsjson:any;
    let sfsqxBranchNamejson:any;
    let sfnumberOfOrgsjson:any;
    let sfuiBranchNamejson:any;
    let sfdurationOfOrgjson:any;
    let sfdevHubUsernamejson:any;
    let sfjobtokenjson:any;
    let sfjobNamejson:any;
    let sfEnvironmentjson:any;
    let afterdata:any;
    let beforedata:any;
    let credentials:any;
    let jobName = "CQ_N_ORGs_Creator";
    let jobToken = "cqsqx123";

       let dirPath:any;
       if (fs.existsSync(`${__dirname}/cqconfig`)) {
        console.log("dir exist");
         dirPath = `${__dirname}/cqconfig`;
          beforedata =  fs.readFileSync(`${dirPath}/cq.json`, {encoding:'utf8', flag:'r'});
          console.log(beforedata);
          jsonbeforeData = JSON.parse(beforedata);

          let build:any = [{
            label:"Build With Params",
            description:"Build With Params",
          },
          {
            label:"Normal Buid",
            description:"Normal Buid",
          }];
          const buildType:string | any =  await vscode.window.showQuickPick(
            build,
            {
                matchOnDetail:true, 
          },
          );
          console.log(buildType);
          if(buildType.label === "Build With Params" ){      
              let values:any = [{
                label:"Use Old Credentials",
                description:"Use Old Credentials",
              },
              {
                label:"Use New Credentials",
                description:"Use New Credentials",
              }];
               credentials = await  vscode.window.showQuickPick(
                values,
                {
                    matchOnDetail:true, 
              },
              );
              console.log(credentials);
              if(credentials.label === "Use Old Credentials" ){
                username =jsonbeforeData.sfUsername;
                password =jsonbeforeData.sfPassword;
               
           }else{
             username = await vscode.window.showInputBox({
              prompt:'Enter Your UserName',
              placeHolder: 'Please!! Enter Your username',   
              validateInput: (input: string): string | undefined=> {
                  if (input.trim().length === 0) {
                      return 'Enter Your username';
                  }
              }         
                       });
      //password (auth-token) ---------------------------------------------
            password = await vscode.window.showInputBox({
              placeHolder: 'Please!! Enter Your password',
              prompt:'Enter Your Password',
              validateInput: (input: string): string | undefined=> {
                  if (input.trim().length === 0) {
                      return 'Enter Your Password';
                  }
              }
                       });

           }
           
    //jenkins job name
          
          sqxbranch = await vscode.window.showInputBox({
            prompt:'SQX Branch Name',
            placeHolder: 'SQX Branch Name',
            validateInput: (text: string): string | undefined => {
              if (!text ) {
                  return 'Enter your SQX Branch Name';
              } else {
                  return undefined;
              }
          }
           });
    
            noooforgs = await vscode.window.showInputBox({
              prompt: 'Enter Number of Orgs you want to create',
              placeHolder: 'Number of Orgs',
              validateInput: (text: string): string | undefined => {
                  if (!text ) {
                      return 'Enter Number of Orgs you want to create';
                  } else {
                      return undefined;
                  }
              }            
            });
            uibranch = await vscode.window.showInputBox({
               prompt: 'Enter UI Branch Name',
                placeHolder: 'UI Branch Name',
                validateInput: (text: string): string | undefined => {
                    if (!text ) {
                        return 'Enter UI Branch Name';
                    } else {
                        return undefined;
                    }
                }
            });
            timeoforg = await vscode.window.showInputBox({
              prompt: 'Enter Duration time for Org in days',
              placeHolder: 'Duration time for Org in days',
              validateInput: (text: string): string | undefined => {
                  if (!text ) {
                      return 'Enter Duration time for Org in days';
                  } else {
                      return undefined;
                  }
              }
            });
            devhubuname = await vscode.window.showInputBox({
              prompt: 'Enter DevHub Username',
              placeHolder: 'DevHub Username',
              validateInput: (text: string): string | undefined => {
                  if (!text ) {
                      return 'Enter DevHub Username';
                  } else {
                      return undefined;
                  }
              }
            });
    
                      
                const newData = {
                sfUsername: username,
                sfPassword:password,
           
                sfsqxBranchName:sqxbranch,
                sfnumberOfOrgs:noooforgs,
                sfuiBranchName:uibranch,
                sfdurationOfOrg:timeoforg,
                sfdevHubUsername:devhubuname, 
            } ;
            const stringify = JSON.stringify(newData);
        
          //  write new data to .json file; ---------------------------------------        
            await fs.writeFile(`${dirPath}/cq.json`, stringify, (err: any) => {
                // error checking
                if(err) {throw err;};        
            });
            setTimeout(function(){
              console.log(dirPath);
              console.log('timeout function');
             afterdata =  fs.readFileSync(`${dirPath}/cq.json`, {encoding:'utf8', flag:'r'});
             console.log(afterdata);
             jsonafterData = JSON.parse(afterdata);
             console.log(jsonafterData);
             //Get data from json file ------------------------------------
             sfUsernamejson = jsonafterData.sfUsername;
             sfPasswordsjson = jsonafterData.sfPassword;
            
             sfsqxBranchNamejson = jsonafterData.sfsqxBranchName;
             sfnumberOfOrgsjson = jsonafterData.sfnumberOfOrgs;
             sfuiBranchNamejson = jsonafterData.sfuiBranchName;
             sfdurationOfOrgjson = jsonafterData.sfdurationOfOrg;
             sfdevHubUsernamejson = jsonafterData.sfdevHubUsername;
             setTimeout(function () { jenkinsbuild(sfUsernamejson,  sfPasswordsjson, sfsqxBranchNamejson, sfnumberOfOrgsjson, sfuiBranchNamejson, sfdurationOfOrgjson, sfdevHubUsernamejson); }, 1000);
            }, 2000);
        
            function jenkinsbuild(sfUsernamejson:any, sfPasswordsjson:any, sfsqxBranchNamejson:any, sfnumberOfOrgsjson:any, sfuiBranchNamejson:any, sfdurationOfOrgjson:any, sfdevHubUsernamejson:any){
              var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
    
    
                jenkins.job.build({ name: `${jobName}` , token: `${jobToken}`,parameters:  { "sqxBranchName":`${sfsqxBranchNamejson}`,"numberOfOrgs":`${sfnumberOfOrgsjson}`,"uiBranchName":`${sfuiBranchNamejson}`, "durationOfOrg": `${sfdurationOfOrgjson}`, "devHubUsername": `${sfdevHubUsernamejson}`}}, function(err:any) {
                  if (err) {
                    vscode.window.showErrorMessage(`Jenkins Job ${jobName} Has Failed : Try Again Or Check The Parameter;`);
                  }else{              vscode.window.showInformationMessage(`Jenkins Job ${jobName} Has Triggered Succesfully`);
                }
                });           
                        //specifying particular job name and its token
                        }
          }else{


            let values:any = [{
              label:"Use Old Credentials",
              description:"Use Old Credentials",
            },
            {
              label:"Use New Credentials",
              description:"Use New Credentials",
            }];
            let credentials:string | any = await vscode.window.showQuickPick(
              values,
              {
                  matchOnDetail:true, 
            },
            );
            console.log(credentials);
            if(credentials.label === "Use Old Credentials" ){
              username =jsonbeforeData.sfUsername;
              password =jsonbeforeData.sfPassword;
             
         }else{
           username = await vscode.window.showInputBox({
            prompt:'Enter Your UserName',
            placeHolder: 'Please!! Enter Your username',   
            validateInput: (input: string): string | undefined=> {
                if (input.trim().length === 0) {
                    return 'Enter Your username';
                }
            }         
                     });
    //password (auth-token) ---------------------------------------------
          password = await vscode.window.showInputBox({
            placeHolder: 'Please!! Enter Your password',
            prompt:'Enter Your Password',
            validateInput: (input: string): string | undefined=> {
                if (input.trim().length === 0) {
                    return 'Enter Your Password';
                }
            }
                     });

         }
       
  //jenkins job name
     



                   const newData = {
                    sfUsername: username,
                    sfPassword:password
                   
                } ;
                const stringify = JSON.stringify(newData);
            
              //  write new data to .json file; ---------------------------------------        
                await fs.writeFile(`${dirPath}/cq.json`, stringify, (err: any) => {
                    // error checking
                    if(err) {throw err;};        
                });
        
                setTimeout(function(){
                 
                 afterdata =  fs.readFileSync(`${dirPath}/cq.json`, {encoding:'utf8', flag:'r'});
                 console.log(afterdata);
                 jsonafterData = JSON.parse(afterdata);
                 //Get data from json file ------------------------------------
                 sfUsernamejson = jsonafterData.sfUsername;
                 sfPasswordsjson = jsonafterData.sfPassword;
        
        
        
                 setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,); }, 1000);
                },2000);
                //building jenkins job using jenkins api i.e npm -i jenkins
                  function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:any){
        
                  var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
                  jenkins.job.build({ name: `${jobName}` , token: `${jobToken}`}, function(err:any) {
                    if (err) {
                      vscode.window.showErrorMessage(`Jenkins Job CQ scracth org creator Has Failed : Try Again Or Check The Parameter;`);
                    }else{            vscode.window.showInformationMessage(`Jenkins Job ${jobName} Has Triggered Succesfully`);
                  }
                  });           
                          } 
          }
    } else {
      console.log("dir doesnot exist");
       dirPath = path.join(__dirname, '/cqconfig');
      fs.mkdirSync(dirPath);
      let build:any = [{
        label:"Build With Params",
        description:"Build With Params",
      },
      {
        label:"Normal Buid",
        description:"Normal Buid",
      }];
      const buildType:string | any = await vscode.window.showQuickPick(
        build,
        {
            matchOnDetail:true, 
      },
      );
      console.log(buildType);
      //if Build with params 
      if(buildType.label === "Build With Params" ){      

        username = await vscode.window.showInputBox({
          prompt:'Enter Your UserName',
          placeHolder: 'Please!! Enter Your username',   
          validateInput: (input: string): string | undefined=> {
              if (input.trim().length === 0) {
                  return 'Enter Your username';
              }
          }         
                   });
  //password (auth-token) ---------------------------------------------
        password = await vscode.window.showInputBox({
          placeHolder: 'Please!! Enter Your password',
          prompt:'Enter Your Password',
          validateInput: (input: string): string | undefined=> {
              if (input.trim().length === 0) {
                  return 'Enter Your Password';
              }
          }
                   });


                
                  sqxbranch = await vscode.window.showInputBox({
                    prompt:'SQX Branch Name',
                    placeHolder: 'Enter your sqx branch name',
                    validateInput: (text: string): string | undefined => {
                      if (!text ) {
                          return 'Enter your SQX branch name';
                      } else {
                          return undefined;
                      }
                  }
                             });
                             
            
                             noooforgs = await vscode.window.showInputBox({
                              prompt: 'Enter Number of Orgs you want to create',
                              placeHolder: 'Number of Orgs',
                              validateInput: (text: string): string | undefined => {
                                  if (!text ) {
                                      return 'Enter Number of Orgs you want to create';
                                  } else {
                                      return undefined;
                                  }
                              }            
                            });
                            uibranch = await vscode.window.showInputBox({
                               prompt: 'Enter UI Branch Name',
                                placeHolder: 'UI Branch Name',
                                validateInput: (text: string): string | undefined => {
                                    if (!text ) {
                                        return 'Enter UI Branch Name';
                                    } else {
                                        return undefined;
                                    }
                                }
                            });
                            timeoforg = await vscode.window.showInputBox({
                              prompt: 'Enter Duration time for Org in days',
                              placeHolder: 'Duration time for Org in days',
                              validateInput: (text: string): string | undefined => {
                                  if (!text ) {
                                      return 'Enter Duration time for Org in days';
                                  } else {
                                      return undefined;
                                  }
                              }
                            });
                            devhubuname = await vscode.window.showInputBox({
                              prompt: 'Enter DevHub Username',
                              placeHolder: 'DevHub Username',
                              validateInput: (text: string): string | undefined => {
                                  if (!text ) {
                                      return 'Enter DevHub Username';
                                  } else {
                                      return undefined;
                                  }
                              }
                            });
            
                              
                        const newData = {
                        sfUsername: username,
                        sfPassword:password,
                       sfsqxBranchNamejson:sqxbranch,
                        sfnooforgsjson:noooforgs,
                        sfuiBranchNamejson:uibranch,
                        sfTimeoforgjson:timeoforg,
                        sfDevhubunamejson:devhubuname,
                    } ;
                    const stringify = JSON.stringify(newData);
                
                  //  write new data to .json file; ---------------------------------------        
                    await fs.writeFile(`${dirPath}/cq.json`, stringify, (err: any) => {
                        // error checking
                        if(err) {throw err;};        
                    });
                    setTimeout(function(){
                      console.log(dirPath);
                      console.log('timeout function');
                     afterdata =  fs.readFileSync(`${dirPath}/cq.json`, {encoding:'utf8', flag:'r'});
                     console.log(afterdata);
                     jsonafterData = JSON.parse(afterdata);
                     console.log(jsonafterData);
                     //Get data from json file ------------------------------------
                     sfUsernamejson = jsonafterData.sfUsername;
                     sfPasswordsjson = jsonafterData.sfPassword;
                     sfsqxBranchNamejson = jsonafterData.sfsqxBranchName;
                     sfnumberOfOrgsjson = jsonafterData.sfnumberOfOrgs;
                     sfdurationOfOrgjson = jsonafterData.sfdurationOfOrg;
                      sfuiBranchNamejson = jsonafterData.sfuiBranchName;
                      sfdevHubUsernamejson = jsonafterData.sfdevHubUsername;
                    setTimeout(function () { jenkinsbuild(sfUsernamejson, sfPasswordsjson, sfsqxBranchNamejson, sfnumberOfOrgsjson, sfdurationOfOrgjson, sfuiBranchNamejson, sfdevHubUsernamejson); }, 1000);
                    }, 2000);
                
                    function jenkinsbuild(sfUsernamejson:any, sfPasswordsjson:any,  sfsqxBranchNamejson: any, sfnumberOfOrgsjson:any, sfdurationOfOrg:any, sfuiBranchNamejson:any, sfdevHubUsernamejson:any){
                      var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
            
            
                        jenkins.job.build({ name: `${jobName}` , token: `${jobToken}`,parameters:  { "sqxBranchName":`${sfsqxBranchNamejson}`,"numberOfOrgs":`${sfnumberOfOrgsjson}`,"uiBranchName":`${sfuiBranchNamejson}`,"durationOfOrg": `${sfdurationOfOrgjson}`, "devHubUsername": `${sfdevHubUsernamejson}`}}, function(err:any) {
                          if (err) {
                            vscode.window.showErrorMessage(`Jenkins Job ${jobName} Has Failed : Try Again Or Check The Parameter;`);
                          }else{              vscode.window.showInformationMessage(`Jenkins Job ${jobName} Has Triggered Succesfully`);
                        }
                        });           
                                //specifying particular job name and its token
                                }
                  
                  
                  
                  }else{
                    username = await vscode.window.showInputBox({
                      prompt:'Enter Your UserName',
                      placeHolder: 'Please!! Enter Your username',   
                      validateInput: (input: string): string | undefined=> {
                          if (input.trim().length === 0) {
                              return 'Enter Your username';
                          }
                      }         
                               });
              //password (auth-token) ---------------------------------------------
                    password = await vscode.window.showInputBox({
                      placeHolder: 'Please!! Enter Your password',
                      prompt:'Enter Your Password',
                      validateInput: (input: string): string | undefined=> {
                          if (input.trim().length === 0) {
                              return 'Enter Your Password';
                          }
                      }
                               });
                 
            
            
            
                               const newData = {
                                sfUsername: username,
                                sfPassword:password,
                                sfjobName:jobName,
                                sfjobToken:jobToken,
                            } ;
                            const stringify = JSON.stringify(newData);
                        
                          //  write new data to .json file; ---------------------------------------        
                            await fs.writeFile(`${dirPath}/cq.json`, stringify, (err: any) => {
                                // error checking
                                if(err) {throw err;};        
                            });
                    
                            setTimeout(function(){
                             
                             afterdata =  fs.readFileSync(`${dirPath}/cq.json`, {encoding:'utf8', flag:'r'});
                             console.log(afterdata);
                             jsonafterData = JSON.parse(afterdata);
                             //Get data from json file ------------------------------------
                             sfUsernamejson = jsonafterData.sfUsername;
                             sfPasswordsjson = jsonafterData.sfPassword;
                          
                    
                    
                             setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson); }, 1000);
                            },2000);
                            //building jenkins job using jenkins api i.e npm -i jenkins
                    
                            function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:any){
                    
                              var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
                              jenkins.job.build({ name: `${jobName}` , token: `${jobToken}`}, function(err:any) {
                                if (err) {
                                  vscode.window.showErrorMessage(`Jenkins Job ${jobName} Has Failed : Try Again Or Check The Parameter;`);
                                }else{            vscode.window.showInformationMessage(`Jenkins Job ${jobName} Has Triggered Succesfully`);
                              }
                              });           
                                      } 
                  }

      
    }  
      }
//---------------------------------------------------------------------------------
//--------------------------End------------------------------------














//----------------------------End------------------------------------
    
        
