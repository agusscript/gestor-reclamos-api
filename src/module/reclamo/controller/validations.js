function validateCreate(validationService) {
  return [
    validationService.body('asunto').exists()
      .withMessage('La propiedad asunto es requerida'),

    validationService.body('descripcion').exists()
      .withMessage('La propiedad descripcion es requerida'),

    validationService.body('idReclamoTipo').exists()
      .withMessage('La propiedad idReclamoTipo es requerida'),
  ];
}

export { validateCreate };