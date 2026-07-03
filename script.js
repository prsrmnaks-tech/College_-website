        const progressBar = document.getElementById("progressBar");
        const notification = document.getElementById("notification");
        const darkToggle = document.getElementById("darkToggle");
        const scrollTop = document.getElementById("scrollTop");
        const sliderWrapper = document.getElementById("sliderWrapper");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const sliderDots = document.getElementById("sliderDots");
        const slides = Array.from(document.querySelectorAll(".slider-slide"));
        let currentSlide = 0;
        let notificationTimer;

        function showNotification(message) {
            clearTimeout(notificationTimer);
            notification.textContent = message;
            notification.classList.add("show");
            notificationTimer = setTimeout(() => {
                notification.classList.remove("show");
            }, 2600);
        }

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll(".slider-dot").forEach((dot, index) => {
                dot.classList.toggle("active", index === currentSlide);
            });
        }

        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "slider-dot";
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
            dot.addEventListener("click", () => {
                currentSlide = index;
                updateSlider();
            });
            sliderDots.appendChild(dot);
        });

        prevBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });

        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);

        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            darkToggle.textContent = document.body.classList.contains("dark-mode") ? "Light" : "Dark";
        });

        document.getElementById("imageUpload").addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const bannerImage = document.getElementById("bannerImage");
                bannerImage.src = loadEvent.target.result;
                bannerImage.style.display = "block";
                showNotification("Banner image updated.");
            };
            reader.readAsDataURL(file);
        });

        document.getElementById("calcBtn").addEventListener("click", () => {
            const programSelect = document.getElementById("programSelect");
            const years = Math.max(1, Number(document.getElementById("yearsInput").value || 1));
            const annualFee = Number(programSelect.value);
            const total = annualFee * years;
            const programName = programSelect.options[programSelect.selectedIndex].text;
            const feeResult = document.getElementById("feeResult");

            feeResult.textContent = `${programName} total for ${years} year(s): Rs. ${total.toLocaleString("en-IN")}`;
            feeResult.classList.add("show");
        });

        function animateNumber(id, target, suffix = "") {
            const element = document.getElementById(id);
            let current = 0;
            const steps = 60;
            const increment = target / steps;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Number.isInteger(target)
                    ? `${Math.round(current).toLocaleString("en-IN")}${suffix}`
                    : `${current.toFixed(2)}${suffix}`;
            }, 24);
        }

        let statsStarted = false;
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsStarted) {
                statsStarted = true;
                animateNumber("highestStat", 55);
                animateNumber("avgStat", 9.59);
                animateNumber("companiesStat", 1200, "+");
            }
        }, { threshold: 0.35 });

        statsObserver.observe(document.querySelector(".placement-stats"));

        window.addEventListener("scroll", () => {
            const scrollTopValue = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = `${(scrollTopValue / height) * 100}%`;
            scrollTop.classList.toggle("show", scrollTopValue > 420);
        });

        scrollTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        updateSlider();
        setTimeout(() => showNotification("Welcome to SRMIST."), 700);