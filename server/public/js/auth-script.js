const form = document.forms.signin;
const submitButton = form.elements.submit;
const userName = form.elements.userName;
const email = form.elements.email;
const password = form.elements.password;
const confirmPassword = form.elements.confirmPassword;

form.addEventListener("submit", async (event) => {
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
  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userNameValue,
        email: emailValue,
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
      }),
    });

    if (response.status !== 201) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Request failed with status code ${response.status}`
      );
    }

    const responseData = await response.json();
    console.log("Request succeeded with JSON response", responseData);
    alert("Admin registered successfully");
    window.location.href = "/login";
    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    alert(`Error: ${error.message}`);
  }
});
