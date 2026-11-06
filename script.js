var c = document.getElementById('cur');

addEventListener('mousemove', function (e) {
  c.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
});

document.querySelectorAll('a,.btn,summary').forEach(function (el) {
  el.addEventListener('mouseenter', function () {
    c.style.width = '64px';
    c.style.height = '64px';
    c.style.margin = '-32px 0 0 -32px';
  });

  el.addEventListener('mouseleave', function () {
    c.style.width = '44px';
    c.style.height = '44px';
    c.style.margin = '-22px 0 0 -22px';
  });
});