
  // Define the Khloud jQuery Plugin
  (function ($) {
    $.fn.khloud = function () {
      return this.each(function () {
        const gallery = $(this).find(".image");
        const previewBox = $(".preview-box");
        const previewImg = $(".preview-box img");
        const closeIcon = $(".preview-box .icon");
        const currentImg = $(".preview-box .current-img");
        const totalImg = $(".preview-box .total-img");
        const shadow = $(".shadow");

        let currentIndex = 0;

        // Function to update the preview box content
        function updatePreviewBox() {
          currentImg.text(currentIndex + 1);
          totalImg.text(gallery.length);
          previewImg.attr("src", gallery.eq(currentIndex).find("img").attr("src"));
        }

        // Function to open the preview box
        function openPreviewBox(index) {
          currentIndex = index;
          updatePreviewBox();
          previewBox.addClass("show");
        }

        // Function to close the preview box
        function closePreviewBox() {
          previewBox.removeClass("show");
          shadow.hide();
          $("body").css("overflow", "scroll");
        }

        // Event listener for each image in the gallery
        gallery.on("click", function () {
          openPreviewBox($(this).index());
          $("body").css("overflow", "hidden");
          shadow.show();
        });

        // Event listener for the close icon
        closeIcon.on("click", closePreviewBox);

        // Event listener for the previous button
        $(".preview-box .slide.prev").on("click", function () {
          currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
          updatePreviewBox();
        });

        // Event listener for the next button
        $(".preview-box .slide.next").on("click", function () {
          currentIndex = (currentIndex + 1) % gallery.length;
          updatePreviewBox();
        });

        // Add new image function
        $.fn.addNewImage = function (imageSource) {
          const newImage = $("<div class='image'><span><img src='" + imageSource + "' alt=''></span></div>");
          newImage.on("click", function () {
            openPreviewBox(gallery.length);
          });

          $(this).append(newImage);
          currentIndex = gallery.length - 1;
          updatePreviewBox();
        };
      });
    };
  })(jQuery);

  // Initialize the Khloud plugin on your gallery
  $(document).ready(function () {
    $(".gallery").khloud();
  });

  // Example: Add new images using the Khloud plugin directly in the code
  $(".gallery").khloud("addNewImage", "images\image 5.jpg");
  $(".gallery").khloud("addNewImage", "images/new-image-2.jpg");
  $(".gallery").khloud("addNewImage", "images/new-image-3.jpg");
  // Add as many images as needed
