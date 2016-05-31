#Resources

## Ignoring main typings files
TypeScript recognizes that packages can function differently on the browser and in other locations. This feature is unnecessary for most common packages because isomorphic JS is trendy and many packages function identically on all JS environments.

If however, my code was deliberately checking the environment for functionality, or if I wanted to prevent users from using features that are broken in the browser, it would be helpful to have.

Here's an example. I have a color picker package. This package, if I'm on a desktop, will allow me to pick a color from anywhere on my screen. Obviously this relies on system-level APIs, and can't be used by the browser. On the other hand, my browser can pick the color within the browser window. Rather than release an entirely new package, I expose different typings to a programmer so they know which functionality is permitted based on their environment.

Ultimately, there's little cost to you (other than file space on your machine) and potentially functionality that would otherwise be impossible. (1)





####Footnotes
(1) [http://stackoverflow.com/a/35727526]