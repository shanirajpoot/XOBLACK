document
.getElementById("nav-toggle")
.addEventListener("click", function () {
  document.getElementById("nav-content").classList.toggle("hidden");
});

// dopdown menu
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
    }
});



// options rendering function js 
const options = ["Yes of course!", "Likely to lose", "I'm hoping for a tie!"];
const votes = [0, 0, 0]; // Initial votes
let totalVotes = 0;

const pollContainer = document.getElementById("poll-options");
const totalVotesText = document.getElementById("total-votes");

function renderPoll() {
    pollContainer.innerHTML = ""; // Clear existing content

    options.forEach((option, index) => {
        const percentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;

        const pollOption = `
            <div class="mb-2 relative">
                <button onclick="vote(${index})" class="w-[100%] flex justify-between items-center px-4 py-2 rounded-lg border border-gray-300 relative overflow-hidden">
                    <span class="relative z-10 text-xs text-gray-700">${option}</span>
                    <span class="relative z-10 text-gray-700 text-xs">${Math.round(percentage)}%</span>
                    <div class="absolute top-0 text-xs left-0 h-full bg-blue-500 transition-all duration-300" style="width: ${percentage}%;"></div>
                </button>
            </div>
        `;

        pollContainer.innerHTML += pollOption;
    });
}

function vote(index) {
    votes[index]++;
    totalVotes++;
    totalVotesText.textContent = `${totalVotes} vote • Ends in 23:00:00`;
    renderPoll();
}

renderPoll(); // Initial render

// <!-- text area with btn start -->
document.querySelectorAll(".commentBox").forEach((textarea) => {
    let sendButton = textarea.nextElementSibling; // Get the send button for this textarea
  
    textarea.addEventListener("input", function () {
      this.style.height = "auto"; // Reset height
      this.style.height = this.scrollHeight + "px"; // Adjust to content
      sendButton.classList.toggle("hidden", this.value.trim() === ""); // Show/hide send button
    });
  });
  
// <!-- text area with btn end -->


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// #################################### Xoblack Profile page js ####################################


// // ############################################# for cover image
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editProfileModal");
    const openModalButton = document.getElementById("openModalButton");
    const closeModalButton = document.getElementById("closeModalButton");
    const profileUpload = document.getElementById("profileUpload");
    const profileImage = document.querySelector("#editProfileModal img");
    const cameraButton = document.querySelector("#editProfileModal .group");
    const popup = document.getElementById("popup");
  
    let fileSelected = false; // Flag to prevent multiple triggers
  
    // Open modal when clicking "Edit Profile" button
    openModalButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  
    // Close modal when clicking close button
    closeModalButton.addEventListener("click", closeModal);
  
    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  
    function closeModal() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  
    // Show success popup when clicking "Save"
    window.showPopup = function () {
      popup.classList.remove("opacity-0", "scale-90");
      popup.classList.add("opacity-100", "scale-100");
  
      setTimeout(() => {
        popup.classList.remove("opacity-100", "scale-100");
        popup.classList.add("opacity-0", "scale-90");
        closeModal();
      }, 2000);
    };
  
    // Open file selection when clicking the camera button
    cameraButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents event bubbling
      if (!fileSelected) {
        fileSelected = true; // Mark file as selected
        profileUpload.click(); // Open file picker
      }
    });
  
    // Handle profile image change correctly
    profileUpload.addEventListener("change", function (event) {
      if (!event.target.files.length) {
        fileSelected = false; // Reset if no file is selected
        return;
      }
  
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          profileImage.src = event.target.result; // Update the profile image
          fileSelected = false; // Reset flag after updating
        };
        reader.readAsDataURL(file);
      }
  
      // **Fix:** Reset input value properly to allow reselection
      setTimeout(() => {
        profileUpload.value = "1";
      }, 500);
    });
  });


// ################################################ likes buttons js #########################
 // ########################### Xoblack like button js ####################################
 document.querySelectorAll(".likeButton").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const countSpan = this.querySelector(".likeCount");
      let count = parseInt(countSpan.innerText);

      if (icon.classList.contains("text-gray-500")) {
        // Like: Change to red and increase count
        icon.classList.remove("text-gray-500");
        icon.classList.add("text-red-500");
        count++;
      } else {
        // Unlike: Change back to gray and decrease count
        icon.classList.remove("text-red-500");
        icon.classList.add("text-gray-500");
        count--;
      }

      countSpan.innerText = count; // Update the count in UI
    });
  });
  // ########################### Xoblack repost button js ####################################
  document.querySelectorAll(".repostButton").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const countSpan = this.querySelector(".repostCount");
      let count = parseInt(countSpan.innerText);

      if (icon.classList.contains("text-gray-500")) {
        // Change icon color to green and rotate
        icon.classList.remove("text-gray-500");
        icon.classList.add("text-green-500");
        icon.classList.add("rotate-animation");
        count++; // Increase count
      } else {
        // Reset back to gray and remove rotation
        icon.classList.remove("text-green-500");
        icon.classList.add("text-gray-500");
        icon.classList.remove("rotate-animation");
        void icon.offsetWidth; // Reset animation
        count--; // Decrease count
      }

      countSpan.innerText = count; // Update count in UI
    });
  });
  // ########################### Xoblack repost button js ####################################
  document.querySelectorAll(".shareButton").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const countSpan = this.querySelector(".shareCount");
      let count = parseInt(countSpan.innerText);

      // Simulate a share action
      alert("Shared successfully! 📤"); // You can replace this with actual sharing logic

      // Change color to blue and increase count
      icon.classList.remove("text-gray-500");
      icon.classList.add("text-blue-500");
      count++;

      countSpan.innerText = count; // Update count in UI
    });
  });
  // ########################### Xoblack repost button js ####################################
  document.querySelectorAll(".saveButton").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");

      if (icon.classList.contains("fa-bookmark")) {
        // Change to saved state (filled bookmark, blue color)
        icon.classList.remove("fa-bookmark");
        icon.classList.add("fa-solid", "fa-bookmark", "text-blue-500");
      } else {
        // Change back to unsaved state (default bookmark)
        icon.classList.remove("text-blue-500");
        icon.classList.add("fa-bookmark");
      }
    });
  });
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ create post-post .js #############################
  document.getElementById("editSchedule").addEventListener("click", function () {
    let input = document.getElementById("scheduleInput");

    // Set default value to current displayed date
    let currentDate = "2024-09-06T00:15";
    input.value = currentDate;

    // Open date picker
    input.classList.remove("hidden");
    input.focus();

    input.addEventListener("change", function () {
        let newDate = new Date(input.value);
        let formattedDate = newDate.toLocaleString("en-US", {
            weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true
        });

        document.getElementById("scheduleTime").textContent = formattedDate;
        input.classList.add("hidden"); // Hide input after selecting
    });
});

document.getElementById("deletePost").addEventListener("click", function () {
    let confirmDelete = confirm("Are you sure you want to delete this scheduled post?");
    if (confirmDelete) {
        document.querySelector(".post-info").remove();
    }
});








// modals js start
    function hideAllModals() {
        for (let i = 0; i <= 6; i++) {
          const modal = document.getElementById("modal" + i);
          if (modal) modal.style.display = "none";
        }
      }

      function showModal(id) {
        hideAllModals();
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "block"; // Ensures visibility
      }

      document.addEventListener("DOMContentLoaded", function () {
        hideAllModals(); // hide all modals initially
      });
      // modals js end
