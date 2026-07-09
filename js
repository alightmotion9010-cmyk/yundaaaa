/* =========================================================
   ⚙️ KONFIGURASI — GANTI BAGIAN INI SESUAI KEBUTUHANMU
   ========================================================= */
const CONFIG = {
  // Nama yang akan tampil di judul & ucapan
  name: "Sayang",

  // Password = tanggal lahir. Isi sementara masih ACAK, GANTI ini.
  // Boleh ditulis dengan format DD-MM-YYYY atau DDMMYYYY, keduanya diterima.
  password: "14-06-1999",

  // Pesan random kalau password salah
  wrongMessages: [
    "Yah, salah tuh 😅 coba inget-inget lagi ya",
    "Bukan itu tanggalnya... masa lupa ulang tahun sendiri? 😂",
    "Hmm, belum tepat. Coba sekali lagi dong 🥺",
    "Eits, keliru! Ayo dicoba lagi pelan-pelan",
    "Bukan ituu, coba ketik ulang ya 💗",
    "Wah meleset, semangat coba lagi!",
    "Belum cocok nih kuncinya, coba lagi ya sayang"
  ]
};

/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // isi nama di semua tempat yang butuh
  document.querySelectorAll("#nameDisplay, #nameDisplay2").forEach(el => {
    el.textContent = CONFIG.name;
  });

  const landing = document.getElementById("landing");
  const passwordScreen = document.getElementById("passwordScreen");
  const celebration = document.getElementById("celebration");

  const enterBtn = document.getElementById("enterBtn");
  const backBtn = document.getElementById("backBtn");
  const passForm = document.getElementById("passForm");
  const passInput = document.getElementById("passInput");
  const errorMsg = document.getElementById("errorMsg");

  function showScreen(el) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    el.classList.add("active");
  }

  enterBtn.addEventListener("click", () => {
    showScreen(passwordScreen);
    passInput.focus();
  });

  backBtn.addEventListener("click", () => showScreen(landing));

  function normalize(str) {
    return str.replace(/[^0-9]/g, "");
  }

  passForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const guess = normalize(passInput.value);
    const answer = normalize(CONFIG.password);

    if (guess.length > 0 && guess === answer) {
      errorMsg.textContent = "";
      showScreen(celebration);
      startCelebration();
    } else {
      const msg = CONFIG.wrongMessages[Math.floor(Math.random() * CONFIG.wrongMessages.length)];
      errorMsg.textContent = msg;
      passInput.classList.add("shake");
      setTimeout(() => passInput.classList.remove("shake"), 400);
    }
  });

  /* ---------- PHOTO REVEAL ---------- */
  const photoFrame = document.getElementById("photoFrame");
  function togglePhoto() {
    photoFrame.classList.toggle("open");
  }
  photoFrame.addEventListener("click", togglePhoto);
  photoFrame.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") togglePhoto();
  });

  /* ---------- GIFT BOX ---------- */
  const giftBox = document.getElementById("giftBox");
  const giftHint = document.getElementById("giftHint");
  const finalNote = document.getElementById("finalNote");
  let giftOpened = false;

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;
    giftBox.classList.add("opened");
    giftHint.textContent = "🐻 hai, salam kenal dari boneka kecilku!";
    setTimeout(() => finalNote.classList.add("show"), 600);
    launchConfetti(80);
  }
  giftBox.addEventListener("click", openGift);
  giftBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") openGift();
  });

  /* ---------- MUSIC ---------- */
  const bgm = document.getElementById("bgm");
  const musicToggle = document.getElementById("musicToggle");
  let isPlaying = false;

  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgm.pause();
      musicToggle.textContent = "🔈";
    } else {
      bgm.play().catch(() => {
        /* file musik belum ada / autoplay diblokir browser, tidak apa-apa */
      });
      musicToggle.textContent = "🔊";
    }
    isPlaying = !isPlaying;
  });

  /* ---------- CONFETTI ---------- */
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let confettiRunning = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const confettiColors = ["#FF6F91", "#FFD1DC", "#FFD166", "#C9184A", "#FFFFFF"];

  function launchConfetti(count = 120) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        size: 6 + Math.random() * 6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        life: 0,
        maxLife: 260 + Math.random() * 100
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(animateConfetti);
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    particles = particles.filter(p => p.life < p.maxLife && p.y < canvas.height + 40);
    if (particles.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiRunning = false;
    }
  }

  function startCelebration() {
    launchConfetti(160);
    // sedikit hujan confetti susulan biar meriah
    setTimeout(() => launchConfetti(60), 900);
    setTimeout(() => launchConfetti(60), 1800);
  }
});
