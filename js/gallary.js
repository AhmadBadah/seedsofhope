$(document).ready(function () {
  const images = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg",
    "images/5.jpeg",
    "images/6.jpeg",
    "images/7.jpeg",
    "images/8.jpeg",
    "images/9.jpeg",
    "images/10.jpeg",
    "images/11.jpeg",
    "images/12.jpeg",
    "images/13.jpeg",
    "images/14.jpeg",
    "images/15.jpeg",
    "images/16.jpeg",

    // Add more image URLs here
  ];

  // Fisher-Yates shuffle algorithm to shuffle the array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function displayImages() {
    const $imageContainer = $("#lightGallery");
    $imageContainer.empty();

    // Function to get YouTube video ID from URL
    function getYouTubeID(url) {
      const regExp =
        /^.*(?:youtu\.be\/|youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|v=|shorts\/|.*?v=))([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[1].length > 0 ? match[1] : null;
    }
    // Function to create YouTube thumbnail URL
    function getYouTubeThumbnail(id) {
      return `https://img.youtube.com/vi/${id}/0.jpg`;
    }
    // Shuffle the images array
    const shuffledImages = shuffle(images);

    $.each(shuffledImages, function (index, url) {
      const isYouTube = url.includes("youtu");
      let fullImageUrl = url;
      let thumbnailUrl = url;
      let content;

      if (isYouTube) {
        const videoID = getYouTubeID(url);
        if (videoID) {
          thumbnailUrl = getYouTubeThumbnail(videoID);
          content = `<iframe src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
      } else {
        content = `<img src="${thumbnailUrl}" class="w-100 shadow-1-strong mb-3" />`;
      }
      const $li = $("<li></li>")
        .attr("data-title", `Title ${index}`)
        .attr("data-desc", `Description ${index}`)
        .attr("data-responsive-src", fullImageUrl)
        .attr("data-src", fullImageUrl)
        .addClass("col-4 col-md-2 mb-4");
      const $img = $("<img>")
        .attr("src", thumbnailUrl)
        .addClass("w-100 shadow-1-strong mb-3");

      if (isYouTube) {
        $img.css("cursor", "pointer");
        const $overlay = $('<div class="video-icon-overlay"></div>');
        const $videoIcon = $(
          '<img class="video-icon" src="images/youtube.svg">'
        );
        $overlay.append($videoIcon);
        $li.append($overlay);
      }

      $li.append($img).css("cursor", "pointer");
      $imageContainer.append($li);
    });
  }
  // Display images for both tabs
  displayImages();

  // Add event listeners for scroll buttons
  $("#next").on("click", function () {
    $("#lightGallery").animate(
      {
        scrollLeft: "+=300px",
      },
      "slow"
    );
  });

  $("#prev").on("click", function () {
    $("#lightGallery").animate(
      {
        scrollLeft: "-=300px",
      },
      "slow"
    );
  });

  $(document).on("keydown", function (e) {
    if (e.key === "ArrowRight") {
      $("#lightGallery").animate(
        {
          scrollLeft: "+=300px",
        },
        "slow"
      );
    } else if (e.key === "ArrowLeft") {
      $("#lightGallery").animate(
        {
          scrollLeft: "-=300px",
        },
        "slow"
      );
    }
  });
});
