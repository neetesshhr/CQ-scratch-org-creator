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
       let dirPath:any;
       if (fs.existsSync(`${__dirname}/cqconfig`)) {
         dirPath = `${__dirname}/cqconfig`;
    } else {
       dirPath = path.join(__dirname, '/cqconfig');
      fs.mkdirSync(dirPath); }  

    //check for build with params;
        dirPath = `${__dirname}/cqconfig`;
       if (!fs.existsSync(dirPath)) {
        console.log('Directory does not exists!');
       
      
       fs.mkdirSync(dirPath, { recursive: true });
      
    }
    console.log(`checking... ${dirPath}`);

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
    
          imageTag = await vscode.window.showInputBox({
            prompt:'Image Tag',
            placeHolder: 'Image Tag',
                     });

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
    
         setTimeout(function () { jenkinsbuild(sfUsernamejson, sfPasswordsjson, sfjobNamejson, sfjobtokenjson, sfImageNamejson, sfImageTagjson, sfEnvironmentjson); }, 1000);
        }, 2000);
    
        function jenkinsbuild(sfUsernamejson:any, sfPasswordsjson:any, jobname:any, jobtoken:any, sfImageNamejson:any, sfImageTagjson:any, sfEnvironmentjson:any){
          var jenkins = require('jenkins')({ baseUrl: `http://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`, crumbIssuer: true });
           jenkins.job.build({ name: `${jobname}` , token: `${jobtoken}`,parameters:  { "IMAGE_NAME":`${sfImageNamejson}`,"IMAGE_TAG":`${sfImageTagjson}`,"ENVIRONMENT":`${sfEnvironmentjson}`}}, function(err:any) {
              if (err) {
                vscode.window.showErrorMessage(`Jenkins Job ${jobname} Has Failed : Try Again Or Check The Parameter;`);
              }
              vscode.window.showInformationMessage(`Jenkins Job ${jobname} Has Triggered Succesfully`);
            });           
                    //specifying particular job name and its token
                    }
      }
      else{
    
        username = await vscode.window.showInputBox({
            prompt:'Enter Your UserName',
            placeHolder: 'Please!! Enter Your username',
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
         jsonafterData = JSON.parse(afterdata);
         //Get data from json file ------------------------------------
         sfUsernamejson = jsonafterData.sfUsername;
         sfPasswordsjson = jsonafterData.sfPassword;
         sfjobNamejson = jsonafterData.sfjobName;
         sfjobtokenjson = jsonafterData.sfjobToken;


         setTimeout(function() { jenkinsbuild(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson); }, 1000);
        },2000);

        function jenkinsbuild(sfUsernamejson:any,sfPasswordsjson:any,jobname:any,jobtoken:any){

          var jenkins = require('jenkins')({ baseUrl: `http://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`, crumbIssuer: true });
          jenkins.job.build({ name: `${jobname}` , token: `${jobtoken}`}, function(err:any) {
            if (err) {
              vscode.window.showErrorMessage(`Jenkins Job ${jobname} Has Failed : Try Again Or Check The Parameter;`);
            }
            vscode.window.showInformationMessage(`Jenkins Job ${jobname} Has Triggered Succesfully`);
          });           
                  }          
                    //specifying particular job name and its token                      
        }
      }
//---------------------------------------------------------------------------------
//--------------------------End------------------------------------














//----------------------------End------------------------------------
    
        
