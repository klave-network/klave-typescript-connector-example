This project helps you create a typescript project from scratch that will connect to the Klave app you just deployed.

First, follow these steps to create a typescript project:
```
mkdir typescript_project
cd typescript_project/
yarn init -y
yarn add -D typescript
yarn tsc --init --rootDir src --outDir dist
yarn add -D @types/node nodemon ts-node
```

Then, to add the Secretarium Connector as a dependency, copy the following snippet into package.json:
```
  "dependencies": {
    "@secretarium/connector": "^0.17.0"
  },
```

As the Secretarium Connector currently mostly works with javascript, add these lines into package.json:
```
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
```

We created an example code that needs to be customised to your needs. 
Check and modify src/index.ts


Then proceed with the build steps

```
yarn install
yarn dev
yarn build
yarn start
```
