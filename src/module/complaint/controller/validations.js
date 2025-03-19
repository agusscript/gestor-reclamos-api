function validateCreate(validationService) {
  return [
    validationService.body('subject').exists()
      .withMessage('The subject property is required'),

    validationService.body('description').exists()
      .withMessage('The description property is required'),

    validationService.body('idComplaintType').exists()
      .withMessage('The idComplaintType property is required'),

    validationService.body('idComplaintStatus').isEmpty()
      .withMessage('The idComplaintStatus property cannot be sent')
  ];
}

export { validateCreate };
