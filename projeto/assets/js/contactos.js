
  //Validação dos campos do formulário
  function validateForm() {
    let isValid = true;
    var nameInput = document.getElementById("nome");
    var emailInput = document.getElementById("email");
    var messageText = document.getElementById("mensagem");
    var genderMale = document.getElementById("male");
    var genderFemale = document.getElementById("female");
    var termsInput = document.getElementById("termos");
  
    if (nameInput.value.length < 3) {
      showError("nome", "Erro no nome!")
      isValid = false;
    } else {
      hideError("nome");
    }
  
    if (!validateEmail(emailInput.value)) {
      showError("email", "Erro no email!")
      isValid = false;
    } else {
      hideError("email");
    }
  
    if (messageText.value.trim() === "") {
      showError("mensagem", "Erro na mensagem!")
      isValid = false;
    } else {
      hideError("mensagem");
    }
  
    if (!genderMale.checked && !genderFemale.checked) {
      showError("gender", "Escolha uma opçao!")
      isValid = false;
    } else {
      hideError("gender");
    }
  
    if (!termsInput.checked) {
      showError("terms", "Aceite os Termos e Condiçoes!")
      isValid = false;
    } else {
      hideError("terms");
    }
  
    return isValid;
  }
  
  function validateEmail(email) {
    var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email); //Esta função test() devolve true ou false
  }
  
  function showError(fieldId, message) {
    var errorDiv = document.getElementById(`${fieldId}-error`);
    errorDiv.textContent = message;
    errorDiv.style.display = "block"; 
  }
  
  function hideError(fieldId) {
    var errorDiv = document.getElementById(`${fieldId}-error`);
    errorDiv.style.display = "none";
  }
  
  function saveFormData() {
    alert("A sua mensagem foi enviada com sucesso!");
    document.getElementById('contact-form').reset();
    //Objecto que contém os dados do form já validados
    var formData = {
      name: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      msgText: document.getElementById("mensagem").value,
      birthYear: document.getElementById("birthYear").value,
      gender: document.querySelector("input[name='gender']:checked"),
      term: document.getElementById("termos").checked,
    };
  
    console.log(formData);
    localStorage.setItem("formulario", JSON.stringify(formData));
  }
  
  //function showError() {}
  
  document.addEventListener("DOMContentLoaded", function () {
    fillBirthYearSelect();
  });
  
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      //Previne o comportamento default de submissão do form (senão faz refresh)
      event.preventDefault();
  
      //Verifica se a função retorna verdadeiro ou falso
      if (validateForm()) {
        //salvar formulário
        saveFormData();
        var success = document.getElementById("success-message");
        success.style.opacity = "1";
        setTimeout(() => {
          success.style.opacity = "5";
        }, 5000);
      }
    });

    
 
