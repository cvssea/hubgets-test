export function validate(inputs) {
  const errors = {};

  inputs.forEach(input => {
    if (!input.value) {
      errors[input.name] = 'Please fill out this field!';
    }

    if (
      input.type === 'email' &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.value)
    ) {
      errors.email = 'Invalid email address!';
    }
  });

  return errors;
}

export function getInputValue(inputList, name) {
  return inputList.find(input => input.name === name).value;
}

export function createErrorTooltip(message) {
  const span = document.createElement('span');
  span.classList.add('tooltip-error');
  span.textContent = message;
  return span;
}
