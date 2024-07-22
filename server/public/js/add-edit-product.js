const form = document.getElementById("add-edit-product");
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const imagesInput = document.getElementById("images");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const productId = document.getElementById("productId");
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
  if(productId){
    var productIdValue = productId.value;
  }
  const editing = productIdValue ? true : false;

  if (!titleValue || !priceValue || !descriptionValue || !selectedCategory) {
    alert("Please fill in all fields");
    return;
  }
  try {

    const url = editing
      ? `/edit-product/${productIdValue}`
      : "/add-product";
      console.log(url);
    const response = await fetch(url, {
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
    if (editing) {
      alert("Product was edited successfully");
    }else{
      alert("Product was added successfully");
    }
    window.location.href = "/products";
    return responseData;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }
});
