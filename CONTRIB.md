## Development

### Packages
`npm i -g typescript` 

### Commands
command         | description
----------------|------------
npm start       | compile typescript and start watcher
npm test        | run lint and tests
npm run stryker | run mutation testing

**Hint:** We set the bar for *100%* mutation coverage and like to keep it that way!

```
[2017-04-20 10:05:02.728] [INFO] InputFileResolver - Found 7 of 32 file(s) to be mutated.
[2017-04-20 10:05:02.731] [INFO] SandboxCoordinator - Starting initial test run. This may take a while.
[2017-04-20 10:05:07.630] [INFO] Stryker - Initial test run succeeded. Ran 48 tests in 4 seconds.
[2017-04-20 10:05:07.692] [INFO] Stryker - 66 Mutant(s) generated
[2017-04-20 10:05:07.703] [INFO] SandboxCoordinator - Creating 8 test runners (based on CPU count)
Mutation testing  [] 100% (ETC 0.0s)[66 killed] [0 survived] [0 no coverage] [0 timeout] [0 error]
```

We encourage the *BDD* development style. Write your expectations first, see it fail, make it pass.

**Note:** With the progress on the *stryker* side new mutators introduced new mutants on typescript-generated code that unfortunately survive. For now you may safely ignore mutators like:

```
Mutator: BooleanSubstitution
-   Object.defineProperty(exports, "__esModule", { value: true });
+   Object.defineProperty(exports, "__esModule", { value: false });
```

## Testing

`npm link .` to use your local copy directly  
`npm i -g . --production` to install your local copy