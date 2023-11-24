function toggleContentWrapper() {
  const container = document.querySelector(".toggle-container");
  container.classList.toggle("active");
}

// function updateProgress(checkbox) {
//   const progressBarFill = document.getElementById("progress-fill");
//   const checkboxes = document.querySelectorAll(
//     '.content--item__text input[type="checkbox"]'
//   );
//   let checkedCount = 0;

//   checkboxes.forEach((checkbox) => {
//     if (checkbox.checked) {
//       checkedCount++;
//     }
//   });

//   const progressPercentage = (checkedCount / checkboxes.length) * 100;
//   progressBarFill.style.width = `${progressPercentage}%`;
// }

document.addEventListener("DOMContentLoaded", function () {
  const contentItems = document.querySelectorAll(".content--item");
  const progressBarFill = document.getElementById("progress-fill");

  contentItems.forEach((contentItem, index) => {
    const checkbox = contentItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
      updateProgress();
      toggleContent(contentItem, checkbox.checked);
    });

    // Initially hide content
    toggleContent(contentItem, false);
  });

  // Initial update of the progress bar
  updateProgress();

  function updateProgress() {
    const checkboxes = document.querySelectorAll(
      '.content--item__text input[type="checkbox"]'
    );
    let checkedCount = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });

    const progressPercentage = (checkedCount / checkboxes.length) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
  }

  function toggleContent(clickedContentItem, show) {
    contentItems.forEach((contentItem) => {
      const contentText = contentItem.querySelector(".content-item__body");
      if (contentItem === clickedContentItem) {
        contentText.style.display = show ? "flex" : "none";
      } else {
        contentText.style.display = "none";
      }
    });
  }
});
