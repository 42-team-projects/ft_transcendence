// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 3000;

// let tt = path.join(__dirname)

// app.use(express.static(tt + '/frontend'));

// app.use(function(req, res, next) {
//   res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net");
//   return next();
// });

// app.get('/', (req, res) => {
//     res.sendFile(tt + '/frontend/html/register.html');
// })

// app.listen(port, () => {
//   console.log(`App listening at http://127.0.0.1:${port}`);
// });

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'frontend')));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'user.html'));
});


app.listen(3003, '0.0.0.0', () => {
    console.log('Server is running on port 3000 and is accessible on the network');
});