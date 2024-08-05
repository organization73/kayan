function confirmAction(message) {
  return new Promise((resolve, reject) => {
      if (confirm(message)) {
          resolve(true);
      } else {
          resolve(false);
      }
  });
}


const deleteProduct = async (btn) => {
  const userConfirmed = await confirmAction(
    "Are you sure you want to delete this item?"
  );
  if (!userConfirmed) {
    console.log("Delete request was cancelled.");
    return;
  }
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  console.log(prodId);
  // const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

  const productElement = btn.closest("article");

  try {
    const response = await fetch(`/api/product/${prodId}`, {
      method: "DELETE",
    });

    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Request failed with status code ${response.status}`
      );
    }

    const responseData = await response.json();
    console.log("Request succeeded with JSON response", responseData);
    alert("Product deleted successfully");
    window.location.href = "/api/products";
    return responseData;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
    window.location.href = "/api/products";
  }
};
