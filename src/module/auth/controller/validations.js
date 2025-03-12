function validateSignUp(validationService) {
  return [
    validationService.body('name').exists()
      .withMessage('The name property is required'),

    validationService.body('lastName').exists()
      .withMessage('The lastName property is required'),

    validationService.body('email').isEmail()
      .withMessage('The email property must be a valid email'),

    validationService.body('password').isLength({ min: 6 })
      .withMessage('The password property must be at least 6 characters long'),

    validationService.body('userTypeId').isEmpty()
      .withMessage('The userTypeId property cannot be sent')
  ];
}

function validateSignIn(validationService) {
  return [
    validationService.body('email').exists()
      .withMessage('The email property is required to sign in'),

    validationService.body('password').exists()
      .withMessage('The password property is required to sign in'),
  ];
}

export { validateSignUp, validateSignIn };
