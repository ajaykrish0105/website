/* =========================================================================
   HARISH'S PORTFOLIO, CINEMA VIDEOGRAPHY & CREATOR DASHBOARD ENGINE
   Director: Harish
   WhatsApp: +91 9940826494
   Email: Harish14021204@gmail.com
   Instagram: @krishhhh.verse
   ========================================================================= */

// 1. CONFIGURATION
const HARISH_CONFIG = {
  ADMIN_PIN: '7777', // Initial secret PIN
  WHATSAPP_NUMBER: '919940826494', // Harish's WhatsApp number
  EMAIL: 'Harish14021204@gmail.com', // Harish's Email
  PORTFOLIO_KEY: 'harish_portfolio_data_v1',
  INQUIRIES_KEY: 'harish_inquiries_data_v1',
  PASSWORD_KEY: 'harish_custom_password_v1'
};

// Password Helper
function getAdminPassword() {
  return localStorage.getItem(HARISH_CONFIG.PASSWORD_KEY) || HARISH_CONFIG.ADMIN_PIN;
}

function setAdminPassword(newPass) {
  localStorage.setItem(HARISH_CONFIG.PASSWORD_KEY, newPass);
}

// INITIAL SEED PORTFOLIO
const DEFAULT_PORTFOLIO = [
  {
    id: '1',
    title: 'CINEMATIC BRAND NARRATIVE',
    category: 'videography',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1000&auto=format&fit=crop&q=80',
    desc: 'Cinema Camera • 24fps • DaVinci Color Grade'
  },
  {
    id: '2',
    title: 'EDITORIAL ARCHITECTURE & PORTRAIT',
    category: 'photography',
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=90',
    thumbUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80',
    desc: '85mm Prime • Natural Light • Retouch'
  },
  {
    id: '3',
    title: 'VIRAL COMMERCIAL AD CUT',
    category: 'reels',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    desc: '9:16 Vertical • Sound Design • 4K Master'
  },
  {
    id: '4',
    title: 'NATURAL STONE & URBAN TEXTURES',
    category: 'photography',
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&auto=format&fit=crop&q=90',
    thumbUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&auto=format&fit=crop&q=80',
    desc: '35mm Prime • Film Grain Emulation'
  },
  {
    id: '5',
    title: 'NARRATIVE MOVIE & MUSIC MASTER',
    category: 'videography',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1000&auto=format&fit=crop&q=80',
    desc: '2.39:1 Scope • Anamorphic Look'
  },
  {
    id: '6',
    title: 'HIGH SPEED AUTOMOTIVE REEL',
    category: 'reels',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80',
    desc: 'Gimbal Track • Speed Ramp • 4K 60fps'
  }
];

// STATE MANAGEMENT
let currentCategory = 'all';
let selectedLocalFile = null;

// Data Getters and Setters
function getPortfolio() {
  const saved = localStorage.getItem(HARISH_CONFIG.PORTFOLIO_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return DEFAULT_PORTFOLIO;
    }
  }
  return DEFAULT_PORTFOLIO;
}

function savePortfolio(items) {
  localStorage.setItem(HARISH_CONFIG.PORTFOLIO_KEY, JSON.stringify(items));
}

function getInquiries() {
  const saved = localStorage.getItem(HARISH_CONFIG.INQUIRIES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveInquiries(items) {
  localStorage.setItem(HARISH_CONFIG.INQUIRIES_KEY, JSON.stringify(items));
}

// Global modal helpers
function showModal(modalElem) {
  if (!modalElem) return;
  modalElem.classList.remove('hidden');
  modalElem.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideModal(modalElem) {
  if (!modalElem) return;
  modalElem.classList.remove('active');
  modalElem.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cinema-canvas')) initCinemaThreeJs();
  if (document.getElementById('portfolio-grid')) initPortfolio();
  if (document.getElementById('media-modal')) initMediaModal();
  if (document.getElementById('booking-form')) initBookingForm();
  if (document.getElementById('mobile-menu-btn')) initMobileMenu();
});

/* =========================================================================
   1. THREE.JS SUBTLE AMBIENT MOTES (WARM LIMESTONE & CEMENT PARTICLES)
   ========================================================================= */
function initCinemaThreeJs() {
  const canvas = document.getElementById('cinema-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const count = 220;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const stoneWarm = new THREE.Color('#cbb382');
  const stoneMuted = new THREE.Color('#7a766f');

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 110;
    positions[i3 + 1] = (Math.random() - 0.5) * 85;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;

    const c = Math.random() > 0.5 ? stoneWarm : stoneMuted;
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let clock = new THREE.Clock();

  function render() {
    requestAnimationFrame(render);
    const time = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.03;
    targetY += (mouseY - targetY) * 0.03;

    particles.rotation.y = time * 0.015 + targetX * 0.12;
    particles.rotation.x = time * 0.008 + targetY * 0.08;

    renderer.render(scene, camera);
  }
  render();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* =========================================================================
   2. PORTFOLIO SHOWCASE & FILTERING
   ========================================================================= */
function renderPortfolioGrid() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const items = getPortfolio();
  grid.innerHTML = '';

  const filtered = items.filter(item => {
    if (currentCategory === 'all') return true;
    return item.category === currentCategory;
  });

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'portfolio-item rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer group relative';
    card.setAttribute('data-id', item.id);

    const isVideo = item.mediaType === 'video';
    const badgeText = item.category === 'videography' ? 'Cinema & Film' : (item.category === 'photography' ? 'Photography' : 'Reel / Ad');

    card.innerHTML = `
      <div class="relative aspect-video w-full overflow-hidden bg-raw-charcoal media-wrapper">
        <img src="${item.thumbUrl || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800'}" alt="${item.title}" class="media-thumb w-full h-full object-cover">
        
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 rounded-sm bg-raw-wall/90 border border-raw-border font-mono text-[9px] uppercase tracking-wider text-raw-sand">
            ${badgeText}
          </span>
        </div>

        <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <div class="w-11 h-11 rounded-sm bg-raw-sand text-raw-charcoal flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
            <i data-lucide="${isVideo ? 'play' : 'maximize-2'}" class="w-4 h-4 ${isVideo ? 'translate-x-0.5' : ''}"></i>
          </div>
        </div>
      </div>

      <div class="p-5 flex flex-col flex-1 justify-between bg-raw-stucco border-t border-raw-border">
        <div>
          <h3 class="font-serif text-sm text-raw-linen group-hover:text-raw-sand transition-colors uppercase font-medium tracking-wide">${item.title}</h3>
          <p class="font-mono text-[11px] text-raw-cement mt-1">${item.desc || 'Shot & Mastered by Harish'}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-raw-border flex items-center justify-between font-mono text-[11px] text-raw-cement">
          <span class="text-raw-ochre uppercase font-semibold">${isVideo ? 'Play Cinema Cut' : 'View Photograph'}</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-raw-cement group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      openMediaModal(item);
    });

    grid.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-raw-cement');
      });
      btn.classList.add('active');
      btn.classList.remove('text-raw-cement');

      currentCategory = btn.getAttribute('data-category');
      renderPortfolioGrid();
    });
  });

  renderPortfolioGrid();
}

/* =========================================================================
   3. MEDIA MODAL VIEWER (FULL HD PLAYER, DIRECT MP4 & LIGHTBOX)
   ========================================================================= */
function openMediaModal(item) {
  const modal = document.getElementById('media-modal');
  const iframe = document.getElementById('modal-video-iframe');
  const localVideo = document.getElementById('modal-local-video');
  const photo = document.getElementById('modal-photo-img');
  const title = document.getElementById('modal-media-title');
  const desc = document.getElementById('modal-media-desc');

  if (!modal) return;

  title.textContent = item.title;
  desc.textContent = item.desc || 'Cinematography & Photography by @krishhhh.verse';

  iframe.classList.add('hidden');
  iframe.src = '';
  localVideo.classList.add('hidden');
  localVideo.src = '';
  photo.classList.add('hidden');
  photo.src = '';

  if (item.mediaType === 'video') {
    const isDirectVideo = item.mediaUrl.startsWith('data:video') || 
                          item.mediaUrl.startsWith('blob:') || 
                          item.mediaUrl.endsWith('.mp4') || 
                          item.mediaUrl.endsWith('.webm') || 
                          item.mediaUrl.endsWith('.mov');

    if (isDirectVideo) {
      localVideo.classList.remove('hidden');
      localVideo.src = item.mediaUrl;
      localVideo.play().catch(() => {});
    } else {
      iframe.classList.remove('hidden');
      let videoSrc = item.mediaUrl;
      if (videoSrc.includes('youtube') && !videoSrc.includes('autoplay=1')) {
        videoSrc += (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
      }
      iframe.src = videoSrc;
    }
  } else {
    photo.classList.remove('hidden');
    photo.src = item.mediaUrl || item.thumbUrl;
  }

  showModal(modal);
}

function closeMediaModal() {
  const modal = document.getElementById('media-modal');
  const iframe = document.getElementById('modal-video-iframe');
  const localVideo = document.getElementById('modal-local-video');

  if (iframe) iframe.src = '';
  if (localVideo) {
    localVideo.pause();
    localVideo.src = '';
  }
  hideModal(modal);
}

function initMediaModal() {
  const closeBtn = document.getElementById('modal-close-btn');
  const modal = document.getElementById('media-modal');
  const bookCta = document.getElementById('modal-book-cta');

  if (closeBtn) closeBtn.addEventListener('click', closeMediaModal);
  if (bookCta) bookCta.addEventListener('click', closeMediaModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeMediaModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMediaModal();
  });
}

/* =========================================================================
   4. BOOKING FORM ENGINE (CLIENT PHONE + WHATSAPP + BACKGROUND DISPATCH)
   ========================================================================= */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const emailBtn = document.getElementById('submit-email-btn');
  const status = document.getElementById('booking-status');

  function getFormData() {
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const social = document.getElementById('client-social').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const service = document.getElementById('service-needed').value;
    const date = document.getElementById('shoot-date').value;
    const location = document.getElementById('shoot-location').value.trim();
    const details = document.getElementById('project-details').value.trim();

    return { 
      name, 
      phone,
      social, 
      email, 
      service, 
      date, 
      location, 
      details,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
  }

  function validate(data) {
    if (!data.name || !data.phone || !data.social || !data.email) {
      alert('Please fill in your Name, Phone Number, Instagram/Social handle, and Email.');
      return false;
    }
    return true;
  }

  function recordInquiry(data) {
    const inquiries = getInquiries();
    inquiries.unshift(data);
    saveInquiries(inquiries);
  }

  // 1. Direct WhatsApp Booking
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validate(data)) return;

      recordInquiry(data);

      const message = `🎬 *BOOKING INQUIRY FOR HARISH*\n\n` +
        `👤 *Client Name:* ${data.name}\n` +
        `📞 *Client Phone:* ${data.phone}\n` +
        `📱 *Instagram / Brand:* ${data.social}\n` +
        `📧 *Email:* ${data.email}\n` +
        `🎥 *Service Required:* ${data.service}\n` +
        `📅 *Preferred Date:* ${data.date || 'Flexible'}\n` +
        `📍 *Location:* ${data.location || 'Studio / Remote'}\n` +
        `📝 *Concept Brief:* ${data.details || 'Let us discuss details on chat.'}\n\n` +
        `⚡ Sent from @krishhhh.verse portfolio`;

      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${HARISH_CONFIG.WHATSAPP_NUMBER}?text=${encoded}`;

      if (status) {
        status.classList.remove('hidden');
        status.className = 'p-4 rounded-sm bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-mono text-center';
        status.innerHTML = `✓ Thank you ${data.name}! Opening WhatsApp to connect directly with Harish...`;
      }

      window.open(url, '_blank');
    });
  }

  // 2. Direct Background Email Dispatch
  if (emailBtn) {
    emailBtn.addEventListener('click', async () => {
      const data = getFormData();
      if (!validate(data)) return;

      recordInquiry(data);

      const originalBtnText = emailBtn.innerHTML;
      emailBtn.disabled = true;
      emailBtn.innerHTML = `<span class="animate-pulse">Transmitting Request...</span>`;

      if (status) {
        status.classList.remove('hidden');
        status.className = 'p-3 rounded-sm bg-raw-stucco border border-raw-ochre text-raw-sand text-xs font-mono text-center';
        status.textContent = 'Transmitting booking request...';
      }

      try {
        await fetch('https://formsubmit.co/ajax/Harish14021204@gmail.com', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🎬 New Booking Inquiry: ${data.service} - ${data.name}`,
            Client_Name: data.name,
            Client_Phone: data.phone,
            Instagram_Handle: data.social,
            Client_Email: data.email,
            Service_Required: data.service,
            Shoot_Date: data.date || 'Flexible',
            Shoot_Location: data.location || 'Not specified',
            Project_Brief: data.details || 'No additional notes',
            _template: 'table'
          })
        });

        if (status) {
          status.className = 'p-4 rounded-sm bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-mono text-center space-y-1';
          status.innerHTML = `
            <div class="font-bold text-sm">✓ Thank you, ${data.name}!</div>
            <div>Your booking request has been received. We will connect with you on WhatsApp or Email shortly.</div>
          `;
        }

        form.reset();
      } catch (err) {
        if (status) {
          status.className = 'p-4 rounded-sm bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-mono text-center';
          status.innerHTML = `✓ Thank you! Your booking request has been recorded. Opening email composer...`;
        }

        const subject = encodeURIComponent(`[Booking Request] ${data.service} - ${data.name}`);
        const body = encodeURIComponent(
          `Dear Harish,\n\nI would like to book a photography / videography session.\n\n` +
          `• Name: ${data.name}\n` +
          `• Phone: ${data.phone}\n` +
          `• Instagram: ${data.social}\n` +
          `• Email: ${data.email}\n` +
          `• Service: ${data.service}\n` +
          `• Preferred Date: ${data.date || 'Flexible'}\n` +
          `• Location: ${data.location || 'Not specified'}\n\n` +
          `Concept Brief:\n${data.details || 'Looking forward to collaborating!'}\n\n` +
          `Best regards,\n${data.name}`
        );

        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=Harish14021204@gmail.com&su=${subject}&body=${body}`, '_blank');
      } finally {
        emailBtn.disabled = false;
        emailBtn.innerHTML = originalBtnText;
      }
    });
  }
}

/* =========================================================================
   5. STANDALONE PRIVATE ADMIN PORTAL ENGINE (admin.html)
   ========================================================================= */
function initStandaloneAdminPage() {
  const authContainer = document.getElementById('portal-auth-container');
  const dashContainer = document.getElementById('portal-dashboard-container');
  const loginForm = document.getElementById('portal-login-form');
  const passInput = document.getElementById('portal-password-input');
  const authError = document.getElementById('portal-auth-error');
  const logoutBtn = document.getElementById('admin-page-logout-btn');

  let isAuth = sessionStorage.getItem('harish_portal_auth') === 'true';

  function renderView() {
    if (isAuth) {
      if (authContainer) authContainer.classList.add('hidden');
      if (dashContainer) dashContainer.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.remove('hidden');
      renderPortalLists();
    } else {
      if (authContainer) authContainer.classList.remove('hidden');
      if (dashContainer) dashContainer.classList.add('hidden');
      if (logoutBtn) logoutBtn.classList.add('hidden');
      if (passInput) passInput.value = '';
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = passInput.value.trim();
      const actualPassword = getAdminPassword();

      if (entered === actualPassword) {
        isAuth = true;
        sessionStorage.setItem('harish_portal_auth', 'true');
        if (authError) authError.classList.add('hidden');
        renderView();
      } else {
        if (authError) authError.classList.remove('hidden');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isAuth = false;
      sessionStorage.removeItem('harish_portal_auth');
      renderView();
      alert('Logged out of Studio Portal.');
    });
  }

  // Tab Switching inside admin.html
  const tabs = [
    { btn: 'p-tab-overview-btn', content: 'p-tab-overview-content' },
    { btn: 'p-tab-upload-btn', content: 'p-tab-upload-content' },
    { btn: 'p-tab-portfolio-btn', content: 'p-tab-portfolio-content' },
    { btn: 'p-tab-inquiries-btn', content: 'p-tab-inquiries-content' },
    { btn: 'p-tab-security-btn', content: 'p-tab-security-content' }
  ];

  tabs.forEach(tabObj => {
    const btnElem = document.getElementById(tabObj.btn);
    if (btnElem) {
      btnElem.addEventListener('click', () => {
        tabs.forEach(t => {
          const b = document.getElementById(t.btn);
          const c = document.getElementById(t.content);
          if (b) {
            b.classList.remove('border-raw-ochre', 'text-raw-sand', 'font-semibold');
            b.classList.add('border-transparent', 'text-raw-cement');
          }
          if (c) c.classList.add('hidden');
        });

        btnElem.classList.add('border-raw-ochre', 'text-raw-sand', 'font-semibold');
        btnElem.classList.remove('border-transparent', 'text-raw-cement');
        const activeContent = document.getElementById(tabObj.content);
        if (activeContent) activeContent.classList.remove('hidden');
      });
    }
  });

  // Local File Upload listener in admin.html
  const pcFileInput = document.getElementById('p-pc-file');
  const selectedFileName = document.getElementById('p-selected-file-name');
  if (pcFileInput) {
    pcFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        selectedLocalFile = file;
        selectedFileName.classList.remove('hidden');
        selectedFileName.textContent = `Selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
        
        const typeSelect = document.getElementById('p-media-type');
        if (file.type.startsWith('video/')) {
          if (typeSelect) typeSelect.value = 'video';
        } else if (file.type.startsWith('image/')) {
          if (typeSelect) typeSelect.value = 'photo';
        }
      }
    });
  }

  // Upload Form Submission
  const uploadForm = document.getElementById('p-upload-form');
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('p-title').value.trim().toUpperCase();
      const category = document.getElementById('p-category').value;
      const mediaType = document.getElementById('p-media-type').value;
      let mediaUrl = document.getElementById('p-media-url').value.trim();
      let thumbUrl = '';
      const desc = document.getElementById('p-desc').value.trim();

      if (selectedLocalFile) {
        if (selectedLocalFile.type.startsWith('image/')) {
          mediaUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(selectedLocalFile);
          });
          thumbUrl = mediaUrl;
        } else if (selectedLocalFile.type.startsWith('video/')) {
          mediaUrl = URL.createObjectURL(selectedLocalFile);
          thumbUrl = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800';
        }
      } else if (mediaUrl) {
        if (mediaUrl.includes('youtube.com/watch?v=' || mediaUrl.includes('youtu.be/'))) {
          const videoId = mediaUrl.includes('v=') ? mediaUrl.split('v=')[1]?.split('&')[0] : mediaUrl.split('youtu.be/')[1]?.split('?')[0];
          if (videoId) {
            mediaUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
            thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }
      } else {
        alert('Please either choose a file from your computer or paste an online link.');
        return;
      }

      const newItem = {
        id: Date.now().toString(),
        title,
        category,
        mediaType,
        mediaUrl,
        thumbUrl: thumbUrl || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800',
        desc: desc || 'Shot & Mastered by Harish'
      };

      const current = getPortfolio();
      current.unshift(newItem);
      savePortfolio(current);

      uploadForm.reset();
      selectedLocalFile = null;
      if (selectedFileName) selectedFileName.classList.add('hidden');
      renderPortalLists();
      alert('✓ Project published live to portfolio!');
    });
  }

  // Change Password Form in admin.html
  const passForm = document.getElementById('p-password-form');
  if (passForm) {
    passForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('p-current-pass').value.trim();
      const newPass = document.getElementById('p-new-pass').value.trim();
      const confirmPass = document.getElementById('p-confirm-pass').value.trim();
      const feedback = document.getElementById('p-pass-feedback');
      const actualPassword = getAdminPassword();

      feedback.classList.remove('hidden', 'bg-red-950/80', 'text-red-300', 'bg-emerald-950/80', 'text-emerald-300');

      if (current !== actualPassword) {
        feedback.classList.add('bg-red-950/80', 'text-red-300');
        feedback.textContent = 'Current password is incorrect.';
        return;
      }

      if (newPass.length < 3) {
        feedback.classList.add('bg-red-950/80', 'text-red-300');
        feedback.textContent = 'New password must be at least 3 characters.';
        return;
      }

      if (newPass !== confirmPass) {
        feedback.classList.add('bg-red-950/80', 'text-red-300');
        feedback.textContent = 'New passwords do not match.';
        return;
      }

      setAdminPassword(newPass);
      feedback.classList.add('bg-emerald-950/80', 'text-emerald-300');
      feedback.textContent = '✓ Password updated successfully!';
      passForm.reset();
    });
  }

  renderView();
}

function renderPortalLists() {
  const portfolioList = document.getElementById('p-portfolio-list');
  const inquiriesList = document.getElementById('p-inquiries-list');
  const portCount = document.getElementById('p-portfolio-count');
  const inqCount = document.getElementById('p-inquiry-count');
  const statWorks = document.getElementById('p-stat-works');
  const statInquiries = document.getElementById('p-stat-inquiries');

  const portfolio = getPortfolio();
  const inquiries = getInquiries();

  if (portCount) portCount.textContent = portfolio.length;
  if (inqCount) inqCount.textContent = inquiries.length;
  if (statWorks) statWorks.textContent = portfolio.length;
  if (statInquiries) statInquiries.textContent = inquiries.length;

  // Render Portfolio List
  if (portfolioList) {
    if (portfolio.length === 0) {
      portfolioList.innerHTML = `<div class="p-6 text-center text-raw-cement">No projects found. Use the Upload tab to add one.</div>`;
    } else {
      portfolioList.innerHTML = portfolio.map(item => `
        <div class="p-4 bg-raw-wall border border-raw-border rounded-sm flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 truncate">
            <img src="${item.thumbUrl || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=200'}" class="w-12 h-8 object-cover rounded-sm border border-raw-border">
            <div class="truncate">
              <div class="font-serif text-raw-linen uppercase font-medium truncate">${item.title}</div>
              <div class="text-[10px] text-raw-cement uppercase">${item.category} • ${item.mediaType}</div>
            </div>
          </div>
          <button class="p-del-btn px-3 py-1.5 rounded-sm bg-red-950/60 border border-red-800 text-red-400 hover:bg-red-900 text-[10px] uppercase font-bold flex items-center gap-1" data-id="${item.id}">
            <i data-lucide="trash-2" class="w-3 h-3"></i> Delete
          </button>
        </div>
      `).join('');

      portfolioList.querySelectorAll('.p-del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (confirm('Delete this project from your portfolio?')) {
            const updated = getPortfolio().filter(i => i.id !== id);
            savePortfolio(updated);
            renderPortalLists();
          }
        });
      });
    }
  }

  // Render Inquiries List with Client Phone & WhatsApp
  if (inquiriesList) {
    if (inquiries.length === 0) {
      inquiriesList.innerHTML = `<div class="p-8 text-center text-raw-cement">No booking inquiries yet. When clients book on the website, they appear here.</div>`;
    } else {
      inquiriesList.innerHTML = inquiries.map(inq => {
        const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
        const clientWhatsAppUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(inq.name)},%20Harish%20here%20regarding%20your%20booking%20inquiry%20for%20${encodeURIComponent(inq.service)}` : `https://wa.me/?text=Hi%20${encodeURIComponent(inq.name)},%20Harish%20here%20regarding%20your%20booking%20inquiry`;

        return `
          <div class="p-5 bg-raw-wall border border-raw-border rounded-sm space-y-3">
            <div class="flex items-center justify-between border-b border-raw-border pb-3">
              <div>
                <span class="font-serif text-base text-raw-sand font-bold">${inq.name}</span>
                <span class="text-xs text-raw-cement ml-2 font-mono">(${inq.social})</span>
              </div>
              <span class="px-2.5 py-1 rounded-sm bg-raw-ochre/10 border border-raw-ochre/30 text-raw-ochre text-[10px] font-bold uppercase">
                ${inq.service}
              </span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-raw-linen font-mono">
              <div><span class="text-raw-cement">📞 Client Phone:</span> <a href="tel:${inq.phone}" class="text-emerald-400 font-bold underline">${inq.phone || 'Not provided'}</a></div>
              <div><span class="text-raw-cement">✉️ Client Email:</span> <a href="mailto:${inq.email}" class="text-raw-sand underline">${inq.email}</a></div>
              <div><span class="text-raw-cement">📅 Preferred Date:</span> ${inq.date || 'Flexible'}</div>
              <div><span class="text-raw-cement">📍 Location:</span> ${inq.location || 'Not specified'}</div>
            </div>

            <div class="text-xs text-raw-cement bg-raw-stucco p-3 rounded-sm border border-raw-border/60 font-mono">
              "${inq.details || 'No additional details provided.'}"
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[10px] text-raw-cement">Received: ${inq.timestamp || 'Recent'}</span>
              <a href="${clientWhatsAppUrl}" target="_blank" class="px-4 py-2 bg-emerald-950/80 border border-emerald-700 text-emerald-300 hover:bg-emerald-900 rounded-sm text-xs uppercase font-bold flex items-center gap-1.5">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Message Client on WhatsApp
              </a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (window.lucide) lucide.createIcons();
}

/* =========================================================================
   6. MOBILE MENU
   ========================================================================= */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}
