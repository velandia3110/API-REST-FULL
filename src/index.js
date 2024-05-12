import app from './app.js';
import './database.js';
const port = process.env.PORT || 4000;
app.listen(port);
console.log('Server listen on port ' + port);