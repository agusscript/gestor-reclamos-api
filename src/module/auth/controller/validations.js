function validateSignUp(validationService) {
  return [
    validationService.body('nombre').exists().withMessage('El nombre es requerido'),
    validationService.body('apellido').exists().withMessage('El apellido es requerido'),
    validationService.body('correoElectronico').isEmail().withMessage('El correo electrónico debe ser un email válido'),
    validationService.body('contrasenia').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validationService.body('idUsuarioTipo').optional().isEmpty().withMessage('No se puede enviar la propiedad idUsuarioTipo')
  ];
}

function validateSignIn(validationService) {
  return [
    validationService.body('email').isEmail().withMessage('email must be a valid email address'),
    validationService.body('password').exists().withMessage('password is required')
  ];
}

export { validateSignUp, validateSignIn };
