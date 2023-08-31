const swaggerUi = require('swagger-ui-express')
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("api.yaml");

const options = {

    customCss: `img {content:url(\'assets/test_logo.png\'); height:auto;} `,
    customfavIcon: "../favicon.ico",
    customSiteTitle: "Swagger API Doc",

}


module.exports = { swaggerServe: swaggerUi.serve, swaggerSetup: swaggerUi.setup(swaggerJSDocs, options)  }