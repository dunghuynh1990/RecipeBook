# Project Name: *Favorite Quotes*

**FavQuotes** is a Ionic 3 project that allow user to view quotes from famous people.

**Current System Information:**
cli packages: (/usr/local/lib/node_modules)

    @ionic/cli-utils  : 1.19.2
    ionic (Ionic CLI) : 3.20.0

global packages:

    cordova (Cordova CLI) : 8.0.0

local packages:

    @ionic/app-scripts : 3.1.9
    Cordova Platforms  : none
    Ionic Framework    : ionic-angular 3.9.2

System:

    Android SDK Tools : 25.2.3
    ios-deploy        : 1.9.2
    ios-sim           : 5.0.8
    Node              : v8.11.2
    npm               : 5.6.0
    OS                : macOS High Sierra
    Xcode             : Xcode 9.3.1 Build version 9E501


## Setup

Requirements to use this project:

##### Node.js (https://nodejs.org/download/)

##### npm (Node Package Manager, it comes with node.js installation)
In case you're not with the latest version of npm:
```sh
$ sudo npm install npm -g
```

##### Cordova & Ionic Cli
To install both of them on your system just launch this command:
```sh
$ sudo npm install cordova ionic -g
```

## Install NPM Dependencies
Once you clone this repository, run this command on your terminal to install all needed dependencies:
```sh
$ npm install
```

## Install cordova plugin Dependencies
Run this command on your terminal to add a platform and install all needed puglins:

iOS:
```sh
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Android:
```sh
$ ionic cordova platform add android
$ ionic cordova run android
```
## Launching the App
After installing the needed dependencies you are done, launch your app with a simple
```sh
$ ionic serve
```
## Topics cover in the project
- Tabs Navigation
- Basic controls(list, grid, input, alert, dialog alert, action sheet, toast....)
- Modeling Objects
- Creating Services for application's logic
- Forms: Template-drive & Reactive Approach
- Forms-Reactive approach: FormControl, FormGroup, FormArray