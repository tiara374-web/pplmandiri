/*
  Fungsi tampilan saja — tidak menyimpan/mengubah konten.
  Teks dan URL media berada di file HTML masing-masing halaman.
*/
(function () {
  "use strict";

  const menu = document.querySelector(".menu");
  const nav = document.querySelector("nav");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }

  // Konversi tautan Bagikan menjadi alamat preview. URL cukup diedit satu kali di href.
  function previewAddress(raw) {
    let url;
    try {
      url = new URL(raw);
    } catch {
      throw new Error("Isi href dengan tautan HTTPS Google Drive atau YouTube yang lengkap.");
    }
    if (url.protocol !== "https:") throw new Error("Gunakan tautan HTTPS.");
    const host = url.hostname.replace(/^www\./, "");
    let id;

    if (host === "drive.google.com") {
      id = url.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1] || url.searchParams.get("id");
      if (!id || !/^[\w-]+$/.test(id)) throw new Error("Gunakan tautan file Drive, bukan folder.");
      const preview = new URL("https://drive.google.com/file/d/" + id + "/preview");
      if (url.searchParams.has("resourcekey")) preview.searchParams.set("resourcekey", url.searchParams.get("resourcekey"));
      return { source: preview.href, type: "drive" };
    }
    if (host === "docs.google.com") {
      const match = url.pathname.match(/^\/(document|spreadsheets|presentation)\/d\/([\w-]+)/);
      if (match) return { source: "https://docs.google.com/" + match[1] + "/d/" + match[2] + "/preview", type: "drive" };
    }
    if (host === "youtu.be") id = url.pathname.split("/")[1];
    if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      id = url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1];
    }
    if (id && /^[\w-]{11}$/.test(id)) return { source: "https://www.youtube-nocookie.com/embed/" + id, type: "youtube" };
    throw new Error("Tautan belum didukung. Gunakan file Drive, Docs, Sheets, Slides, atau video YouTube.");
  }

  document.querySelectorAll(".media-card").forEach(function (card) {
    const link = card.querySelector("a[data-preview]");
    if (!link) return;
    try {
      const preview = previewAddress(link.getAttribute("href"));
      const frame = document.createElement("iframe");
      frame.className = "media-preview " + preview.type;
      frame.src = preview.source;
      frame.title = card.querySelector("h2")?.textContent.trim() || "Preview media";
      frame.loading = "lazy";
      frame.allow = "fullscreen; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      card.prepend(frame);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } catch (error) {
      const notice = document.createElement("p");
      notice.className = "banner media-error";
      notice.textContent = "Preview belum tersedia: " + error.message;
      card.prepend(notice);
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
    }
  });

  const empty = document.querySelector("[data-empty-media]");
  if (empty && document.querySelector(".media-card")) empty.hidden = true;
})();
document.querySelectorAll('.photo-carousel').forEach((carousel) => {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  showSlide(current);
});