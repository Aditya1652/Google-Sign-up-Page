document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("google-form");
  const formParts = document.querySelectorAll(".form-section");
  const nextButtons = document.querySelectorAll(".next-button");
  const showPasswordCheckbox = document.getElementById("showPassword");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  let currentPart = 0;

  function showFormPart(partIndex) {
    formParts.forEach((part, index) => {
      if (index === partIndex) {
        part.classList.add("active");
      } else {
        part.classList.remove("active");
      }
    });
  }

  function validateForm(partIndex) {
    const currentPart = formParts[partIndex];
    const inputs = currentPart.querySelectorAll("input, select");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value) {
        isValid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "";
      }
    });

    if (partIndex === 1) {
      const day = document.getElementById("day").value;
      if (day && parseInt(day) < 1 && parseInt(day) > 31) {
        isValid = false;
        document.getElementById("day").style.borderColor = "red";
        alert("Please enter the day correctly");
      }
      const year = document.getElementById("year").value;
      if (year && (year.length !== 4 || isNaN(year) || year < 1900)) {
        isValid = false;
        document.getElementById("year").style.borderColor = "red";
        alert("Please enter the year correctly");
      }
    }

    if (partIndex === 2) {
      const username = document.getElementById("username").value;
      if (username && !/^[a-zA-Z0-9.]+$/.test(username)) {
        isValid = false;
        document.getElementById("username").style.borderColor = "red";
      }
    }

    if (partIndex === 3) {
      if (
        password.value &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password.value
        )
      ) {
        isValid = false;
        alert(
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      } else if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        confirmPassword.append();
        isValid = false;
      }
    }

    return isValid;
  }

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (validateForm(index)) {
        currentPart++;
        showFormPart(currentPart);
      }
    });
  });

  showPasswordCheckbox.addEventListener("change", function () {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input) => {
      input.type = this.checked ? "text" : "password";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm(3)) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      localStorage.setItem("googleAccountData", JSON.stringify(data));
      alert("Account created successfully!");
    }
  });
});
