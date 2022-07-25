import { rejects } from 'assert';
import { resolve } from 'path';
import * as vscode from 'vscode';
const fs = require('fs');
export async function sfdxorgcreator() {  
    let username:any;
    let password:any;
    let imageName:any;
    let imageTag:any;
    let environment:any;
    let isWorking:any;
    let jsonafterData:any;
    let jsonbeforeData:any;
    let jobName:any;
    let jobToken:any;
    let REQ_INC = "ada";
//Read user previously stored data ----------------------------------
const beforedata =  fs.readFileSync('/home/adarsha/Documents/extension/sfdxExtension/sfdxextension/src/json/awt.json', 'utf8');
       jsonbeforeData = JSON.parse(beforedata);
       
       //user input data ---------------------------------------------------
       //check for build with params;
       let build:any = [{
        label:"Build With Params",
        description:"Build With Params",
      },
      {
        label:"Normal Buid",
        description:"Normal Buid",
      }];
      const buildType:string | any = await vscode.window.showQuickPick(
        build,{
            matchOnDetail:true,            
      }
      );
      console.log(buildType);
      //if Build with params 

      if(buildType.label === "Build With Params" ){
        let username:any = await vscode.window.showInputBox({
            prompt:'Enter Your UserName',
            placeHolder: 'Plese!! Enter Your username',   
            validateInput: (input: string): string | undefined=> {
                if (input.trim().length === 0) {
                    return 'Enter Your Password';
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
                     });
          console.log(imageName);
    
          imageTag = await vscode.window.showInputBox({
            prompt:'Image Tag',
            placeHolder: 'Image Tag',
                     });
          console.log(imageTag);

          environment = await vscode.window.showInputBox({
            prompt:'Environment',
            placeHolder: 'Environment',
                     });
          console.log(environment);

          isWorking = await vscode.window.showInputBox({
            prompt:'isWorking : true ? false',
            placeHolder: 'isWorking : true ? false',
                     });
          console.log(isWorking);

          const newData = {
            sfUsername: username,
            sfPassword:password,
            sfjobName:jobName,
            sfjobToken:jobToken,
            sfImageName:imageName,
            sfImageTag:imageTag,
            sfEnvironment:environment,
            sfIsWorking:isWorking
        } ;
        const stringify = JSON.stringify(newData);
    
      //  write new data to .json file; ---------------------------------------        
        await fs.writeFile('/home/adarsha/Documents/extension/sfdxExtension/sfdxextension/src/json/awt.json', stringify, (err: any) => {
            // error checking
            if(err) {throw err;};        
            console.log("New data added");
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
          console.log(username);
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

          const newData = {
            sfUsername: username,
            sfPassword:password,
            sfjobName:jobName,
            sfjobToken:jobToken,
        } ;
        const stringify = JSON.stringify(newData);
    
      //  write new data to .json file; ---------------------------------------        
        await fs.writeFile('/home/adarsha/Documents/extension/sfdxExtension/sfdxextension/src/json/awt.json', stringify, (err: any) => {
            // error checking
            if(err) {throw err;};        
            console.log("New data added");
        });
      }
//---------------------------------------------------------------------------------
let sfUsernamejson:any;
let sfPasswordsjson:any;
let sfImageNamejson:any;
let sfImageTagjson:any;
let sfjobtokenjson:any;
let sfEnvironmentjson:any;
let sfIsWorkingjson:any;
let sfjobNamejson:any;
let afterdata:any;

        setTimeout(function(){
         afterdata =  fs.readFileSync('/home/adarsha/Documents/extension/sfdxExtension/sfdxextension/src/json/awt.json', 'utf8');
         jsonafterData = JSON.parse(afterdata);
         console.log(jsonafterData);
         //Get data from json file ------------------------------------
         sfUsernamejson = jsonafterData.sfUsername;
         sfPasswordsjson = jsonafterData.sfPassword;
         sfjobNamejson = jsonafterData.sfjobName;
         sfjobtokenjson = jsonafterData.sfjobToken;
         sfImageNamejson = jsonafterData.sfImageName;
         sfImageTagjson = jsonafterData.sfImageTag;
         sfEnvironmentjson = jsonafterData.sfEnvironment;
         sfIsWorkingjson = jsonafterData.sfIsWorking;
         console.log(sfImageTagjson);
         setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson,sfImageNamejson,sfImageTagjson,sfEnvironmentjson,sfIsWorkingjson); }, 1000);

        },1000);

        var jenkinsapi = require('jenkins-api');

        function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:number | string,jobname:any,jobtoken:any,sfImageNamejson:any,sfImageTagjson:any,sfEnvironmentjson:any,sfIsWorkingjson:any){
            var jenkins = jenkinsapi.init(`http://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`);                    
                    //specifying particular job name and its token

                    if(buildType.label === "Build With Params" ){
                        console.log("jenkins param build");
                        jenkins.build_with_params(`${jobname}`,{depth: 1, "IMAGE_NAME": `${sfImageNamejson}`,

                         "IMAGE_TAG": `${sfImageTagjson}`,
                         
                         "ENVIROMENT": `${sfEnvironmentjson}`,
                         
                         "isWorking": `${sfIsWorkingjson}`,
                         
                         "REQ_INC": `${REQ_INC}`,token:`${jobtoken}`, }, function(err:any, data:any){
                         
                           if(err) {  console.log(err);vscode.window.showWarningMessage("Your Build Has Failed : Try Again or Check The Input");}
                         
                           console.log(data);
                         
                         });
                    }else{
                        console.log("jenkins normal build");
                        jenkins.build(`${jobname}`, {token:`${jobtoken}`}, function(err:any, data:any) {
                            if (err){console.log(err);vscode.window.showWarningMessage("Your Build Has Failed : Try Again or Check The Input"); }
                            else{
                                vscode.window.showInformationMessage(`Your Build  has run succesfully`);
                                console.log(`Your Build ${jobname} has run succesfully`);
                                console.log(data);
                            }
                          });  
                    }
                                                     
        }
    }
        