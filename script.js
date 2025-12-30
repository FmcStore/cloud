document.addEventListener('DOMContentLoaded', () => {
  // 1. Loading Animation
  setTimeout(() => {
    const loading = document.querySelector('.loading');
    if (loading) loading.classList.add('hidden');
  }, 800);

  // 2. Footer Year
  const yearElement = document.getElementById('displayYear');
  if (yearElement) yearElement.innerText = new Date().getFullYear();

  // 3. Scroll Animations (Fade In)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // 4. Navbar Scroll Effect & Back To Top
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (backToTop) {
      if (window.scrollY > 300) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

  if (document.getElementById('backToTop')) {
    document.getElementById('backToTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
      });
    });
  }

  // 6. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const icon = themeToggle.querySelector('i');
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    });
  }

  // 7. Notification Banner
  setTimeout(() => {
    const notif = document.getElementById('notification');
    if (notif) {
      notif.classList.add('show');
      setTimeout(() => { notif.classList.remove('show'); }, 6000);
    }
  }, 2000);

  // 8. FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', function() {
      const parent = this.parentElement;
      parent.classList.toggle('active');
    });
  });

  // 9. Connection Checker Simulation
  const checkBtn = document.getElementById('checkConnectionBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing Ping...';
      setTimeout(() => {
        const ping = Math.floor(Math.random() * 60) + 15; // Random 15-75ms
        document.getElementById('ping-ms').innerText = ping + ' ms';
        document.getElementById('website-status').innerText = 'Stable';
        
        const indicator = document.getElementById('ping-indicator');
        indicator.className = 'ping-indicator';
        if(ping < 40) indicator.classList.add('ping-excellent');
        else indicator.classList.add('ping-good');
        
        checkBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Test Lagi';
      }, 1500);
    });
  }

  // 10. Live Chat Widget
  const chatToggle = document.getElementById('chatToggle');
  const chatWidget = document.getElementById('liveChatWidget');
  const chatClose = document.getElementById('chatClose');
  const chatSend = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (chatToggle && chatWidget) {
    chatToggle.addEventListener('click', () => {
      chatWidget.classList.add('active');
      chatToggle.style.display = 'none';
    });
    chatClose.addEventListener('click', () => {
      chatWidget.classList.remove('active');
      chatToggle.style.display = 'flex';
    });

    const sendMessage = () => {
      const txt = chatInput.value.trim();
      if (txt) {
        appendMessage(txt, 'user');
        chatInput.value = '';
        setTimeout(() => {
          appendMessage('Silakan hubungi Admin via WhatsApp untuk Fast Respon ya kak.', 'bot');
        }, 1000);
      }
    };

    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }
  }

  function appendMessage(text, sender) {
    if (!chatBody) return;
    const div = document.createElement('div');
    div.classList.add('chat-message', sender);
    div.innerHTML = `<div class="chat-text">${text}</div>`;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // 11. Countdown Timer
  function updateCountdown() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59);
    
    const diff = end - now;
    if (diff < 0) return;

    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (hEl) hEl.innerText = h < 10 ? '0' + h : h;
    if (mEl) mEl.innerText = m < 10 ? '0' + m : m;
    if (sEl) sEl.innerText = s < 10 ? '0' + s : s;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();
});

// --- TAB FUNCTION (Outside DOMContentLoaded) ---
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }
  tablinks = document.getElementsByClassName("tab-btn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  setTimeout(() => {
     document.getElementById(tabName).classList.add("active");
  }, 10);
  evt.currentTarget.className += " active";
        }
