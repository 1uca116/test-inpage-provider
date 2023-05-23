const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
    name: 'index.ts',
    output: path.resolve(process.cwd(), './src/api'),
    url: `${process.env.REACT_APP_API_BASE_URL}/swagger.json`,
    // input: path.resolve(process.cwd(), './src/swagger.json'),
    httpClientType: 'axios',
    moduleNameFirstTag: 'Snipa',
    templates: path.resolve(process.cwd(), './src/api/templates'),
});
