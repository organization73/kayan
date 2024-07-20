const form = document.forms.signin;
const submitButton = form.elements.submit;
const userName = form.elements.userName;
const email = form.elements.email;
const password = form.elements.password;
const confirmPassword = form.elements.confirmPassword;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const userNameValue = userName.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;
  console.log(userNameValue, emailValue, passwordValue, confirmPasswordValue);

  if (
    !userNameValue ||
    !emailValue ||
    !passwordValue ||
    !confirmPasswordValue
  ) {
    alert("Please fill in all fields");
    return;
  }

  if (passwordValue.length < 8) {
    alert("Password should be at least 8 characters long");
    return;
  }

  if (passwordValue !== confirmPasswordValue) {
    alert("Passwords do not match");
    return;
  }
  
});
