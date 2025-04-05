const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }: any) =>
      trace.type === 'Custom_Form' || trace.payload?.name === 'Custom_Form',
    render: ({ trace, element }: any) => {
      const formContainer = document.createElement('form');
      formContainer.style.backgroundColor = '#f9f9f9';
      formContainer.style.padding = '20px';
      formContainer.style.borderRadius = '12px';
      formContainer.style.width = '100%';
      formContainer.style.fontFamily = 'Segoe UI, sans-serif';
  
      const createLabel = (text: string) => {
        const label = document.createElement('label');
        label.textContent = text;
        label.style.display = 'block';
        label.style.marginBottom = '6px';
        label.style.marginTop = '16px';
        label.style.fontSize = '0.85rem';
        label.style.fontWeight = '600';
        label.style.color = '#333';
        return label;
      };
  
      const createInput = (type: string, className: string) => {
        const input = document.createElement('input');
        input.type = type;
        input.required = true;
        input.className = className;
        Object.assign(input.style, {
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '100%',
          marginBottom: '12px',
          fontSize: '1rem',
        });
        return input;
      };
  
      // Campos
      const nameLabel = createLabel('Name');
      const nameInput = createInput('text', 'name');
  
      const emailLabel = createLabel('Email');
      const emailInput = createInput('email', 'email');
      emailInput.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';
      emailInput.title = 'Invalid email address';
  
      const phoneLabel = createLabel('Phone Number');
      const phoneInput = createInput('tel', 'phone');
      phoneInput.pattern = '\\d+';
      phoneInput.title = 'Only numbers allowed';
  
      // Botón
      const submitButton = document.createElement('input');
      submitButton.type = 'submit';
      submitButton.value = 'Submit';
      submitButton.className = 'submit';
      Object.assign(submitButton.style, {
        padding: '12px',
        borderRadius: '10px',
        background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
        color: 'white',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        fontSize: '1rem',
        marginTop: '20px',
      });
  
      // Appends
      formContainer.appendChild(nameLabel);
      formContainer.appendChild(nameInput);
      formContainer.appendChild(emailLabel);
      formContainer.appendChild(emailInput);
      formContainer.appendChild(phoneLabel);
      formContainer.appendChild(phoneInput);
      formContainer.appendChild(submitButton);
  
      // Validación en tiempo real
      formContainer.addEventListener('input', () => {
        if (nameInput.checkValidity()) nameInput.style.borderColor = '#ccc';
        if (emailInput.checkValidity()) emailInput.style.borderColor = '#ccc';
        if (phoneInput.checkValidity()) phoneInput.style.borderColor = '#ccc';
      });
  
      // Manejo de envío
      formContainer.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const valid =
          nameInput.checkValidity() &&
          emailInput.checkValidity() &&
          phoneInput.checkValidity();
  
        if (!valid) {
          if (!nameInput.checkValidity()) nameInput.style.borderColor = 'red';
          if (!emailInput.checkValidity()) emailInput.style.borderColor = 'red';
          if (!phoneInput.checkValidity()) phoneInput.style.borderColor = 'red';
          return;
        }
  
        submitButton.remove();
  
        window.voiceflow?.chat?.interact?.({
          type: 'complete',
          payload: {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
          },
        });
      });
  
      element.appendChild(formContainer);
    },
  };
  
  export default FormExtension;
  