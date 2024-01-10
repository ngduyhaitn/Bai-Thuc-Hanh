document.addEventListener("DOMContentLoaded", function () {
  const destinationImages = document.querySelectorAll(".thumb img");
  const largeImage = document.getElementById("popup-img");

  destinationImages.forEach((image) => {
    image.addEventListener("click", function () {
      const imageUrl = this.src;
      largeImage.src = imageUrl;
      openLightbox();
    });
  });

  const tourNameInput = document.getElementById("name");
  const tourEmailInput = document.getElementById("email");
  const tourDestinationInput = document.getElementById("destination");
  const tourDateInput = document.getElementById("date");
  const tourCommentsList = document.getElementById("comments");

  const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
  renderComments(storedComments, tourCommentsList);

  window.submitTourForm = function () {
    const tourName = tourNameInput.value.trim();
    const tourEmail = tourEmailInput.value.trim();
    const tourDestination = tourDestinationInput.value.trim();
    const tourDate = tourDateInput.value.trim();

    if (
      tourName === "" ||
      tourEmail === "" ||
      tourDestination === "" ||
      tourDate === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newTour = {
      name: tourName,
      email: tourEmail,
      destination: tourDestination,
      date: tourDate,
    };

    storedComments.push(newTour);

    localStorage.setItem("comments", JSON.stringify(storedComments));

    renderComments(storedComments, tourCommentsList);

    tourNameInput.value = "";
    tourEmailInput.value = "";
    tourDestinationInput.value = "";
    tourDateInput.value = "";
  };

  function renderComments(comments, commentsTable) {
    commentsTable.innerHTML = "";

    comments.forEach((comment) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${comment.name}</td>
        <td>${comment.email}</td>
        <td>${comment.destination}</td>
        <td>${comment.date}</td>
      `;
      commentsTable.appendChild(tr);
    });
  }
});

function openLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  lightbox.style.display = "none";
}



