const { connectDB } = require('../src/config/db'); 
const { initializeModels } = require('../src/models/index'); 
const app = require('../src/app'); 

require('dotenv').config();

const PORT = process.env.PORT || 3000; 

(async () => {
    try {
        await connectDB();
        await initializeModels();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
})();