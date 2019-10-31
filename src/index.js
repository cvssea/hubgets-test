import { validate, getInputValue, createErrorTooltip } from './helpers';
import './scss/main.scss';

const form = document.forms[0];
const inputs = Array.from(form.elements).filter(i => i.localName === 'input');
let errors;

inputs.forEach(input => {
  // the error check will trigger on blur
  input.addEventListener('blur', function(e) {
    errors = validate([e.target]);
    if (Object.keys(errors).length) {
      this.classList.add('error');
    } else {
      this.classList.remove('error');
    }

    // listen for input and revalidate
    this.addEventListener('input', function(e) {
      errors = validate([e.target]);
      if (!Object.keys(errors).length) {
        // no errors
        this.classList.remove('error');
        const errorTooltip = this.parentElement.querySelector('span');
        if (errorTooltip) errorTooltip.remove();
      }
    });
  });
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errors = validate(inputs);

  // if errors, add error tooltips
  if (Object.keys(errors).length) {
    inputs.forEach(input => {
      input.focus();
      input.blur();
      if (errors[input.name]) {
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(createErrorTooltip(errors[input.name]));
        input.classList.add('error');
      }
    });
  } else {
    // no errors, go ahead and submit
    confirm(`
      First Name: ${getInputValue(inputs, 'firstName')}
      Last Name: ${getInputValue(inputs, 'lastName')}
      Company: ${getInputValue(inputs, 'company')}
      Email: ${getInputValue(inputs, 'email')}
    `);
    inputs.forEach(input => (input.value = ''));
  }
});
