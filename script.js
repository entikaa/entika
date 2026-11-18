document.addEventListener("DOMContentLoaded", () => {
    // Собираем данные со всех карточек
    const cards = document.querySelectorAll('.card');
    const galleryData = [];

    cards.forEach(card => {
        const img = card.querySelector('.art img');
        const title = card.querySelector('h3');
        const category = card.querySelector('p');

        if (img && title) {
            galleryData.push({
                src: img.src,
                title: title.textContent,
                category: category ? category.textContent : 'Работа'
            });
        }
    });

    // Элементы лайтбокса
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImg = document.getElementById('cl-img');
    const closeBtn = document.getElementById('cl-close');
    const prevBtn = document.getElementById('cl-prev');
    const nextBtn = document.getElementById('cl-next');
    
    // Элементы текста
    const titleEl = document.getElementById('cl-title');
    const categoryEl = document.getElementById('cl-category');
    const currentEl = document.getElementById('cl-current');
    const totalEl = document.getElementById('cl-total');

    let currentIndex = 0;

    // Устанавливаем общее количество картинок
    totalEl.textContent = galleryData.length;

    // Вешаем клики на карточки
    cards.forEach((card, index) => {
        const imgWrapper = card.querySelector('.art');
        if (imgWrapper) {
            imgWrapper.style.cursor = 'pointer'; // Добавляем курсор-руку
            imgWrapper.addEventListener('click', () => {
                currentIndex = index;
                updateLightbox();
                openLightbox();
            });
        }
    });

    // Функция обновления контента в окне
    function updateLightbox() {
        const data = galleryData[currentIndex];
        lightboxImg.src = data.src;
        titleEl.textContent = data.title;
        categoryEl.textContent = data.category;
        currentEl.textContent = currentIndex + 1;
    }

    // Открытие
    function openLightbox() {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Отключаем скролл страницы
    }

    // Закрытие
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
    }

    // Вперед
    function showNext() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightbox();
    }

    // Назад
    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
    }

    // Слушатели событий
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Клик по фону (вне контейнера)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Управление с клавиатуры
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});

/* ---------- Кастомный курсор ---------- */
var c = document.getElementById('cur'),
    tx = 0, ty = 0,
    x = 0, y = 0,
    s = 1, ts = 1,
    seen = false,
    d = document.documentElement;

function loop() {
  x += (tx - x) * .16;
  y += (ty - y) * .16;
  s += (ts - s) * .14;
  c.style.transform = 'translate3d(' + (x - 22) + 'px,' + (y - 22) + 'px,0) scale(' + s.toFixed(3) + ')';
  requestAnimationFrame(loop);
}
loop();

addEventListener('mousemove', function (e) {
  tx = e.clientX;
  ty = e.clientY;
  if (!seen) { x = tx; y = ty; seen = true; }
  c.classList.add('on');
});

d.addEventListener('mouseleave', function () { c.classList.remove('on'); });
d.addEventListener('mouseenter', function () { c.classList.add('on'); });
addEventListener('blur', function () { c.classList.remove('on'); });

document.addEventListener('mouseover', function (e) {
  ts = e.target.closest('a,button,summary,.card') ? 1.5 : 1;
});

/* ---------- Фильтр работ ---------- */
var fl = document.getElementById('flt');
fl.addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (!b) return;
  fl.querySelectorAll('button').forEach(function (k) { k.classList.remove('on'); });
  b.classList.add('on');
  var f = b.dataset.f;
  document.querySelectorAll('.wk .card').forEach(function (k) {
    var show = f === 'all' || k.dataset.c === f;
    k.classList.toggle('off', !show);
    k.classList.remove('in');
    if (show) {
      void k.offsetWidth;
      k.classList.add('in');
    }
  });
});

/* ---------- Reveal-анимации при скролле ---------- */
if (!matchMedia('(prefers-reduced-motion:reduce)').matches && 'IntersectionObserver' in window) {
  var els = document.querySelectorAll('.tag,h1,h2,.sub,.hero p,.hero .btns,.card,.flt,.cta .eyebrow,.cta p,.cta .btn,.big,.mq');

  els.forEach(function (el) {
    el.classList.add('rv');
    var i = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty('--d', Math.min(i, 6) * .09 + 's');
  });

  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting) {
        var t = e.target;
        t.classList.add('vis');
        io.unobserve(t);
        setTimeout(function () {
          t.classList.remove('rv', 'vis');
          t.style.removeProperty('--d');
        }, 1800);
      }
    });
  }, { threshold: .12 });

  els.forEach(function (el) { io.observe(el); });
}

/* ---------- Модалка услуг ---------- */
var sv = document.querySelectorAll('.svc'),
    md = document.getElementById('mdl');

var D = [
  {
    n: '1.0 / DESIGN',
    t: 'Графический дизайн',
    d: 'Визуалы, которые сразу считываются и работают под задачу проекта.',
    l: ['Баннеры и рекламные постеры', 'Аватары и оформление соцсетей'],
    p: 'от 350 ₴'
  },
  {
    n: '2.0 / ANIMATION',
    t: 'Анимированный дизайн',
    d: 'Скоро',
  },
  {
    n: '3.0 / 3D',
    t: '3D дизайн',
    d: 'Скоро',
  }
];

function om(k) {
  var item = D[k];
  document.getElementById('meb').textContent = item.n;
  document.getElementById('mt').textContent = item.t;
  document.getElementById('mds').textContent = item.d;
  document.getElementById('mpr').textContent = item.p;
  document.getElementById('mul').innerHTML = item.l.map(function (i) { return '<li>' + i + '</li>'; }).join('');
  md.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cm() {
  md.classList.remove('open');
  document.body.style.overflow = '';
}

sv.forEach(function (el) {
  var k = +el.dataset.k;
  el.addEventListener('click', function () { om(k); });
  el.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      om(k);
    }
  });
});

document.getElementById('mx').addEventListener('click', cm);
document.getElementById('mgo').addEventListener('click', cm);

md.addEventListener('click', function (e) {
  if (e.target === md) cm();
});

addEventListener('keydown', function (e) {
  if (e.key === 'Escape') cm();
});

/* ---------- Прогресс скролла (--p) ---------- */
var pt = 0, pc = 0;

function sp() {
  var h = d.scrollHeight - innerHeight;
  pt = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
}

addEventListener('scroll', sp, { passive: true });
addEventListener('resize', sp);
sp();

(function f() {
  if (Math.abs(pt - pc) > .0005) {
    pc += (pt - pc) * .06;
    d.style.setProperty('--p', pc.toFixed(4));
  }
  requestAnimationFrame(f);
})();