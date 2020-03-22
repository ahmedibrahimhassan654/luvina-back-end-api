module.exports = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Customer Register',
      operationId: 'CustomerRegister',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CustomerRegisterRequest'
            },
            example: {
              fullName: 'test',
              phoneNumber: '010283938',
              userName: 'test',
              email: 'test@yahoo.com',
              password: '123456'
            }
          }
        },
        required: true,
        'x-send-file-in-body': false
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'User Created',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      operationId: 'Login',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest'
            },
            example: {
              userName: 'test',
              password: '123456'
            }
          }
        },
        required: true,
        'x-send-file-in-body': false
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'User logged in successfully',
              data: {
                _id: '5e6ce65aae025f1e1ceeea9d',
                roles: ['Customer'],
                token:
                  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZjZTY1YWFlMDI1ZjFlMWNlZWVhOWQiLCJpYXQiOjE1ODQyMTQ4OTEsImV4cCI6MTU4NTQyNDQ5MX0.NeTZQ6WkNV_NHsoOaYM3xtdaS5b9TXqnRk2EUGZ08FQ'
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/auth/google': {
    get: {
      tags: ['Auth'],
      summary: 'Google login',
      operationId: 'Googlelogin',
      parameters: [],
      responses: {
        '200': {
          description: '',
          headers: {}
        }
      },
      deprecated: false
    }
  },
  '/auth/google/callback': {
    get: {
      tags: ['Auth'],
      summary: 'Google callback',
      operationId: 'Googlecallback',
      parameters: [],
      responses: {
        '200': {
          description: '',
          headers: {}
        }
      },
      deprecated: false
    }
  },
  '/auth/facebook': {
    get: {
      tags: ['Auth'],
      summary: 'Facebook login',
      operationId: 'Facebooklogin',
      parameters: [],
      responses: {
        '200': {
          description: '',
          headers: {}
        }
      },
      deprecated: false
    }
  },
  '/auth/facebook/callback': {
    get: {
      tags: ['Auth'],
      summary: 'Facebook callback',
      operationId: 'Facebookcallback',
      parameters: [],
      responses: {
        '200': {
          description: '',
          headers: {}
        }
      },
      deprecated: false
    }
  },
  '/auth/linkedin': {
    get: {
      tags: ['Auth'],
      summary: 'Linkedin login',
      operationId: 'Linkedinlogin',
      parameters: [],
      responses: {
        '200': {
          description: '',
          headers: {}
        }
      },
      deprecated: false
    }
  },
  '/auth/linkedin/callback': {
    get: {
      tags: ['Auth'],
      summary: 'Linkedin callback',
      operationId: 'Linkedincallback',
      parameters: [],
      responses: {
        '200': {
          description: '',
          headers: {}
        }
      },
      deprecated: false
    }
  },
  '/auth/email/verify': {
    post: {
      tags: ['Auth'],
      summary: 'Verify mail',
      operationId: 'Verifymail',
      parameters: [],
      security: [
        {
          BearerAuth: []
        }
      ],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/VerifymailRequest'
            },
            example: {
              email: 'mohamed.sakr@bosta.co'
            }
          }
        },
        required: true,
        'x-send-file-in-body': false
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'Verification link sent to your email',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/auth/email/{encodedMail}/confirm': {
    post: {
      tags: ['Auth'],
      summary: 'Confirm Mail',
      operationId: 'ConfirmMail',
      security: [
        {
          BearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'encodedMail',
          in: 'path',
          description: '',
          required: true,
          style: 'simple',
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ConfirmMailRequest'
            },
            example: {
              token: 'FOtj/cFDBmC5'
            }
          }
        },
        required: true,
        'x-send-file-in-body': false
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'Email confirmed successfully',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/auth/phone/{phoneNumber}/verify': {
    post: {
      tags: ['Auth'],
      summary: 'Verify phone',
      security: [
        {
          BearerAuth: []
        }
      ],
      operationId: 'Verifyphone',
      parameters: [
        {
          name: 'phoneNumber',
          in: 'path',
          description: '',
          required: true,
          style: 'simple',
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'Verification code sent to your phone number',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/auth/phone/{phoneNumber}/confirm': {
    post: {
      tags: ['Auth'],
      summary: 'Confirm phone',
      operationId: 'Confirmphone',
      security: [
        {
          BearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'phoneNumber',
          in: 'path',
          description: '',
          required: true,
          style: 'simple',
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ConfirmphoneRequest'
            },
            example: {
              token: '312357'
            }
          }
        },
        required: true,
        'x-send-file-in-body': false
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'Phone number confirmed successfully',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/auth/forget-password': {
    post: {
      summary: 'Forget password',
      tags: ['Auth'],
      operationId: 'Forgetpassword',
      deprecated: false,
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/ForgetpasswordRequest'
          }
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'Reset password link sent successfully',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      }
    }
  },
  '/auth/reset-password/{token}': {
    put: {
      summary: 'Reset password',
      tags: ['Auth'],
      operationId: 'Resetpassword',
      deprecated: false,
      produces: ['application/json'],
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          type: 'string',
          description: ''
        },
        {
          name: 'Body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/ResetpasswordRequest'
          }
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          examples: {
            'application/json': {
              status: true,
              message: 'Reset password successfully.',
              data: null
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      }
    }
  }
};
