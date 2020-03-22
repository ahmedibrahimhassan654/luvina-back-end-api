module.exports = {
  CustomerRegisterRequest: {
    title: 'CustomerRegisterRequest',
    required: ['fullName', 'phoneNumber', 'userName', 'email', 'password'],
    type: 'object',
    properties: {
      fullName: {
        type: 'string'
      },
      phoneNumber: {
        type: 'string'
      },
      userName: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    example: {
      fullName: 'test',
      phoneNumber: '010283938',
      userName: 'test',
      email: 'test@yahoo.com',
      password: '123456'
    }
  },
  LoginRequest: {
    title: 'LoginRequest',
    required: ['userName', 'password'],
    type: 'object',
    properties: {
      userName: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    example: {
      userName: 'test',
      password: '123456'
    }
  },
  VerifymailRequest: {
    title: 'VerifymailRequest',
    required: ['email'],
    type: 'object',
    properties: {
      email: {
        type: 'string'
      }
    },
    example: {
      email: 'mohamed.sakr@bosta.co'
    }
  },
  ConfirmMailRequest: {
    title: 'ConfirmMailRequest',
    required: ['token'],
    type: 'object',
    properties: {
      token: {
        type: 'string'
      }
    },
    example: {
      token: 'FOtj/cFDBmC5'
    }
  },
  ConfirmphoneRequest: {
    title: 'ConfirmphoneRequest',
    required: ['token'],
    type: 'object',
    properties: {
      token: {
        type: 'string'
      }
    },
    example: {
      token: '312357'
    }
  },
  ForgetpasswordRequest: {
    title: 'ForgetpasswordRequest',
    example: {
      email: 'test@yahoo.com'
    },
    type: 'object',
    properties: {
      email: {
        type: 'string'
      }
    },
    required: ['email']
  },
  ResetpasswordRequest: {
    title: 'ResetpasswordRequest',
    example: {
      password: '12345678'
    },
    type: 'object',
    properties: {
      password: {
        type: 'string'
      }
    },
    required: ['password']
  }
};
