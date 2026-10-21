/**
 * ذاتس تشوكلت | THAT Chocolate - الرياض
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer & Backdrop
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && mobileDrawer && drawerOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // 4. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 5. Interactive VIP Event Booking Form Handler
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || '';
      const phone = document.getElementById('clientPhone')?.value.trim() || '';
      const occasion = document.getElementById('occasionType')?.value || 'حفل زواج / ملكة';
      const trayPref = document.getElementById('trayPreference')?.value || 'من صواني THAT الفاخرة';
      const eventDate = document.getElementById('eventDate')?.value.trim() || 'قريباً';
      const district = document.getElementById('district')?.value.trim() || '';
      const notes = document.getElementById('notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      if (!name || !phone || !district) {
        alert('يرجى ملء جميع الحقول المطلوبة (الاسم، الجوال، والحي).');
        return;
      }

      // Format elegant WhatsApp message for THAT Chocolate event concierge (0537382047)
      const whatsappMessage = 
`*طلب حجز وتنسيق صواني مناسبة - ذاتس تشوكلت (THAT Chocolate)*
━━━━━━━━━━━━━━━━━━━━
👤 *اسم صاحب/ة المناسبة:* ${name}
📱 *رقم الجوال:* ${phone}
💍 *نوع المناسبة:* ${occasion}
✨ *تفضيل الصواني:* ${trayPref}
📅 *تاريخ المناسبة:* ${eventDate}
📍 *موقع/حي المناسبة بالرياض:* ${district}
📝 *ملاحظات وتفاصيل إضافية:*
${notes}
━━━━━━━━━━━━━━━━━━━━
_تم إرسال هذا الطلب عبر الموقع الرسمي لـ THAT Chocolate_`;

      const targetWhatsAppNumber = '966537382047';
      const encodedMsg = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodedMsg}`;

      // Open WhatsApp chat in a new tab
      window.open(whatsappUrl, '_blank');
    });
  }
});

// Helper for selecting occasion from catalog cards
window.setOccasionSelect = function(occasionName) {
  const selectEl = document.getElementById('occasionType');
  if (selectEl) {
    selectEl.value = occasionName;
  }
  const bookingSec = document.getElementById('booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
  }
};
