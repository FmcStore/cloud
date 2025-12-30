document.addEventListener('DOMContentLoaded', () => {
  // Loading Animation
  setTimeout(() => {
    document.querySelector('.loading').classList.add('hidden');
  }, 800);

  // Footer Year
  document.getElementById('displayYear').innerText = new Date().getFullYear();

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stats')) {
          animateCounter();
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.querySelector('.nav-menu');
  
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

  // Back To Top
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });

  // Notification Banner
  setTimeout(() => {
    const notif = document.getElementById('notification');
    notif.classList.add('show');
    setTimeout(() => {
      notif.classList.remove('show');
    }, 5000);
  }, 2000);

  // FAQ Toggle
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', function() {
      const parent = this.parentElement;
      parent.classList.toggle('active');
    });
  });

  // Statistics Counter
  let counted = false;
  function animateCounter() {
    if (counted) return;
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      let count = 0;
      const updateCount = () => {
        const increment = target / 50;
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    counted = true;
  }

  // Battery Check
  const batteryLevel = document.getElementById('battery-level');
  const batteryPercent = document.getElementById('battery-percent');
  
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      updateBattery(battery);
      battery.addEventListener('levelchange', () => updateBattery(battery));
    });
  } else {
    batteryPercent.innerText = "N/A";
  }

  function updateBattery(battery) {
    const level = Math.round(battery.level * 100);
    batteryLevel.style.width = level + '%';
    batteryPercent.innerText = level + '%';
    
    if (level < 20) batteryLevel.style.background = '#ef4444';
    else if (level < 50) batteryLevel.style.background = '#f59e0b';
    else batteryLevel.style.background = '#2ecc71';
  }

  // Connection Check
  const checkBtn = document.getElementById('checkConnectionBtn');
  checkBtn.addEventListener('click', () => {
    checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    
    setTimeout(() => {
      const ping = Math.floor(Math.random() * 80) + 20;
      document.getElementById('ping-ms').innerText = ping + ' ms';
      document.getElementById('website-status').innerText = 'Online';
      
      const indicator = document.getElementById('ping-indicator');
      indicator.className = 'ping-indicator';
      if(ping < 50) indicator.classList.add('ping-excellent');
      else indicator.classList.add('ping-good');
      
      checkBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Status';
    }, 1000);
  });

  // Live Chat
  const chatToggle = document.getElementById('chatToggle');
  const chatWidget = document.getElementById('liveChatWidget');
  const chatClose = document.getElementById('chatClose');
  const chatSend = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  chatToggle.addEventListener('click', () => {
    chatWidget.classList.add('active');
    chatToggle.style.display = 'none';
  });

  chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('active');
    chatToggle.style.display = 'flex';
  });

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const txt = chatInput.value.trim();
    if (txt) {
      appendMessage(txt, 'user');
      chatInput.value = '';
      setTimeout(() => {
        appendMessage('Terima kasih, admin akan segera membalas.', 'bot');
      }, 1000);
    }
  }

  function appendMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('chat-message', sender);
    div.innerHTML = `
      <div class="chat-text">${text}</div>
      <div class="chat-avatar">${sender === 'user' ? 'Me' : 'CS'}</div>
    `;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Contact Form
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pesan terkirim! Kami akan menghubungi Anda segera.');
    e.target.reset();
  });

  // Countdown Timer
  function updateCountdown() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59); // Promo ends at midnight
    
    const diff = end - now;
    if (diff < 0) return;

    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
  }
  setInterval(updateCountdown, 1000);
});