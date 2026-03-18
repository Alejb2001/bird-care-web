/* ============================================
   Entre Alas — JavaScript principal
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. MENÚ MÓVIL (navbar toggle)
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen   = document.getElementById('icon-open');
  const iconClose  = document.getElementById('icon-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      if (iconOpen)  iconOpen.classList.toggle('hidden', !isOpen);
      if (iconClose) iconClose.classList.toggle('hidden', isOpen);
    });
  }

  // ==========================================
  // 2. FILTRADO Y BÚSQUEDA (página /articulos)
  // ==========================================
  const searchInput    = document.getElementById('search-input');
  const categoryBtns  = document.querySelectorAll('.category-btn');
  const articleCards  = document.querySelectorAll('.article-card');
  const noResults     = document.getElementById('no-results');
  const resultsCount  = document.getElementById('results-count');

  if (searchInput || categoryBtns.length > 0) {
    let activeCategory = 'all';
    let searchQuery    = '';

    // Leer parámetros de la URL al cargar la página
    const urlParams = new URLSearchParams(window.location.search);
    const urlQ      = urlParams.get('q');
    const urlCat    = urlParams.get('categoria');

    if (urlQ && searchInput) {
      searchQuery = urlQ.toLowerCase().trim();
      searchInput.value = urlQ;
    }

    if (urlCat) {
      activeCategory = urlCat;
      // Marcar el botón de categoría correcto
      categoryBtns.forEach(function (btn) {
        btn.classList.remove('active', 'bg-nature-green-dark', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
        if (btn.dataset.category === urlCat) {
          btn.classList.add('active', 'bg-nature-green-dark', 'text-white');
          btn.classList.remove('bg-white', 'text-gray-700');
        }
      });
    }

    // Función principal de filtrado
    function applyFilters() {
      var visible = 0;

      articleCards.forEach(function (card) {
        var category = (card.dataset.category || '').toLowerCase();
        var title    = (card.dataset.title    || '').toLowerCase();
        var excerpt  = (card.dataset.excerpt  || '').toLowerCase();
        var tags     = (card.dataset.tags     || '').toLowerCase();

        var matchesCategory =
          activeCategory === 'all' ||
          (card.dataset.category || '') === activeCategory;

        var matchesSearch =
          searchQuery === '' ||
          title.includes(searchQuery)   ||
          excerpt.includes(searchQuery) ||
          tags.includes(searchQuery)    ||
          category.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden-by-filter');
          visible++;
        } else {
          card.classList.add('hidden-by-filter');
        }
      });

      // Contador de resultados
      if (resultsCount) {
        resultsCount.textContent = visible + ' artículo' + (visible !== 1 ? 's' : '') + ' encontrado' + (visible !== 1 ? 's' : '');
      }

      // Mensaje sin resultados
      if (noResults) {
        noResults.classList.toggle('hidden', visible > 0);
      }
    }

    // Búsqueda en tiempo real
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value.toLowerCase().trim();
        applyFilters();
      });
    }

    // Filtros de categoría
    categoryBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCategory = this.dataset.category;

        // Actualizar estilos de botones
        categoryBtns.forEach(function (b) {
          b.classList.remove('active', 'bg-nature-green-dark', 'text-white');
          b.classList.add('bg-white', 'text-gray-700', 'hover:bg-nature-green-light');
        });
        this.classList.add('active', 'bg-nature-green-dark', 'text-white');
        this.classList.remove('bg-white', 'text-gray-700');

        applyFilters();
      });
    });

    // Aplicar filtros iniciales (desde URL)
    applyFilters();
  }

  // ==========================================
  // 3. LAZY LOADING DE IMÁGENES
  // ==========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores sin IntersectionObserver
    lazyImages.forEach(function (img) {
      img.classList.add('loaded');
    });
  }

  // ==========================================
  // 4. SCROLL SUAVE PARA ANCLAS (#categories, #blog)
  // ==========================================
  document.querySelectorAll('a[href^="#"], a[href*="/#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      var hash = href.includes('#') ? href.split('#')[1] : null;
      if (!hash) return;

      var target = document.getElementById(hash);
      if (!target) return;

      // Solo si estamos en la misma página
      if (!href.includes('/') || window.location.pathname === '/' || href.startsWith('#')) {
        e.preventDefault();
        var navbarHeight = 64; // h-16
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});
