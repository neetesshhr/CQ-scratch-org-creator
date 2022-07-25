import { rejects } from 'assert';
import { resolve } from 'path';
import * as vscode from 'vscode';
import * as data from "./json/awt.json";
const {exec} = require("child_process");
const path = require('path');



const os = require('os');
const fs = require('fs');
export async function sfdxorgcreator() {  
    let username:any;
    let password:any;
    let imageName:any;
    let imageTag:any;
    let jsonafterData:any;
    let jsonbeforeData:any;
    let jobName:any;
    let jobToken:any;
    let REQ_INC = "ada";
//Read user previously stored data ---------------------------------

// const beforedata =  fs.readFileSync('/home/adarsha/Documents/extension/sfdxExtension/CQ-scratch-org-creator/src/json/awt.json', 'utf8');
//        jsonbeforeData = JSON.parse(beforedata);
       
       //user input data ---------------------------------------------------
       //check for build with params;
       let dirPath:any;
       if (fs.existsSync(`${__dirname}/cqconfig`)) {
        console.log('Directory exists!');
         dirPath = `${__dirname}/cqconfig`;
         console.log(dirPath);
    } else {
       dirPath = path.join(__dirname, '/cqconfig');
      fs.mkdirSync(dirPath); }  
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
        let username:any = await vscode.window.showInputBox({
            prompt:'Enter Your UserName',
            placeHolder: 'Plese!! Enter Your username',   
            validateInput: (input: string): string | undefined=> {
                if (input.trim().length === 0) {
                    return 'Enter Your username';
                }
            }       
            
                     });
    //password (auth-token) ---------------------------------------------
          password = await vscode.window.showInputBox({
            placeHolder: 'Plese!! Enter Your password',
            prompt:'Enter Your Password',
            validateInput: (input: string): string | undefined=> {
                if (input.trim().length === 0) {
                    return 'Enter Your Password';
                }
            }
                     });
          console.log(password);

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
          console.log(jobName);
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
          console.log(jobToken);
          imageName = await vscode.window.showInputBox({
            prompt:'Image Name',
            placeHolder: 'Image Name',
            validateInput: (text: string): string | undefined => {
              if (!text ) {
                  return 'Enter Your Image Name';
              } else {
                  return undefined;
              }
          }
                     });
          console.log(imageName);
    
          imageTag = await vscode.window.showInputBox({
            prompt:'Image Tag',
            placeHolder: 'Image Tag',
                     });
          console.log(imageTag);

          let envals:any = [{
            label:"dev",
            description:"Development",
          },
          {
            label:"prod",
            description:"NProductionrmal Buid",
          },
          {
            label:"uat",
            description:"UAT",
          },
        ];

        let environ:string | any = await vscode.window.showQuickPick(
          envals,
          {
              matchOnDetail:true, 
        },
        );

         

          const newData = {
            sfUsername: username,
            sfPassword:password,
            sfjobName:jobName,
            sfjobToken:jobToken,
            sfImageName:imageName,
            sfImageTag:imageTag,
            sfEnvironment:environ,
        } ;
        const stringify = JSON.stringify(newData);
    
      //  write new data to .json file; ---------------------------------------        
        await fs.writeFile(`${dirPath}/cq.json`, stringify, (err: any) => {
            // error checking
            if(err) {throw err;};        
        });
    

      }
      else{
        username = await vscode.window.showInputBox({
            prompt:'Enter Your UserName',
            placeHolder: 'Plese!! Enter Your username',
            validateInput: (text: string): string | undefined => {
                if (!text) {
                    return 'Enter username';
                } else {
                    return undefined;
                }
            }
                     });
    //password (auth-token) ---------------------------------------------
          password = await vscode.window.showInputBox({
            placeHolder: 'Plese!! Enter Your password',
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
      }
//---------------------------------------------------------------------------------
let sfUsernamejson:any;
let sfPasswordsjson:any;
let sfImageNamejson:any;
let sfImageTagjson:any;
let sfjobtokenjson:any;
let sfEnvironmentjson:any;
let sfjobNamejson:any;
let afterdata:any;

        setTimeout(function(){
         afterdata =  fs.readFileSync(`${dirPath}/cq.json`, 'utf8');
         jsonafterData = JSON.parse(afterdata);
         //Get data from json file ------------------------------------
         sfUsernamejson = jsonafterData.sfUsername;
         sfPasswordsjson = jsonafterData.sfPassword;
         sfjobNamejson = jsonafterData.sfjobName;
         sfjobtokenjson = jsonafterData.sfjobToken;
         sfImageNamejson = jsonafterData.sfImageName;
         sfImageTagjson = jsonafterData.sfImageTag;
         sfEnvironmentjson = jsonafterData.sfEnvironment;
         console.log(sfImageTagjson);
         setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson,sfImageNamejson,sfImageTagjson,sfEnvironmentjson); }, 1000);

        },1000);

        var jenkinsapi = require('jenkins-api');

        function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:number | string,jobname:any,jobtoken:any,sfImageNamejson:any,sfImageTagjson:any,sfEnvironmentjson:any){
            var jenkins = jenkinsapi.init(`https://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`);                    
                    //specifying particular job name and its token

                    if(buildType.label === "Build With Params" ){
                        console.log("jenkins param build");
                        jenkins.build_with_params(`${jobname}`,{depth: 1, "IMAGE_NAME": `${sfImageNamejson}`,

                         "IMAGE_TAG": `${sfImageTagjson}`,
                         
                         "ENVIROMENT": `${sfEnvironmentjson}`,
                                                  
                         "REQ_INC": `${REQ_INC}`,token:`${jobtoken}`, }, function(err:any, data:any){
                         
                           if(err) {  
                            vscode.window.showWarningMessage(`Your Build ${jobName} Has Failed : Try Again or Check The Input`);
                          }
                           else{
                            vscode.window.showInformationMessage(`Your Build ${jobName} Has  Triggered Succesfully`);
                           }
                         
                         
                         });
                    }else{
                        console.log("jenkins normal build");
                        jenkins.build(`${jobname}`, {token:`${jobtoken}`}, function(err:any, data:any) {
                            if(err){
                              vscode.window.showWarningMessage(`Your Build ${jobName} Has Failed with status 400: Try Again or Check The Input`);
                            }
                            else{
                                vscode.window.showInformationMessage(`Your Build ${jobname} Has Triggered succesfully with status 201`);
                                
                            }
                          });  
                    }
                                                     
        }
    }
        