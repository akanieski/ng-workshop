#Resources

##Typings
When using `tsconfig.json` it is easy to unintentially include both the main.d.ts and the browser.d.ts typing files. 

This will lead to duplicate identifiers. Resolve this by adding exclusions for main.d.ts.

http://blog.mgechev.com/2016/03/28/ambient-type-definitions-duplicate-identifier-typescript-fix/