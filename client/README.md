# Firebase workflow deploy

#### Install firebase CLi

```bash
npm install -g firebase-tools
```

#### To connect your local project files to your Firebase project  run the following command from the root of your local project directory

```bash
firebase init hosting
```

It will prompt a few selections:

- Select a Firebase project to connect to your local project directory.
- Specify a directory to use as your public root directory. Default is public but for react it must be build
- Choose a configuration for your site

It will create 2 files firebase.json and .firebaserc


#### Deploy into Firebase

```bash
firebase deploy
```