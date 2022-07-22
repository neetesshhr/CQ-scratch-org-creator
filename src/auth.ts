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
//Read user previously stored data ----------------------------------
const beforedata =  fs.readFileSync('/home/adarsha/Documents/extension/sfdxExtension/sfdxextension/src/json/awt.json', 'utf8');
       jsonbeforeData = JSON.parse(beforedata);
       
       //user input data ---------------------------------------
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
        //password (auth-token) ---------------------------------
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
         setTimeout(function() { jenkinsap(sfUsernamejson,sfPasswordsjson,sfjobNamejson,sfjobtokenjson); }, 1000);

        },1000);

        var jenkinsapi = require('jenkins-api');

        function jenkinsap(sfUsernamejson:any,sfPasswordsjson:number | string,jobname:any,jobtoken:any,){

                          console.log(username);
                          //login to jenkins server remotely:
                          var jenkins = jenkinsapi.init(`http://${sfUsernamejson}:${sfPasswordsjson}@localhost:8080`);
                          console.log(jenkins);
                    console.log(jobtoken);
                    //specifying particular job name and its token
        jenkins.build(`${jobname}`, {token:`${jobtoken}`}, function(err:any, data:any) {
            if (err){ return console.log(err); }
            console.log(data);
          });
        }


    }
        