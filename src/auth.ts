
import * as vscode from 'vscode';

const {exec} = require("child_process");
const path = require('path');
const os = require('os');
const fs = require('fs');
export async function sfdxorgcreator() {  
  //--------------------------------------------------------------
    let username:any;
    let password:any;
    let sqxbname:any;
    let nooforgs:any;
    let uibname:any;
    let timeoforg:any;
    let devhubuname:any;
    let jsonafterData:any;
    let jsonbeforeData:any;
    let jobName:any;
    let jobToken:any;

  
    let sfUsernamejson:any;
    let sfPasswordsjson:any;
    let sfSqxbnamejson:any;
    let sfNooforgsjson:any;
    let sfUibnamejson:any;
    let sfTimeoforgjson:any;
    let sfDevhubunamejson:any;
    let sfjobtokenjson:any;
    let sfjobNamejson:any;
    let afterdata:any;
    let beforedata:any;
    // let environ:any;
    let credentials:any;

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
                jobName = jsonbeforeData.sfjobName;
                jobToken = jsonbeforeData.sfjobToken;
                sqxbname = jsonbeforeData.sfSqxbname;               
               
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


                       jobName = await vscode.window.showInputBox({
                        prompt:'Enter Job Name',
                        placeHolder: 'Enter Job Name',
                        validateInput: (text: string): string | undefined => {
                            if (!text ) {
                                return 'Enter your jobname';
                            } else {
                                return undefined;
                            }
                        }
            
                                 });
                //jenkins job name
                      jobToken = await vscode.window.showInputBox({
                        prompt:'Enter Job token',
                        placeHolder: 'Enter Job token',
                        validateInput: (text: string): string | undefined => {
                            if (!text ) {
                                return 'Enter your jobtoken';
                            } else {
                                return undefined;
                            }
                        }
                      });
                      sqxbname = await vscode.window.showInputBox({
                        prompt:'Enter Your Sqx Branch name',
                        placeHolder: 'Enter Your Sqx Branch name',
                        validateInput: (text: string): string | undefined => {
                            if (!text ) {
                                return 'Enter your sqx branch name';
                            } else {
                                return undefined;
                            }
                        }
                      });

           }
    
         
          nooforgs = await vscode.window.showInputBox({
            prompt:'Enter Numbers of Orgs what you want to create',
            placeHolder: 'Enter Numbers of Orgs what you want to create',
            validateInput: (text: string): string | undefined => {
                if (!(text) || /[^0-9]/.test(text) ) {
                    return 'Enter Number of orgs';
                } else {
                    return undefined;
                }
            }
          });
          uibname = await vscode.window.showInputBox({
            prompt:'Enter Your Ui Branch name',
            placeHolder: 'Enter Your Ui Branch name',
            validateInput: (text: string): string | undefined => {
                if (!text ) {
                    return 'Enter your ui branch name';
                } else {
                    return undefined;
                }
            }
          });
          timeoforg = await vscode.window.showInputBox({
            prompt:'Enter Timeout for Org creation',
            placeHolder: 'Enter Timeout for Org creation',
            validateInput: (text: string): string | undefined => {
              if (!(text) || /[^0-9]/.test(text) ) {
                return 'Enter Timeout for Org creation';
                } else {
                    return undefined;
                }
            }
          });
          devhubuname = await vscode.window.showInputBox({
            prompt:'Enter Your Devhub Username',
            placeHolder: 'Enter Your Devhub Username',
            validateInput: (text: string): string | undefined => {
                if (!text ) {
                    return 'Enter your devhub username';
                } else {
                    return undefined;
                }
            }
          });
                const newData = {
                sfUsername: username,
                sfPassword:password,
                sfjobName:jobName,
                sfjobToken:jobToken,
                sfSqxbname:sqxbname,
                sfNooforgs:nooforgs,
                sfUibname:uibname,
                sfTimeoforg:timeoforg,
                sfDevhubuname:devhubuname,  
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
             sfjobNamejson = jsonafterData.sfjobName;
             sfjobtokenjson = jsonafterData.sfjobToken;
             sfSqxbnamejson = jsonafterData.sfSqxbname;
             sfNooforgsjson = jsonafterData.sfNooforgs;
             sfUibnamejson = jsonafterData.sfUibname;
             sfTimeoforgjson = jsonafterData.sfTimeoforg;
             sfDevhubunamejson = jsonafterData.sfDevhubuname;
            
             setTimeout(function () { jenkinsbuild(sfUsernamejson,
               sfPasswordsjson,
                sfjobNamejson,
                 sfjobtokenjson,
                 sfSqxbnamejson,
                 sfNooforgsjson,
                 sfUibnamejson,
                 sfTimeoforgjson,
                 sfDevhubunamejson ); }, 1000);
            }, 2000);
        
            function jenkinsbuild(sfUsernamejson:any, 
              sfPasswordsjson:any,
               jobname:any,
               jobtoken:any,
               sfSqxbnamejson:any,
               sfNooforgsjson:any,
               sfUibnamejson:any,
               sfTimeoforgjson:any,
               sfDevhubunamejson:any){
              var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
    
    
                jenkins.job.build({ name: `${jobname}` , token: `${jobtoken}`,parameters:  {
                   "sqxBranchName": `${sfSqxbnamejson}`, 
                   "numberOfOrgs": `${sfNooforgsjson}`, 
                   "uiBranchName": `${sfUibnamejson}`, 
                   "durationOfOrg":`${sfTimeoforgjson}`,
                    "devHubUsername": `${sfDevhubunamejson}`}},
                     function(err:any) {
                  if (err) {
                    vscode.window.showErrorMessage(`Jenkins Job ${jobname} Has Failed : Try Again Or Check The Parameter;`);
                  }else{              vscode.window.showInformationMessage(`Jenkins Job ${jobname} Has Triggered Succesfully`);
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

                     jobName = await vscode.window.showInputBox({
                      prompt:'Enter Job Name',
                      placeHolder: 'Enter Job Name',
                      validateInput: (text: string): string | undefined => {
                          if (!text ) {
                              return 'Enter your jobname';
                          } else {
                              return undefined;
                          }
                      }
            
                               });
              //jenkins job name
                    jobToken = await vscode.window.showInputBox({
                      prompt:'Enter Job token',
                      placeHolder: 'Enter Job token',
                      validateInput: (text: string): string | undefined => {
                          if (!text ) {
                              return 'Enter your jobtoken';
                          } else {
                              return undefined;
                          }
                      }
                               });

         }
    



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
                 sfjobNamejson = jsonafterData.sfjobName;
                 sfjobtokenjson = jsonafterData.sfjobToken;
        
        
                 setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson); }, 1000);
                },2000);
                //building jenkins job using jenkins api i.e npm -i jenkins
        
                function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:any,jobname:any,jobtoken:any){
        
                  var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
                  jenkins.job.build({ name: `${jobname}` , token: `${jobtoken}`}, function(err:any) {
                    if (err) {
                      vscode.window.showErrorMessage(`Jenkins Job ${jobname} Has Failed : Try Again Or Check The Parameter;`);
                    }else{            vscode.window.showInformationMessage(`Jenkins Job ${jobname} Has Triggered Succesfully`);
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


                   jobName = await vscode.window.showInputBox({
                    prompt:'Enter Job Name',
                    placeHolder: 'Enter Job Name',
                    validateInput: (text: string): string | undefined => {
                        if (!text ) {
                            return 'Enter your jobname';
                        } else {
                            return undefined;
                        }
                    }
        
                             });
            //jenkins job name
                  jobToken = await vscode.window.showInputBox({
                    prompt:'Enter Job token',
                    placeHolder: 'Enter Job token',
                    validateInput: (text: string): string | undefined => {
                        if (!text ) {
                            return 'Enter your jobtoken';
                        } else {
                            return undefined;
                        }
                    }
                 });

                 sqxbname = await vscode.window.showInputBox({
                    prompt:'Enter Sqx Branch Name',
                    placeHolder: 'Enter Sqx Branch Name',
                    validateInput: (text: string): string | undefined => {
                        if (!text ) {
                            return 'Enter your sqxbname';
                        } else {
                            return undefined;
                        }
                    }
                 });
                 
                 nooforgs = await vscode.window.showInputBox({
                    prompt:'Enter Number of Orgs',
                    placeHolder: 'Enter Number of Orgs',
                    validateInput: (text: string): string | undefined => {
                      if (!(text) || /[^0-9]/.test(text) ) {
                        return 'Enter your nooforgs';
                        } else {
                            return undefined;
                        }
                    }
                 });
                 uibname = await vscode.window.showInputBox({
                    prompt:'Enter Uib Branch Name',
                    placeHolder: 'Enter Uib Branch Name',
                    validateInput: (text: string): string | undefined => {
                        if (!text ) {
                            return 'Enter your uibname';
                        } else {
                            return undefined;
                        }
                    }
                  });
                  timeoforg = await vscode.window.showInputBox({
                    prompt:'Enter Timeout for Orgs',
                    placeHolder: 'Enter Timeout for Orgs',
                    validateInput: (text: string): string | undefined => {
                      if (!(text) || /[^0-9]/.test(text) ) {
                        return 'Enter your timeoforg';
                        } else {
                            return undefined;
                        }
                    }
                  });
                  devhubuname = await vscode.window.showInputBox({
                    prompt:'Enter Devhub Username',
                    placeHolder: 'Enter Devhub Username',
                    validateInput: (text: string): string | undefined => {
                        if (!text ) {
                            return 'Enter your devhubuname';
                        } else {
                            return undefined;
                        }
                    }
                  });
                
                              
                        const newData = {
                        sfUsername: username,
                        sfPassword:password,
                        sfjobName:jobName,
                        sfjobToken:jobToken,
                        sfSqxbname:sqxbname,
                        sfNooforgs:nooforgs,
                        sfUibname:uibname,
                        sfTimeoforg:timeoforg,
                        sfDevhubuname:devhubuname,
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
                     sfjobNamejson = jsonafterData.sfjobName;
                     sfjobtokenjson = jsonafterData.sfjobToken;
                     sfSqxbnamejson = jsonafterData.sfSqxbname;
                      sfNooforgsjson = jsonafterData.sfNooforgs;
                      sfUibnamejson = jsonafterData.sfUibname;
                      sfTimeoforgjson = jsonafterData.sfTimeoforg;
                      sfDevhubunamejson = jsonafterData.sfDevhubuname;
                    
                     setTimeout(function () { jenkinsbuild(sfUsernamejson,
                       sfPasswordsjson,
                        sfjobNamejson,
                         sfjobtokenjson,
                          sfSqxbnamejson,
                           sfNooforgsjson,
                           sfUibnamejson,
                           sfTimeoforgjson,
                           sfDevhubunamejson); }, 1000);
                    }, 2000);
                
                    function jenkinsbuild(sfUsernamejson:any, sfPasswordsjson:any,
                       jobname:any, 
                       jobtoken:any,
                       sfSqxbnamejson:any,                        
                        sfNooforgsjson:any,
                        sfUibnamejson:any, 
                         sfTimeoforgjson:any,
                          sfDevhubunamejson:any){
                      var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
            
            
                        jenkins.job.build({ name: `${jobname}` , token: `${jobtoken}`,parameters:  {
                          "sqxBranchName": `${sfSqxbnamejson}`,
                           "numberOfOrgs": `${sfNooforgsjson}`,
                            "uiBranchName": `${sfUibnamejson}`,
                            "durationOfOrg": `${sfTimeoforgjson}`,
                             "devHubUsername": `${sfDevhubunamejson}`
                        }}, function(err:any) {
                          if (err) {
                            vscode.window.showErrorMessage(`Jenkins Job ${jobname} Has Failed : Try Again Or Check The Parameter;`);
                          }else{              vscode.window.showInformationMessage(`Jenkins Job ${jobname} Has Triggered Succesfully`);
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
                    jobName = await vscode.window.showInputBox({
                      prompt:'Enter Job Name',
                      placeHolder: 'Enter Job Name',
                      validateInput: (text: string): string | undefined => {
                          if (!text ) {
                              return 'Enter your jobname';
                          } else {
                              return undefined;
                          }
                      }
            
                               });
              //jenkins job name
                    jobToken = await vscode.window.showInputBox({
                      prompt:'Enter Job token',
                      placeHolder: 'Enter Job token',
                      validateInput: (text: string): string | undefined => {
                          if (!text ) {
                              return 'Enter your jobtoken';
                          } else {
                              return undefined;
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
                             sfjobNamejson = jsonafterData.sfjobName;
                             sfjobtokenjson = jsonafterData.sfjobToken;
                    
                    
                             setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson); }, 1000);
                            },2000);
                            //building jenkins job using jenkins api i.e npm -i jenkins
                    
                            function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:any,jobname:any,jobtoken:any){
                    
                              var jenkins = require('jenkins')({ baseUrl: `https://${sfUsernamejson}:${sfPasswordsjson}@ci-cd.compliancequest.com`, crumbIssuer: true });
                              jenkins.job.build({ name: `${jobname}` , token: `${jobtoken}`}, function(err:any) {
                                if (err) {
                                  vscode.window.showErrorMessage(`Jenkins Job ${jobname} Has Failed : Try Again Or Check The Parameter;`);
                                }else{            vscode.window.showInformationMessage(`Jenkins Job ${jobname} Has Triggered Succesfully`);
                              }
                              });           
                                      } 
                  }

      
    }  
      }
//---------------------------------------------------------------------------------
//--------------------------End------------------------------------














//----------------------------End------------------------------------
    
        
