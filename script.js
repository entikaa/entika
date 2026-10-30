document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    // Находим все элементы, на которые нужно реагировать курсору
    const links = document.querySelectorAll('a, button, .card');

    // Движение курсора за мышью
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Эффект увеличения при наведении на кликабельные элементы
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
});