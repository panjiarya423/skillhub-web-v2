document.addEventListener("DOMContentLoaded", function () {

    /* FITUR 1: AUTOMATIC LIGHT/DARK THEME SWITCHER */
    const navbarNav = document.querySelector(".navbar .navbar-nav");
    if (navbarNav) {
        const themeLi = document.createElement("li");
        themeLi.className = "nav-item d-flex align-items-center ms-lg-3 mt-2 mt-lg-0";
        themeLi.innerHTML = `
            <button id="themeToggle" class="btn btn-sm btn-outline-light rounded-pill px-3 py-1" style="font-size: 0.85rem;">
                 Dark Mode
            </button>
        `;
        navbarNav.appendChild(themeLi);

        const themeToggle = document.getElementById("themeToggle");
        const currentTheme = localStorage.getItem("theme") || "light";
        
        document.documentElement.setAttribute("data-bs-theme", currentTheme);
        updateThemeToggleUI(currentTheme);

        themeToggle.addEventListener("click", function () {
            const theme = document.documentElement.getAttribute("data-bs-theme");
            const newTheme = theme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeToggleUI(newTheme);
        });
    }

    function updateThemeToggleUI(theme) {
        const themeToggle = document.getElementById("themeToggle");
        if (themeToggle) {
            themeToggle.innerHTML = theme === "dark" ? " Light Mode" : " Dark Mode";
            themeToggle.className = theme === "dark" ? "btn btn-sm btn-outline-warning rounded-pill px-3 py-1" : "btn btn-sm btn-outline-light rounded-pill px-3 py-1";
        }
    }

    /* FITUR 2: REAL-TIME COUNTDOWN TIMER (FOMO ENGINE) untuk index.html */
    const countdownContainer = document.getElementById("countdownBox");
    if (countdownContainer) {
        let targetTime = new Date();
        targetTime.setHours(targetTime.getHours() + 14); 

        const interval = setInterval(function () {
            const now = new Date().getTime();
            const gap = targetTime - now;

            const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((gap % (1000 * 60)) / 1000);

            document.getElementById("timerHours").innerText = String(hours).padStart(2, '0');
            document.getElementById("timerMinutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("timerSeconds").innerText = String(seconds).padStart(2, '0');

            if (gap < 0) {
                clearInterval(interval);
                countdownContainer.innerHTML = "<span class='text-danger fw-bold'>Promo Kuota Batch Ini Selesai!</span>";
            }
        }, 1000);
    }

    /* FITUR 3: ANIMATED COUNTER UP (SOCIAL PROOF INJECTOR) untuk index.html */
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute("data-target"));
        let startValue = 0;
        const animationSpeed = targetValue / 40; 

        const runCounter = () => {
            startValue += animationSpeed;
            if (startValue < targetValue) {
                stat.innerText = Math.floor(startValue) + "+";
                setTimeout(runCounter, 25);
            } else {
                stat.innerText = targetValue + "+";
            }
        };
        runCounter();
    });

    /* FITUR 4: LIVE SEARCH CARD FILTER untuk katalog.html */
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const filterValue = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll(".course-card");

            cards.forEach(function (card) {
                const title = card.querySelector(".card-title").textContent.toLowerCase();
                const description = card.querySelector(".card-text").textContent.toLowerCase();

                if (title.includes(filterValue) || description.includes(filterValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    /* FITUR 5: AUTOMATIC PRICE CALCULATOR & LIVE VALIDATION untuk daftar.html */
    const programSelect = document.getElementById("programSelect");
    const priceDisplay = document.getElementById("priceDisplay");
    const registrationForm = document.getElementById("registrationForm");
    const alertBox = document.getElementById("alertBox");

    if (programSelect && priceDisplay) {
        programSelect.addEventListener("change", function () {
            const selectedOption = programSelect.value;
            let currentPrice = "Rp 0";

            if (selectedOption === "data") {
                currentPrice = "Rp 1.499.000";
            } else if (selectedOption === "excel") {
                currentPrice = "Rp 499.000";
            }

            priceDisplay.innerHTML = `Total Investasi: <strong class="text-primary">${currentPrice}</strong>`;
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault(); 

            const fullName = document.getElementById("fullName").value.trim();
            const userEmail = document.getElementById("userEmail").value.trim();
            const userPhone = document.getElementById("userPhone").value.trim();
            const selectedProgram = programSelect.value;

            alertBox.innerHTML = "";

            if (fullName === "" || userEmail === "" || userPhone === "" || !selectedProgram) {
                showAlert("Harap isi semua kolom pendaftaran yang wajib tersedia!", "danger");
                return;
            }

            if (!userEmail.includes("@")) {
                showAlert("Format alamat email yang kamu masukkan tidak valid (Wajib menggunakan @)!", "danger");
                return;
            }

            if (isNaN(userPhone) || userPhone.length < 10) {
                showAlert("Nomor WhatsApp harus berupa susunan angka dan minimal sepanjang 10 digit!", "danger");
                return;
            }

            showAlert(`Selamat <strong>${fullName}</strong>! Pendaftaranmu berhasil dikirimkan. Tim kami akan segera menghubungimu lewat WA.`, "success");
            registrationForm.reset();
            priceDisplay.innerHTML = `Total Investasi: <strong class="text-primary">Rp 0</strong>`;
        });
    }

    function showAlert(message, type) {
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    /* FITUR 6: DYNAMIC DETAIL PAGE untuk detail-program.html */
    const programVideo = document.getElementById("programVideo");
    
    if (programVideo) {
        const urlParams = new URLSearchParams(window.location.search);
        const programCode = urlParams.get('program') || 'data'; 

        // Database konten program
        const courseData = {
            data: {
                title: "Cuplikan Kelas Data Analyst",
                videoSrc: "https://www.youtube.com/embed/rGx1QNdYzvs?si=VF9atIfHZAtcxzUJ", 
                desc: "Program Data Analyst ini dirancang secara khusus untuk membekali Anda dengan keahlian teknis bernilai tinggi yang langsung bisa diterapkan di dunia kerja nyata, seperti pengolahan database menggunakan SQL, bahasa pemrograman Python, dan teknik visualisasi interaktif dengan Tableau.",
                syllabus: [
                    "Sesi 1: Pengenalan Mindset & Fundamental Data",
                    "Sesi 2: Pengolahan Database Menggunakan SQL",
                    "Sesi 3: Teknik Visualisasi dengan Tableau",
                    "Sesi 4: Final Project Presentasi Mandiri"
                ]
            },
            excel: {
                title: "Cuplikan Kelas Microsoft Excel",
                videoSrc: "https://www.youtube.com/embed/Y8xhrUa3KH4?si=mtz_to5fR4A-cwme", // Bisa diganti dengan link ID Video Youtube Excel yang asli
                desc: "Masterclass Excel ini akan mengajarkan Anda cara mengotomatisasi pekerjaan administratif, membedah data kompleks dengan cepat menggunakan Pivot Table, dan memahami dasar Macro/VBA untuk meningkatkan efisiensi waktu kerja Anda di kantor secara signifikan.",
                syllabus: [
                    "Sesi 1: Pengenalan Advanced Formulas (VLOOKUP, INDEX MATCH)",
                    "Sesi 2: Analisis Data Menggunakan Pivot Table",
                    "Sesi 3: Pembuatan Dashboard Excel Interaktif",
                    "Sesi 4: Pengantar Macro & VBA Dasar"
                ]
            }
        };

        const selectedCourse = courseData[programCode];

        if (selectedCourse) {
            // teks dan link video
            document.getElementById("programTitle").innerText = selectedCourse.title;
            document.getElementById("programVideo").src = selectedCourse.videoSrc;
            document.getElementById("programDesc").innerText = selectedCourse.desc;
            
            // list silabus
            const syllabusContainer = document.getElementById("syllabusList");
            syllabusContainer.innerHTML = ""; 
            
            selectedCourse.syllabus.forEach(item => {
                const li = document.createElement("li");
                li.className = "list-group-item bg-transparent";
                li.innerText = item;
                syllabusContainer.appendChild(li);
            });
        }
    }

});