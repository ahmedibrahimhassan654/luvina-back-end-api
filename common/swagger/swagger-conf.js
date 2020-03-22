module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Luvina',
    description: 'Luvina backend APIs documentation',
    termsOfService: 'http://Luvina.com/terms/',
    contact: {
      name: 'API Support',
      url: 'http://www.Luvina.com/support',
      email: 'support@Luvina.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    },
    version: '1.0'
  },
  servers: [
    {
      url: '{protocol}://localhost:3000/api/v0',
      description: 'Localhost server (uses test data)',
      variables: {
        protocol: {
          enum: ['http'],
          default: 'http'
        }
      }
    },
    {
      url: '{protocol}://Luvina.com/api/v0',
      description: 'Development server (integration)',
      variables: {
        protocol: {
          enum: ['http', 'https'],
          default: 'http'
        }
      }
    }
  ],
  tags: [
    {
      name: 'Auth'
    }
  ]
};
