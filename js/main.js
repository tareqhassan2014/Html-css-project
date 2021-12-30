/* -------------------
    All variables
    ---------------------- */
const carouselOne = document.getElementById("carouselOne"),
    colorStyle = document.querySelector(".js-color-style"),
    glassStyle = document.querySelector(".js-glass-style"),
    darkModeCheckbox = document.querySelector(".js-dark-mode"),
    styleSwitcher = document.querySelector(".js-style-switcher"),
    glassEffectCheckbox = document.querySelector(".js-glass-effect"),
    themeColorContainer = document.querySelector(".js-theme-colors"),
    testimonialImage = document.querySelector(".js-testimonial-img"),
    coursePreviewModal = document.querySelector(".js-course-preview-modal"),
    styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

let path = colorStyle.getAttribute("href").split("/");
path = path.slice(0, path.length - 1);

/* -------------------
    Main Function 
    ---------------------- */

(function () {
    /* -------------------
    Testimonial slider 
    ---------------------- */

    carouselOne &&
        carouselOne.addEventListener("slide.bs.carousel", function () {
            const activeItem = this.querySelector(".active");
            testimonialImage.src = activeItem.getAttribute(
                "data-js-animation-img"
            );
        });

    /* -------------------
    course preview Modal video 
    ---------------------- */

    coursePreviewModal &&
        coursePreviewModal.addEventListener("show.bs.modal", function () {
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime = 0;
        });

    coursePreviewModal &&
        coursePreviewModal.addEventListener("hide.bs.modal", function () {
            this.querySelector(".js-course-preview-video").pause();
        });

    /* -------------------
    style switcher
    ---------------------- */
    styleSwitcherToggler.addEventListener("click", function () {
        styleSwitcher.classList.toggle("open");
        this.querySelector("i").classList.toggle("fa-times");
        this.querySelector("i").classList.toggle("fa-cog");
    });

    /* -------------------
    theme colors
    ---------------------- */

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

    /* sec color */

    function setColor() {
        const localStorageColor = localStorage.getItem("color");

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

    /* -------------------
    Theme lite and dark mode
    ---------------------- */
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

    /* -------------------
    Theme glass effect
    ---------------------- */

    glassEffectCheckbox.addEventListener("click", function () {
        this.checked
            ? localStorage.setItem("glass-effect", "true")
            : localStorage.setItem("glass-effect", "false");

        setGlassEffect();
    });

    const setGlassEffect = () => {
        const glassEffect = localStorage.getItem("glass-effect");

        glassEffect === "true"
            ? glassStyle.removeAttribute("disabled")
            : (glassStyle.disabled = true);
    };

    localStorage.getItem("glass-effect") && setGlassEffect();

    if (!glassStyle.hasAttribute("disabled"))
        glassEffectCheckbox.checked = true;
})();
