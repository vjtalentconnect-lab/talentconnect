const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'App.jsx');
let code = fs.readFileSync(appJsxPath, 'utf8');

// Replace standard lazy imports
code = code.replace(/const (\w+) = lazy\(\(\) => import\((['"])(.*?)\2\)\);/g, 'import $1 from $2$3$2;');

// Replace suspenses around everything
// Actually we can keep Suspense if there are still lazy things, it doesn't hurt.
// Wait, React throws a fit if I import lazy but don't use it, but App.jsx uses it for NotFound perhaps.

fs.writeFileSync(appJsxPath, code);
console.log('App.jsx de-lazified!');
