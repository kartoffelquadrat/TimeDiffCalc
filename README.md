# Time Diff Calc

Speeding up time marker analysis.

## About

For my studies I need to analyze many videos for time spent on given tasks.  
The procedure is to fast-forward through the video, identify the time markers where tasks alternate and note the time delta for the resulting intervals.  
This repo hosts a little helper calculator webpage written in plain HTML and JavaScript.


## Usage

 * Open in [browser](https://m5c.github.io/TimeDiffCalc/).   
 * If needed, add to iOS HomeScreen via sharing shortcut, to get an eternal app.  
There is no remotely changing content, so the static page contents will work offline.

### Key Combos

 * Use "Tab" to iterate over fields.
 * Hit "Enter" memorize and start over.

## Electron Build

To run the electron app on all OSes / create a MacOS Build.

 * Clone this repo
 * Install electron (commands are for MacOS):  
```
npm install electron --save-dev
```
 * Start with: `npm run start`
 * Install dependencies for native App build:  
```
npm install --save-dev @electron-forge/cli
npx electron-forge import
```
 * Create app: `npm run make`  
Application is in newly created `bin` directory


## Contact / Pull Requests

 * Author: Maximilian Schiedermeier ![email](email.png)
 * Github: Kartoffelquadrat
 * Webpage: https://www.cs.mcgill.ca/~mschie3
 * License: [MIT](https://opensource.org/licenses/MIT)
