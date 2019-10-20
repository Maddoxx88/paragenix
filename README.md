# Paragenix App

Paragenix is an ionic app which can be used as a mobile application, web app, progressive web app and even a desktop app. Also with the help of Capacitor we don't even need to code a platform specific API which gives you the closest native app experience!

To view my app which is hosted on Firebase head over to:
> https://paragenix-12147.firebaseapp.com/home

Don't forget to Inspect (Ctrl+Shift+I) as it is an app so obviously the pictures will look flattened if you view it on your desktop browser.

Using ionic not only was I able to make a webapp but also an android app (using [Capacitor](https://capacitor.ionicframework.com/) for native API calls), progressive web app (Using [AngularJS](https://angularjs.org/)) and a desktop app (Using [electron](https://electronjs.org/)).

### Requirements:-
- [Git](https://git-scm.com/downloads),
- [Gradle](https://gradle.org/install/) If you're a MAC user you can use [Homebrew](https://brew.sh/) to install gradle smoothly.
- [Node.js](https://nodejs.org/en/),
- Ionic installed and an [Ionic account](https://ionicframework.com/)
- Cordova (`npm install cordova ionic -g`) run with admin privileges in Win/Mac
- [Firebase account](https://firebase.google.com/)
- Firebase project (Go to console -> Add project -> Name your project -> complete the other steps too if you want analytics -> Keep it at that state itself as we're going to use that later)
- [Android Studio](https://developer.android.com/studio)

### Commands to check if installed properly or not:
- `ionic -v`
- `cordova -v`
- `git --version`
- `gradle`
- `$ brew --version` **(ONLY FOR MAC USERS)**

Run 
`ionic start` **-> Name your project** (make sure you align it with the project name you listed on your Firebase project) **-> Choose either "blank template/ side menu template"** (preferably go for Side menu) **-> Check "No" for any Ionic Appflow SDK installation**

Now cd into your folder and run
`ionic serve` (this should open up your basic ionic application in your primary browser)

### For the display part:
_If you want your app to display your vlog photos or any other photos which you've clicked yourself I would recommend you to make your own API which will make the data calling part very easy
**OR**
If you want to use pre-processed data make sure that it is in a JSON format which you can pull in your app.component files._

### How can you create your own API ?
Just head over to (http://myjson.com/) and start making your own API in JSON format.
If you want a reference API you can use my API which I created for my project -> (https://api.myjson.com/bins/9f88n)
Now the data will be in unindented format so to format it properly and to make it readable head over to (http://jsonviewer.stack.hu/) and click on "Format" which will give you a readable JSON file.

After you complete making your own API, head over to app.module.ts and  add `HttpClientModule` in imports like this:
```
imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ]
```
And add import statement like this: 
```
import {HttpClientModule} from "@angular/common/http";
```  

In your home.page.ts file in your project folder and add an interface and a class like this:
```
export class HomePage {

  siteList: Observable<Site[]>;

  constructor(httpClient: HttpClient){
    this.siteList = httpClient.get<Site[]>("https://api.myjson.com/bins/9f88n")
  }


}

export interface Site{

  id: number;
  name: string;
  image: string;

}
```

Open home.page.html and clear out everything under `<ion-list>` as that is the template list and we won't need it. Add the following code between opening and closing tags of `<ion-content>`
```
<ion-card *ngFor="let site of (siteList | async)" class="welcome-card">
      <img [src]="site.image" alt="" />
      <ion-card-header>
        <ion-card-title>{{site.name}}</ion-card-title>
      </ion-card-header>
    </ion-card>
```
#### _If you want to run a native instance of your app you can run it on [Ionic DevApp](https://ionicframework.com/docs/appflow/devapp) which is an app designed to run your Ionic app in any Android or iOS device._
**Run the following commands, open Ionic DevApp and connect to the same network:**
1. `ionic start`
2. `ionic serve`
3. `ionic cordova prepare(integration)`
4. `ionic serve --devapp`

### Running on Android device & emulator:
1. `ionic cordova platform add android` (adds native app container projects, will work on android studio)
2. `ionic cordova run android` **ENSURE your device is connected to your machine and USB debugging is enabled!**(emulator & device both)

### Running on iOS device & emulator (ONLY FOR MAC USERS WHO HAVE XCODE ON THEIR MACHINES):
1. `npm install -g ios-deploy`
2. `ionic cordova build ios`
3. Run and push the Xcode project file created through Xcode's "Run your app" feature.
4. Make sure you've entered your AppleID correctly into Xcode so your project is in sync.
5. Allow your "MyApp" the permission to run locally on your device under **Device Management** or else Xcode will give you an "untrusted credential" error.

### Ionic Deploy commands:-
1. `ionic link` (create a new app)-> Enter a name-> host-Ionic Appflow-> auto ssh setup 
2. Channels-> master-> download updates in bg(terminal command)-> check package.json-> CHANNEL_NAME

3. `git config --global user.email "you@example.com"`
4. `git config --global user.name "Your Name"`
5. Run below commands to commit
- `git add .`
- `git commit -m "Added Shop"`

6. `git push ionic master`
(Deploy-> New web build-> Select which Commit and select Channel"Master" and click "Create Build"-> Assign to channel-> Deploy-> Done!

### PWA part:-
1. `npm install @angular/cli -g` (installation if not done)
2. `ng version`
3. `ng add @angular/pwa --project app` (ngsw-confirm.json & manifest.json)

#### To test we need a cloud service so we will use Firebase

### Firebase part:-
1. Make a project if you haven't already 
2. `npm install firebase-tools -g` (installation of firebase CLI tools)
3. `firebase login` (login with your account)
4. `ionic build --prod` (web part i.e. www folder in our code)
5. `firebase init` (feature-> Hosting-> Select your application-> public directory(www)-> Select single page applications as we are using angular-> Select "no" for overwriting index.html provided by firebase->)
6. `firebase deploy`(setup a sv, https link, uses files inside www folder)
 
### Capacitor:-
1. `ionic integrations enable capacitor`
2. `npx cap init`-> enter-> package ID(config.xml)
3. `ionic build`
4. `npx cap add android`
5. `npx cap open android`
6. `npx cap copy`

### Electron:-
1. `npx cap add electron`
2. `ionic build`
3. `npx cap copy`
4. enter into electron\(folder)-> `npm run electron:start`

#### Thanks to [Sani Yusuf](https://www.linkedin.com/in/saniyusuf/) for explaining this in detail on [Linkedin Learning](https://www.linkedin.com/)

