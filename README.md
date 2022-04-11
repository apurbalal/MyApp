# MyApp - TODO

## About
This is a demo todo App. When you open the App you need to authenticate to use Todo.


## Development
Run these command
```
nvm use
yarn 
yarn ios or yarn android
```

## Tech
#### Typescript
The App is written in Typescript - https://www.typescriptlang.org/

#### Architecture - Redux

Redux is a predictable state container for JavaScript apps.
Link: https://redux.js.org/introduction/getting-started

![reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26](https://user-images.githubusercontent.com/9425881/162656345-0f9e528e-882e-4611-992b-663e16103eeb.gif)

#### Redux thunk
For handling Async tasks 

#### Native module
In Android expo-local-authentication throws error when screenlock is not set. In order to enroll user, created AuthModule in Android. AuthModule handle enrolling user.
Check how to write Android native module: https://reactnative.dev/docs/native-modules-android
