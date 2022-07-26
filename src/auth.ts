import { rejects } from 'assert';
import { resolve } from 'path';
import * as vscode from 'vscode';
import * as data from "./json/awt.json";
const {exec} = require("child_process");
const path = require('path');
const os = require('os');
const fs = require('fs');
export async function sfdxorgcreator() {  
  //--------------------------------------------------------------
    let username:any;
    let password:any;
    let imageName:any;
    let imageTag:any;
    let jsonafterData:any;
    let jsonbeforeData:any;
    let jobName:any;
    let jobToken:any;
    let REQ_INC = "ada";

    let sfUsernamejson:any;
let sfPasswordsjson:any;
let sfImageNamejson:any;
let sfImageTagjson:any;
let sfjobtokenjson:any;
let sfjobNamejson:any;
let sfEnvironmentjson:any;
let afterdata:any;
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
      console.log("directory doesnot exist");
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
        console.log("inside build with params");
        console.log(buildType.label);
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
            sfEnvironment:environ.label,
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
         sfImageNamejson = jsonafterData.sfImageName;
         sfImageTagjson = jsonafterData.sfImageTag;
         sfEnvironmentjson = jsonafterData.sfEnvironment;
         console.log(sfImageTagjson);
         console.log("reading data");
         console.log(sfUsernamejson);
         console.log(sfPasswordsjson);
         console.log(sfjobNamejson);
         console.log(sfjobtokenjson);
         setTimeout(function () { jenkinsbuild(sfUsernamejson, sfPasswordsjson, sfjobNamejson, sfjobtokenjson, sfImageNamejson, sfImageTagjson, sfEnvironmentjson); }, 1000);
        }, 2000);
    
        function jenkinsbuild(sfUsernamejson:any, sfPasswordsjson:any, jobname:any, jobtoken:any, sfImageNamejson:any, sfImageTagjson:any, sfEnvironmentjson:any){
          console.log("inside jenkins build ");
          console.log(sfUsernamejson);
          console.log(sfPasswordsjson);
          console.log(jobname);
          console.log(jobtoken);
          console.log(sfImageNamejson);
          console.log(sfImageTagjson);
          console.log(sfEnvironmentjson);
          var jenkinsapi = require('jenkins-api');


          var jenkins = jenkinsapi.init(`http://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`);      
            console.log(jenkins);              
                    //specifying particular job name and its token
                        console.log("jenkins param build");
                        jenkins.build_with_params(`${jobname}`,{depth: 1, "IMAGE_NAME": `${sfImageNamejson}`,

                         "IMAGE_TAG": `${sfImageTagjson}`,
                         
                         "ENVIROMENT": `${sfEnvironmentjson}`,
                                                  
                         "REQ_INC": `${REQ_INC}`,token:`${jobtoken}` }, function(err:any, data:any){
                         
                           if(err) {  
                            console.log(err);
                            vscode.window.showWarningMessage(`Your Build ${jobName} Has Failed : Try Again or Check The Input`);
                          }
                           else{
                            console.log(data);
                            vscode.window.showInformationMessage(`Your Build ${jobName} Has  Triggered Succesfully`);
                           }
                         
                         
                         });
                    }
      }
      else{
        console.log("inside normal buid");
        console.log(buildType.label);
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
         console.log("reading data");
         console.log(sfUsernamejson);
         console.log(sfPasswordsjson);
         console.log(sfjobNamejson);
         console.log(sfjobtokenjson);

         setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson); }, 1000);
        },2000);

        var jenkinsapi = require('jenkins-api');

        function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:any,jobname:any,jobtoken:any){
          console.log("inside jenkins build ");
          console.log(sfUsernamejson);
          console.log(sfPasswordsjson);
          console.log(jobname);
          console.log(jobtoken);

          var jenkins = jenkinsapi.init(`http://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`);      
            console.log(jenkins);              
                    //specifying particular job name and its token
                        console.log("jenkins normal build");
                        jenkins.build(`${jobname}`, {token:`${jobtoken}`}, function(err:any, data:any) {
                            if(err){

                              console.log(err);
                              vscode.window.showWarningMessage(`Your Build ${jobName} Has Failed with status 400: Try Again or Check The Input`);
                            }
                            else{
                              console.log(data);
                                vscode.window.showInformationMessage(`Your Build ${jobname} Has Triggered succesfully with status 201`);                                
                            }
                          });  
        }
      }
//---------------------------------------------------------------------------------


  














//----------------------------End------------------------------------
    }
        