
/* ==========================================
   RUANG REFLEKSI — MAIN JAVASCRIPT
   ========================================== */

(function () {
  "use strict";

  // ========================================
  // 1. KONFIGURASI ARTEFAK
  // ========================================

  const utsArtefak = {
    modul: "https://drive.google.com/file/d/189Ew-3bNrUsSUEJ5XtLoHobdYjk9FHjg/view",
    lkpd: "https://drive.google.com/file/d/1KP-GLhmV8u5OnWEcl9CFU54vvyZP12so/view",
    refleksi: "https://drive.google.com/file/d/1S7OYFi1BWXZEnTLxlOXOdvNneBxzQTu8/view"
  };

  const uasArtefak = {
    // SIKLUS 2
    modul2: "https://drive.google.com/file/d/1YsSTQg4EtRn77hKRVLQt0AbaO9Ye44RF/view",
    lkpd2: "https://drive.google.com/file/d/1vyXJDsIPvIIfapfu-7XQXi_fJ8qObKaI/view",
    media2: "https://docs.google.com/presentation/d/1elwF6OQzu3vGSnf1blgfr8Y3M34r6poS/edit?rtpof=true",
    refleksi2: "https://drive.google.com/file/d/16PKoOnWGSkXrC4nMRKK71W4xOHYK7tcd/view",

    // SIKLUS 3
    modul3: "https://docs.google.com/document/d/1S4y-xSexmIsKw5yH8xI2S6iongHolnUo/edit",
    lkpd3: "https://docs.google.com/document/d/1UIyn9A2LjJziMWGlDn7prW0PWuL2TCUL/edit",
    media3: "https://docs.google.com/presentation/d/1b0b6dYalpjAMmbD9TlBSze0vY2yDk8LO/edit?rtpof=true",
    refleksi3: "https://drive.google.com/file/d/1h4nfJ_Xs-NDVQ7AxbAY9byvnprXJOtCn/view",

    // SIKLUS 4
    modul4: "https://drive.google.com/file/d/1WVxm3dbizD-zPnDBe9145yUzcKhHjfQK/view",
    lkpd4: "https://drive.google.com/file/d/148TGzuuRxjYca322PgL6NIBuUqkM_c1-/view",
    media4: "https://docs.google.com/presentation/d/11wmaWE61_k1FxskQwKoLIBZL8qSO4rh8/edit?rtpof=true",
    refleksi4: "https://drive.google.com/file/d/1J3nvdHk4EHGNYP1GpTVqgdlpRko0oeLb/view",

    // VIDEO SIKLUS 4
    video4: "https://drive.google.com/file/d/1V3dbU_TLlWWvS1kFuUBW7p02LWvgU9HN/view"
  };

  /*
   * OPSIONAL — MEDIA PPT VERSI PDF
   *
   * Jika Google Drive gagal menampilkan PowerPoint,
   * ekspor PPT menjadi PDF lalu tempel link PDF di sini.
   *
   * Link PPT asli tetap tersimpan pada uasArtefak.
   */

  const mediaPdf = {
    media2: "",
    media3: "",
    media4: ""
  };

  // ========================================
  // 2. FUNGSI KONVERSI URL PREVIEW
  // ========================================

  function previewAddress(raw) {
    if (!raw || typeof raw !== "string") {
      throw new Error("URL media belum diisi.");
    }

    const value = raw.trim();
    let url;

    try {
      url = new URL(value, window.location.href);
    } catch {
      throw new Error("Format URL tidak valid.");
    }

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Protokol URL tidak didukung.");
    }

    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname;
    let id = "";

    // GOOGLE DRIVE
    if (host === "drive.google.com") {
      id = path.match(/^\/file\/d\/([\w-]+)/)?.[1]
        || url.searchParams.get("id");

      if (!id) {
        throw new Error("Gunakan link file, bukan folder Drive.");
      }

      const result = new URL(
        "https://drive.google.com/file/d/" + id + "/preview"
      );

      const resourceKey = url.searchParams.get("resourcekey");

      if (resourceKey) {
        result.searchParams.set("resourcekey", resourceKey);
      }

      return {
        source: result.href,
        original: value,
        type: "drive"
      };
    }

    // GOOGLE DOCS, SLIDES, SHEETS
    if (host === "docs.google.com") {
      const match = path.match(
        /^\/(document|presentation|spreadsheets)\/d\/([\w-]+)/
      );

      if (!match) {
        throw new Error("Link Google Docs tidak dikenal.");
      }

      const jenis = match[1];
      id = match[2];

      if (jenis === "presentation") {
        // PPTX yang dibuka lewat Google Slides:
        // gunakan viewer Google Drive.
        if (url.searchParams.get("rtpof") === "true") {
          return {
            source: "https://drive.google.com/file/d/" + id + "/preview",
            original: value,
            type: "drive"
          };
        }

        // Google Slides asli.
        return {
          source:
            "https://docs.google.com/presentation/d/" +
            id +
            "/embed?start=false&loop=false&delayms=3000",
          original: value,
          type: "drive"
        };
      }

      return {
        source:
          "https://docs.google.com/" +
          jenis +
          "/d/" +
          id +
          "/preview",
        original: value,
        type: "drive"
      };
    }

    // YOUTUBE
    if (host === "youtu.be") {
      id = path.split("/")[1];
    }

    if ([
      "youtube.com",
      "m.youtube.com",
      "youtube-nocookie.com"
    ].includes(host)) {
      id = url.searchParams.get("v")
        || path.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1];
    }

    if (id && /^[\w-]{11}$/.test(id)) {
      return {
        source: "https://www.youtube-nocookie.com/embed/" + id,
        original: value,
        type: "youtube"
      };
    }

    // FILE LOKAL / URL WEBSITE LAIN
    return {
      source: url.href,
      original: value,
      type: "web"
    };
  }

  // ========================================
  // 3. MENU NAVIGASI
  // ========================================

  const menu = document.querySelector(".menu");
  const nav = document.querySelector("nav");

  if (menu && nav) {
    menu.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // ========================================
  // 4. PREVIEW DI HALAMAN ARTEFAK / LAMPIRAN
  // ========================================

  document.querySelectorAll(".media-card").forEach(function (card) {
    const link = card.querySelector("a[data-preview]");

    if (!link) return;

    const raw = link.getAttribute("href");

    try {
      const preview = previewAddress(raw);
      const iframe = document.createElement("iframe");

      iframe.className = "media-preview " + preview.type;
      iframe.src = preview.source;
      iframe.title =
        card.querySelector("h2")?.textContent.trim() ||
        "Pratinjau media";

      iframe.loading = "lazy";
      iframe.allow = "fullscreen; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      card.prepend(iframe);

      link.target = "_blank";
      link.rel = "noopener noreferrer";

    } catch (error) {
      const notice = document.createElement("p");
      notice.className = "banner media-error";
      notice.textContent =
        "Pratinjau belum tersedia: " + error.message;

      card.prepend(notice);
    }
  });

  const emptyMedia = document.querySelector("[data-empty-media]");

  if (emptyMedia && document.querySelector(".media-card")) {
    emptyMedia.hidden = true;
  }

  // ========================================
  // 5. CAROUSEL FOTO
  // ========================================

  document.querySelectorAll(".photo-carousel").forEach(function (carousel) {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    if (!slides.length || !prevBtn || !nextBtn) return;

    let current = 0;

    function showSlide(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === index);
      });
    }

    prevBtn.addEventListener("click", function () {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    nextBtn.addEventListener("click", function () {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    showSlide(current);
  });

  // ========================================
  // 6. TAMPILKAN ARTEFAK UTS
  // ========================================

  if (document.body.dataset.page === "uts") {
    Object.entries(utsArtefak).forEach(function ([key, url]) {
      if (!url) return;

      const frame = document.querySelector(
        'iframe[data-artefak="' + key + '"]'
      );

      if (!frame) return;

      try {
        const preview = previewAddress(url);
        frame.src = preview.source;

        const card = frame.closest(".uts-art");
        if (card) card.classList.add("loaded");
      } catch (error) {
        console.warn("UTS " + key + ":", error.message);
      }
    });
  }

  // ========================================
  // 7. TAMPILKAN ARTEFAK UAS
  // ========================================

  if (document.body.dataset.page === "uas") {

    Object.entries(uasArtefak).forEach(function ([key, originalUrl]) {
      if (key === "video4" || !originalUrl) return;

      const frame = document.querySelector(
        'iframe[data-uas="' + key + '"]'
      );

      if (!frame) return;

      const card = frame.closest(".uas-art");
      if (!card) return;

      // Gunakan PDF sebagai preview jika disediakan.
      const url = mediaPdf[key] || originalUrl;

      try {
        const preview = previewAddress(url);

        frame.src = preview.source;
        card.classList.add("loaded");

        // Untuk PPT, sediakan tombol membuka file aslinya.
        if (key.startsWith("media")) {
          let actionArea = card.querySelector(".uas-media-actions");

          if (!actionArea) {
            actionArea = document.createElement("div");
            actionArea.className = "uas-media-actions";
            card.appendChild(actionArea);
          }

          const openLink = document.createElement("a");
          openLink.href = originalUrl;
          openLink.target = "_blank";
          openLink.rel = "noopener noreferrer";
          openLink.textContent = "Buka PPT asli ↗";

          actionArea.appendChild(openLink);
        }

      } catch (error) {
        console.warn("UAS " + key + ":", error.message);

        const empty = card.querySelector(".uas-empty");

        if (empty) {
          empty.textContent =
            "Media tidak dapat ditampilkan: " + error.message;
        }
      }
    });

    // ========================================
    // 8. VIDEO PRAKTIK SIKLUS 4
    // ========================================

    const videoContainer = document.getElementById(
      "uas-video-container"
    );

    const videoLink = uasArtefak.video4;

    if (videoContainer && videoLink) {
      try {
        const preview = previewAddress(videoLink);
        const isMp4 = /\.mp4(?:[?#].*)?$/i.test(preview.source);

        if (isMp4) {
          const video = document.createElement("video");

          video.src = preview.source;
          video.controls = true;
          video.preload = "metadata";

          videoContainer.replaceChildren(video);

        } else {
          const iframe = document.createElement("iframe");

          iframe.src = preview.source;
          iframe.title = "Video Praktik Mengajar Siklus 4";
          iframe.loading = "lazy";
          iframe.allow = "fullscreen";
          iframe.allowFullscreen = true;

          videoContainer.replaceChildren(iframe);
        }

        const openVideo = document.createElement("a");
        openVideo.href = videoLink;
        openVideo.target = "_blank";
        openVideo.rel = "noopener noreferrer";
        openVideo.textContent = "Buka video di tab baru ↗";
        openVideo.className = "uas-open-video";

        videoContainer.appendChild(openVideo);

      } catch (error) {
        console.warn("Video Siklus 4:", error.message);
      }
    }
  }

})();
