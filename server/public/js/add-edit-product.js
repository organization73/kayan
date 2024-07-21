console.log("working");

const form = document.getElementById("add-edit-product");
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const imagesInput = document.getElementById("images");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
console.log(form);

function validateFileCount(input) {
  if (input.files.length > 6) {
    alert("You can only upload a maximum of 6 files.");
    input.value = ""; // Clear the input
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleValue = titleInput.value;
  const imageFiles = imageInput.files;
  const imagesFiles = imagesInput.files;
  const priceValue = priceInput.value;
  const descriptionValue = descriptionInput.value;
  const selectedCategory = categoryInput.value;

  if (!titleValue || !priceValue || !descriptionValue || !selectedCategory) {
    alert("Please fill in all fields");
    return;
  }
  try {
    const response = await fetch("/add-product", {
      method: "POST",
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
    alert("Product added successfully");
    window.location.href = "/products";
    return responseData;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }
});
