// redirect
function redirectToLink(link) {
  window.open(link, "_blank");
}

// toggle content wrapper
function toggleContentWrapper() {
  const container = document.querySelector(".container-content");
  const upArrow = document.querySelector("#toggle-svg");
  const btnContentTrigger = document.querySelector("#content-trigger");

  btnContentTrigger.ariaExpanded ? "false" : "true";
  container.classList.toggle("active");
  upArrow.classList.toggle("rotate");
}

// adverts
function closeAdvert() {
  const advertBtn = document.getElementById("advert-sys");
  advertBtn.style.display = "none";
  const advertBtnPhone = document.getElementById("advert--phone");
  advertBtnPhone.style.display = "none";
}
// All menu toggle logic
document.addEventListener("DOMContentLoaded", function () {
  // content setup guide list
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

    // Update progress text
    const progressText = document.getElementById("progressValue");
    progressText.textContent = `${checkedCount} / ${checkboxes.length} completed`;
  }
  // toggle body content
  function toggleContent(clickedContentItem, show) {
    contentItems.forEach((contentItem) => {
      const contentText = contentItem.querySelector(".content-item__body");
      //   const wrappercontentItem = contentItem.querySelector(".content--item");
      if (contentItem === clickedContentItem) {
        contentText.style.display = show ? "flex" : "none";
        show
          ? (contentItem.style.background = "#f3f3f3")
          : (contentItem.style.background = "#fff");
        show
          ? (contentItem.style.marginBottom = "0.7rem")
          : (contentItem.style.marginBottom = "0rem");
      } else {
        contentText.style.display = "none";
      }
    });
  }

  // toggle profile menu
  const profileMenuTrigger = document.getElementById("profile-menu");
  const profileMenuWrapper = document.getElementById("profile-menu-content");
  const allProfileMenuItems =
    profileMenuWrapper.querySelectorAll('[role="menuitem"]');

  // notification menu
  const notificationTrigger = document.getElementById("notification-trigger");
  const notificationMenu = document.getElementById("notification-menu");
  const allNotificationMenuItems =
    notificationMenu.querySelectorAll('[role="menuitem"]');

  // profile and notification logic
  function profileToggleLogic() {
    function closeProfileMenu() {
      profileMenuTrigger.ariaExpanded = "false";
      profileMenuTrigger.focus();
    }

    function handleProfileMenuArrowKeyPress(event, menuItemIndex) {
      const isLastMenuItem = menuItemIndex === allProfileMenuItems.length - 1;
      const isFirstMenuItem = menuItemIndex === 0;
      const nextMenuItem = allProfileMenuItems.item(menuItemIndex + 1);
      const previousMeunItem = allProfileMenuItems.item(menuItemIndex - 1);

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        if (isLastMenuItem) {
          allProfileMenuItems.item(0).focus();
          return;
        }
        nextMenuItem.focus();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        if (isFirstMenuItem) {
          allProfileMenuItems.item(allProfileMenuItems.length - 1).focus();
          return;
        }
        previousMeunItem.focus();
      }
      // console.log(event);
    }

    function handleProfileMenuEscKeyPress(event) {
      if (event.key === "Escape") {
        toggleProfileMenu(); // basically gonna close up and clean everything
      }
    }

    function openProfileMenu() {
      profileMenuTrigger.ariaExpanded = "true";
      allProfileMenuItems.item(0).focus();
      // console.log(allProfileMenuItems);

      profileMenuWrapper.addEventListener(
        "keyup",
        handleProfileMenuEscKeyPress
      );

      // for each item menu register and event listner
      allProfileMenuItems.forEach(function (menuItem, menuItemIndex) {
        menuItem.addEventListener("keyup", function (event) {
          handleProfileMenuArrowKeyPress(event, menuItemIndex);
        });
      });
    }

    function toggleProfileMenu() {
      notificationMenu.style.display = "none";
      profileMenuWrapper.style.display =
        profileMenuWrapper.style.display === "flex" ? "none" : "flex";

      const isExpanded =
        profileMenuTrigger.attributes["aria-expanded"].value === "true";
      if (isExpanded) {
        closeProfileMenu();
      } else {
        openProfileMenu();
      }
    }

    profileMenuTrigger.addEventListener("click", toggleProfileMenu);
  }

  function notificationToggleLogic() {
    // notification menu logic
    function handleNotificationMenuArrowKeyPress(event, menuItemIndex) {
      const isLastMenuItem =
        menuItemIndex === allNotificationMenuItems.length - 1;
      const isFirstMenuItem = menuItemIndex === 0;
      const nextMenuItem = allNotificationMenuItems.item(menuItemIndex + 1);
      const previousMeunItem = allNotificationMenuItems.item(menuItemIndex - 1);

      if (event.key === "ArrowRight") {
        if (isLastMenuItem) {
          allNotificationMenuItems.item(0).focus();
          return;
        }
        nextMenuItem.focus();
      }
      if (event.key === "ArrowLeft") {
        if (isFirstMenuItem) {
          allNotificationMenuItems.item(0).focus();
        }
        previousMeunItem.focus();
      }
    }
    function handleNotificationMenuEscKeyPress(event) {
      if (event.key === "Escape") {
        toggleNotificationMenu(); // basically gonna close up and cean everything
      }
    }

    function openNotificationMenu() {
      notificationTrigger.ariaExpanded = "true";
      allNotificationMenuItems.item(0).focus();
      // console.log(allNotificationMenuItems);

      notificationMenu.addEventListener(
        "keyup",
        handleNotificationMenuEscKeyPress
      );

      allNotificationMenuItems.forEach(function (menuItem, menuItemIndex) {
        menuItem.addEventListener("keyup", function (event) {
          handleNotificationMenuArrowKeyPress(event, menuItemIndex);
        });
      });
    }

    function closeNotificationMenu() {
      notificationTrigger.ariaExpanded = "false";
      notificationTrigger.focus();
    }

    function toggleNotificationMenu() {
      profileMenuWrapper.style.display = "none";
      notificationMenu.style.display =
        notificationMenu.style.display === "flex" ? "none" : "flex";

      const isExpandedNotificationMenu =
        notificationTrigger.attributes["aria-expanded"].value === "true";
      if (isExpandedNotificationMenu) {
        closeNotificationMenu();
      } else {
        openNotificationMenu();
      }
    }

    notificationTrigger.addEventListener("click", toggleNotificationMenu);
  }
  profileToggleLogic();
  notificationToggleLogic();
});
