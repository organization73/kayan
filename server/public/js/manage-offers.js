console.log("hello, world!");
const form = document.getElementById("add-offer");
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const offerIdInputfield = form.querySelector("#offerId");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const offerId = offerIdInputfield.value;

  const categoriesInputs = document.querySelectorAll(
    'input[name="categories"]:checked'
  );
  const selectedCategories = Array.from(categoriesInputs).map(
    (input) => input.value
  );
  const titleValue = titleInput.value;
  const imageFiles = imageInput.files;
  if (!titleValue || !selectedCategories || selectedCategories.length === 0) {
    alert("Please fill in all fields");
    return;
  }

  console.log(categoriesInputs, selectedCategories, titleValue, imageFiles);
  try {
    const response = await fetch("/edit-offer", {
      method: "PUT",
      body: new FormData(form),
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
    alert("Offer updated successfully");
    window.location.href = `/offer/${offerId}`;
    return responseData;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }
});

const addProductForm = document.getElementById("add-product-offer");

console.log("addProductForm", addProductForm);

const productIdInput = addProductForm.querySelector("#productId");
const offerIdInput = addProductForm.querySelector("#offerId");

console.log(productIdInput, offerIdInput);
addProductForm.addEventListener("submit", async (event) => {
  console.log(addProductForm);
  event.preventDefault();

  const productId = productIdInput.value;
  const offerId = offerIdInput.value;

  if (!productId || !offerIdInput.value) {
    alert("Please fill in all fields");
    return;
  }
  console.log(productId);

  try {
    const response = await fetch(`/add-product-offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, offerId }),
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
    alert("Product added to offer successfully");
    window.location.href = `/offer/${offerId}`;
    return responseData;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }
});
