/* ──────────────────────────────────────────────────────────────
   Ma. Corp — site scripts
   1. Mobile menu
   2. Halftone portraits (canvas print renderer)
   3. Home hero carousel
   4. Artist index (filters + portrait preview)
   5. UCP sign-in panel
   6. Footer year
   ────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pad = function (n) { return String(n).padStart(2, '0'); };

  /* ==========================================================
     1. Mobile menu
     ========================================================== */

  function initMenu() {
    var btn = document.querySelector('.menu-btn');
    var menu = document.getElementById('site-menu');
    if (!btn || !menu) return;
    var label = btn.querySelector('.visually-hidden');

    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Close menu' : 'Open menu';
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', function () {
      setOpen(menu.hidden);
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setOpen(false);
    });

    // Close when a same-page (#hash) link is followed.
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  /* ==========================================================
     2. Halftone portraits
     Turns small, mixed-quality source images into one consistent
     black & white print treatment.

     <div class="halftone" data-src="…" data-density="56"
          data-gamma="1.1" data-dot="#f2f0eb" data-on-paper></div>
     ========================================================== */

  var imageCache = {};

  function loadImage(src) {
    if (!imageCache[src]) {
      imageCache[src] = new Promise(function (resolve, reject) {
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () { resolve(img); };
        img.onerror = reject;
        img.src = src;
      });
    }
    return imageCache[src];
  }

  /** Samples an image into a luminance grid, cropped like object-fit: cover. */
  function sample(img, cols, rows) {
    var c = document.createElement('canvas');
    c.width = cols;
    c.height = rows;
    var ctx = c.getContext('2d', { willReadFrequently: true });
    var scale = Math.max(cols / img.width, rows / img.height);
    var w = img.width * scale;
    var h = img.height * scale;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
    var data = ctx.getImageData(0, 0, cols, rows).data;
    var lum = new Float32Array(cols * rows);
    for (var i = 0; i < lum.length; i++) {
      lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
    }
    return lum;
  }

  function Halftone(el) {
    this.el = el;
    this.canvas = document.createElement('canvas');
    el.appendChild(this.canvas);
    this.raf = 0;
    this.drawnSize = '';
    this.animateNext = true;

    var self = this;

    // Print the image the first time it scrolls into view…
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        io.disconnect();
        self.visible = true;
        self.draw();
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);

    // …and re-rasterise (without animation) whenever its box changes.
    var ro = new ResizeObserver(function (entries) {
      var r = entries[0].contentRect;
      var size = Math.round(r.width) + 'x' + Math.round(r.height);
      if (self.drawnSize && size !== self.drawnSize) self.draw();
    });
    ro.observe(el);
  }

  /** Swap the source image and replay the print reveal. */
  Halftone.prototype.setSrc = function (src, alt) {
    this.el.dataset.src = src;
    if (alt) this.el.setAttribute('aria-label', alt);
    this.animateNext = true;
    if (this.visible) this.draw();
  };

  Halftone.prototype.draw = function () {
    var self = this;
    var el = this.el;
    var canvas = this.canvas;
    var box = el.getBoundingClientRect();
    if (!box.width || !box.height) return;
    this.drawnSize = Math.round(box.width) + 'x' + Math.round(box.height);

    var src = el.dataset.src;
    var density = parseFloat(el.dataset.density || 56);
    var gamma = parseFloat(el.dataset.gamma || 1.1);
    var dot = el.dataset.dot || '#f2f0eb';
    var onPaper = el.hasAttribute('data-on-paper');

    loadImage(src).then(function (img) {
      if (el.dataset.src !== src) return; // a newer image was requested meanwhile

      var rect = el.getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      var cell = Math.min(width, height) / density;
      var cols = Math.ceil(width / cell);
      var rows = Math.ceil(height / cell);
      var lum = sample(img, cols, rows);
      var ctx = canvas.getContext('2d');
      var maxR = (cell / 2) * 1.08 * dpr;

      function paint(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = dot;
        var visibleRows = rows * progress;
        for (var y = 0; y < rows; y++) {
          var rowT = Math.min(1, Math.max(0, visibleRows - y + 1) / 6);
          if (rowT <= 0) break;
          for (var x = 0; x < cols; x++) {
            var v = lum[y * cols + x];
            var l = Math.pow(onPaper ? 1 - v : v, gamma);
            var r = maxR * Math.sqrt(l) * rowT;
            if (r < 0.35 * dpr) continue;
            ctx.beginPath();
            ctx.arc((x + 0.5) * cell * dpr, (y + 0.5) * cell * dpr, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      cancelAnimationFrame(self.raf);
      if (!self.animateNext || reducedMotion) {
        paint(1.2);
        return;
      }
      self.animateNext = false;
      var start = performance.now();
      var duration = 900;
      function tick(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        paint(eased * 1.2 + 0.001);
        if (t < 1) self.raf = requestAnimationFrame(tick);
      }
      self.raf = requestAnimationFrame(tick);
    }).catch(function () {
      // Opened from file:// the canvas can't read local pixels (browser
      // security), so show the photo itself in greyscale instead.
      self.showPlainImage(src);
    });
  };

  Halftone.prototype.showPlainImage = function (src) {
    var img = this.el.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.alt = '';
      this.el.appendChild(img);
      this.canvas.hidden = true;
    }
    img.src = src;
  };

  function initHalftones() {
    document.querySelectorAll('.halftone').forEach(function (el) {
      el._halftone = new Halftone(el);
    });
  }

  /* ==========================================================
     3. Home hero carousel
     Slide data lives on each tab button as data-* attributes.
     The progress bar's animationend drives auto-advance, so
     pausing on hover pauses both the bar and the timer.
     ========================================================== */

  function initHero() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var tabs = Array.prototype.slice.call(hero.querySelectorAll('.hero__tab'));
    var stage = hero.querySelector('.hero__stage');
    var q = function (sel) { return hero.querySelector(sel); };
    var index = 0;

    function nameSize(name) {
      return name.length <= 7 ? 'hero__name--xl' : name.length <= 12 ? 'hero__name--l' : 'hero__name--m';
    }

    function render() {
      var d = tabs[index].dataset;

      q('[data-hero="count"]').textContent = pad(index + 1) + ' / ' + pad(tabs.length);
      q('[data-hero="label"]').textContent = d.label;
      q('[data-hero="kicker"]').textContent = d.kind + ' — ' + d.descriptor;

      var name = q('[data-hero="name"]');
      name.textContent = d.artist;
      name.className = 'hero__name ' + nameSize(d.artist);

      q('[data-hero="title"]').textContent = d.title;
      q('[data-hero="format"]').textContent = d.format;
      q('[data-hero="date"]').textContent = d.date;
      q('[data-hero="catalog"]').textContent = d.catalog;
      q('[data-hero="corner"]').textContent = d.catalog;
      q('[data-hero="listen"]').href = 'releases.html#' + d.releaseId;
      q('[data-hero="profile"]').href = 'artists.html#' + d.artistId;
      q('[data-hero="caption-name"]').textContent = d.artist;
      q('[data-hero="caption-meta"]').textContent = d.labelShort + ' · ' + d.date;

      var portrait = q('.hero__frame .halftone');
      if (portrait._halftone) portrait._halftone.setSrc(d.image, 'Portrait of ' + d.artist);

      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.classList.toggle('is-done', i < index);
        tab.setAttribute('aria-current', String(on));
        // Re-adding the class restarts the progress animation.
        tab.classList.remove('is-on');
        if (on) {
          void tab.offsetWidth;
          tab.classList.add('is-on');
        }
      });

      // Replay the entrance animation of the copy.
      stage.classList.add('is-swapping');
      void stage.offsetWidth;
      stage.classList.remove('is-swapping');
    }

    function go(i) {
      index = (i + tabs.length) % tabs.length;
      render();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { go(i); });
      tab.querySelector('.hero__fill').addEventListener('animationend', function () {
        if (i === index && !reducedMotion) go(index + 1);
      });
    });

    q('[data-hero="prev"]').addEventListener('click', function () { go(index - 1); });
    q('[data-hero="next"]').addEventListener('click', function () { go(index + 1); });

    function pause() {
      hero.classList.add('is-paused');
      stage.setAttribute('aria-live', 'polite');
    }
    function resume() {
      hero.classList.remove('is-paused');
      stage.setAttribute('aria-live', 'off');
    }
    hero.addEventListener('mouseenter', pause);
    hero.addEventListener('mouseleave', resume);
    hero.addEventListener('focusin', pause);
    hero.addEventListener('focusout', resume);
  }

  /* ==========================================================
     4. Artist index
     Roster as an editorial index: one big line per act, with a
     printed portrait that follows the row you're on.
     ========================================================== */

  function initArtistIndexes() {
    document.querySelectorAll('.artist-index').forEach(function (root) {
      var filters = root.querySelectorAll('.filter');
      var items = Array.prototype.slice.call(root.querySelectorAll('.ai-list li'));
      var portrait = root.querySelector('.ai-frame .halftone');
      var capName = root.querySelector('[data-ai="name"]');
      var capLabel = root.querySelector('[data-ai="label"]');
      var activeId = null;

      function setActive(li) {
        if (!li || li.id === activeId) return;
        activeId = li.id;
        items.forEach(function (item) {
          item.querySelector('.ai-row').classList.toggle('is-on', item === li);
        });
        var d = li.dataset;
        capName.textContent = d.name;
        capLabel.textContent = d.labelName;
        if (portrait._halftone) portrait._halftone.setSrc(d.image, 'Portrait of ' + d.name);
      }

      function applyFilter(id) {
        var n = 0;
        var first = null;
        items.forEach(function (li) {
          var show = id === 'all' || li.dataset.label === id;
          li.hidden = !show;
          if (show) {
            n++;
            li.querySelector('.ai-num').textContent = pad(n);
            if (!first) first = li;
          }
        });
        filters.forEach(function (f) {
          var on = f.dataset.filter === id;
          f.classList.toggle('is-on', on);
          f.setAttribute('aria-selected', String(on));
        });
        setActive(first);
      }

      filters.forEach(function (f) {
        f.addEventListener('click', function () { applyFilter(f.dataset.filter); });
      });

      items.forEach(function (li) {
        var row = li.querySelector('.ai-row');
        var activate = function () { setActive(li); };
        row.addEventListener('mouseenter', activate);
        row.addEventListener('focus', activate);
        row.addEventListener('click', activate);
      });

      // Coming from a link like artists.html#echos: highlight that act.
      var fromHash = location.hash && root.querySelector('li' + CSS.escape(location.hash));
      activeId = null;
      setActive(fromHash || items[0]);
    });
  }

  /* ==========================================================
     5. UCP sign-in panel
     Sign-in isn't connected yet: the button shows the pending
     state, then reports it. No fake sessions.
     ========================================================== */

  function initLogin() {
    var btn = document.querySelector('.ucp-btn');
    if (!btn) return;
    var text = btn.querySelector('[data-ucp="text"]');
    var arrow = btn.querySelector('.ucp-btn__arrow');
    var slot = document.querySelector('.notice-slot');

    btn.addEventListener('click', function () {
      slot.innerHTML = '';
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      text.textContent = 'Connecting…';
      arrow.innerHTML = '<span class="spinner"></span>';

      setTimeout(function () {
        btn.disabled = false;
        btn.setAttribute('aria-busy', 'false');
        text.textContent = 'Continue with UCP';
        arrow.textContent = '→';
        slot.innerHTML =
          '<p class="notice"><span class="t-meta">Notice</span>' +
          'UCP sign-in isn’t connected yet. Artist accounts open with the studio booking release.</p>';
      }, 900);
    });
  }

  /* ==========================================================
     6. Footer year
     ========================================================== */

  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  initMenu();
  initHalftones();
  initHero();
  initArtistIndexes();
  initLogin();
  initYear();
})();
