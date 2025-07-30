const open = require('open');

(async () => {
    await open('https://www.google.com', { name: 'math', width: 400, height: 200, scrollbars: true });
})();


console.log("E = mc²"); // Mathematical equation represented as string