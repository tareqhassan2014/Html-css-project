/* -------------------
 Testimonial slider
---------------------- */

const carouselOne = document.getElementById("carouselOne"),
    testimonialImage = document.querySelector(".js-testimonial-img");

(function () {
    carouselOne &&
        carouselOne.addEventListener("slide.bs.carousel", function () {
            const activeItem = this.querySelector(".active");
            testimonialImage.src = activeItem.getAttribute(
                "data-js-animation-img"
            );
        });
})();

/* -------------------
course preview video
---------------------- */

(function () {
    const coursePreviewModal = document.querySelector(
        ".js-course-preview-modal"
    );

    coursePreviewModal &&
        coursePreviewModal.addEventListener("show.bs.modal", function () {
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime = 0;
        });

    coursePreviewModal &&
        coursePreviewModal.addEventListener("hide.bs.modal", function () {
            this.querySelector(".js-course-preview-video").pause();
        });
})();

/* -------------------
style switcher
---------------------- */

(function () {
    const styleSwitcher = document.querySelector(".js-style-switcher"),
        styleSwitcherToggler = document.querySelector(
            ".js-style-switcher-toggler"
        );

    styleSwitcherToggler.addEventListener("click", function () {
        styleSwitcher.classList.toggle("open");
        this.querySelector("i").classList.toggle("fa-times");
        this.querySelector("i").classList.toggle("fa-cog");
    });
})();

/* -------------------
theme colors
---------------------- */

const colorStyle = document.querySelector(".js-color-style"),
    themeColorContainer = document.querySelector(".js-theme-colors");

let path = colorStyle.getAttribute("href").split("/");
path = path.slice(0, path.length - 1);

(function () {
    themeColorContainer.addEventListener("click", ({ target }) => {
        if (target.classList.contains("js-theme-color-item")) {
            localStorage.setItem(
                "color",
                target.getAttribute("data-js-theme-color")
            );
            setColor();
        }
    });

    if (localStorage.getItem("color") !== null) {
        setColor();
    }
})();

/* sec color */

function setColor() {
    const localStorageColor = localStorage.getItem("color");

    console.log("call setColor");

    colorStyle.setAttribute(
        "href",
        `${path.join("/")}/${localStorageColor}.css`
    );

    if (document.querySelector(".js-theme-color-item.active")) {
        document
            .querySelector(".js-theme-color-item.active")
            .classList.remove("active");
    }

    document
        .querySelector(`[data-js-theme-color=${localStorageColor}]`)
        .classList.add("active");
}

/* Theme lite and dark mode */

const darkModeCheckbox = document.querySelector(".js-dark-mode");

(function () {
    darkModeCheckbox.addEventListener("click", function () {
        this.checked
            ? localStorage.setItem("theme-dark", "true")
            : localStorage.setItem("theme-dark", "false");

        themeMode();
    });

    const themeMode = () => {
        const themeDark = localStorage.getItem("theme-dark");

        if (themeDark === "true") {
            document.body.classList.add("t-dark");
            darkModeCheckbox.checked = true;
        } else {
            document.body.classList.remove("t-dark");
            darkModeCheckbox.checked = false;
        }
    };

    const themeDark = localStorage.getItem("theme-dark");

    themeDark && themeMode();
})();
