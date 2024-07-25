console.log("works fine.");

// const form = document.getElementById("delete-offer");
// const confirmField = form.querySelector("#confirm");
// const offerIdField = form.querySelector("#offerId");

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const confirm = confirmField.value;
//   const offerId = offerIdField.value;

//   if (confirm !== "DELETE") {
//     alert("You must type DELETE in the input field to delete the offer");
//     return;
//   }
//   if (!offerId) {
//     alert("Offer ID is missing");
//     return;
//   }

//   try {
//     const response = await fetch(`/offer/${offerId}`, {
//       method: "DELETE",
//     });

//     if (response.status === 404) {
//       window.location.href = "/404";
//       return;
//     }
//     if (response.status !== 201) {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.message ||
//           `Request failed with status code ${response.status}`
//       );
//     }

//     const responseData = await response.json();
//     console.log("Request succeeded with JSON response", responseData);
//     alert("Offer deleted successfully");
//     window.location.href = "/offers";
//     return responseData;
//   } catch (error) {
//     console.log(error);
//     alert(`Error: ${error.message}`);
//   }
// });

const deleteOffer = async (btn) => {
  const offerId = btn.parentNode.querySelector("[name=offerId]").value;
  const confirmation = btn.parentNode.querySelector(
    "[name=confirmation]"
  ).value;
  // const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

  const productElement = btn.closest("div");
  console.log(productElement);
  console.log(offerId, confirmation);

  //validation
  if (confirmation !== "DELETE") {
    alert("You must type DELETE in the input field to delete the offer");
    return;
  }

  if (!offerId) {
    alert("Offer ID is missing");
    return;
  }

  try {
    const response = await fetch(`/api/offer/${offerId}`, {
      method: "DELETE",
    });

    if (response.status === 404) {
      window.location.href = "/404";
      return;
    }
    if (response.status !== 201) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Request failed with status code ${response.status}`
      );
    }

    const responseData = await response.json();
    console.log("Request succeeded with JSON response", responseData);
    alert("Offer deleted successfully");
    window.location.href = "/api/offers";
    return responseData;
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }
};
