# PANDUAN EDIT E-PORTOFOLIO — KONTEN LANGSUNG DI HTML

## 1. Cara membuka
Ekstrak seluruh ZIP ke satu folder, lalu buka index.html.
Tidak perlu instalasi, database, atau proses build.
Preview Google Drive/YouTube memerlukan koneksi internet.
Folder assets harus tetap berada di samping file HTML.

## 2. Peta file
index.html             = isi dan tampilan Home
profile.html           = nama, profil, visi, dan misi
analisis-artefak.html   = analisis dan URL preview artefak
refleksi.html          = narasi refleksi
model-guru.html        = model/karakter guru
filosofi.html          = prinsip dan filosofi pendidikan
lampiran.html          = judul, keterangan, dan URL preview lampiran
assets/css/style.css   = warna, ukuran, jarak, dan tampilan responsif
assets/js/main.js      = tombol menu ponsel dan konversi URL preview
assets/img/            = tempat gambar tambahan
PANDUAN.html           = panduan dalam browser
PANDUAN.md             = panduan teks
MULAI_DI_SINI.txt      = langkah singkat

Tidak ada lagi folder data, editor isi, tombol tambah media, ataupun penyimpanan localStorage.
Semua teks dan URL diubah langsung pada file HTML.
File main.js tidak berisi narasi konten.

## 3. Mengganti teks
Buka HTML halaman yang ingin diedit menggunakan VS Code atau editor teks.
Cari komentar KONTEN MULAI. Di bawahnya, cari teks yang ingin Anda ganti.
Misalnya di profile.html:
  <h2>Nama pendidik</h2>
Ganti menjadi:
  <h2>Nama Anda</h2>

Teks paragraf berada di antara <p> dan </p>.
Judul utama berada di <h1>; judul bagian di <h2> atau <h3>.
Untuk menambah paragraf, tambahkan pasangan <p>...</p>.
Untuk pindah baris dalam paragraf, gunakan <br>.
Jangan menghapus penutup tag, tanda kutip atribut, atau struktur kartu.
Karakter & sebaiknya ditulis &amp;, tanda < sebagai &lt;, dan tanda > sebagai &gt; bila merupakan bagian dari teks.

## 4. Menambahkan dokumen Google Drive
Buka lampiran.html atau analisis-artefak.html.
Cari komentar DAFTAR MEDIA MULAI.
Di sana ada dua contoh kartu yang belum aktif karena diletakkan di dalam komentar HTML.
Salin kode aktif berikut ke dalam <div class="media-grid">:

<article class="media-card">
  <div class="media-body">
    <div class="media-type">GOOGLE DRIVE · DOKUMEN</div>
    <h2>Modul Ajar Siklus 1</h2>
    <p>Keterangan atau analisis artefak Anda.</p>
    <div class="media-actions">
      <a
        class="text-link"
        data-preview
        href="TEMPEL_TAUTAN_GOOGLE_DRIVE_ASLI_DI_SINI"
        target="_blank"
        rel="noopener noreferrer"
      >Buka sumber ↗</a>
    </div>
  </div>
</article>

Ganti seluruh nilai href dengan tautan file Google Drive dari tombol Bagikan.
Contoh format: https://drive.google.com/file/d/ID_FILE_ANDA/view
Anda cukup mengubah URL pada href satu kali. Skrip otomatis membuat iframe preview.
Tidak perlu mengubah link menjadi /preview sendiri.
Tautan folder Drive tidak didukung.
Google Docs, Sheets, dan Slides juga dapat menggunakan tautan dokumen standar.
Untuk Analisis Artefak, gunakan <p> untuk alasan pemilihan, pemaknaan, dan kaitan praktis.
Boleh tambahkan beberapa <p> apabila analisis panjang.

## 5. Menambahkan video YouTube
Gunakan pola kartu yang sama:
  <article class="media-card">
    <div class="media-body">
      <div class="media-type">YOUTUBE · VIDEO</div>
      <h2>Video Pembelajaran Siklus 4</h2>
      <p>Dokumentasi pembelajaran.</p>
      <div class="media-actions">
        <a class="text-link" data-preview
           href="TEMPEL_TAUTAN_YOUTUBE_ASLI_DI_SINI"
           target="_blank" rel="noopener noreferrer">Buka sumber ↗</a>
      </div>
    </div>
  </article>

Ganti href dengan tautan YouTube asli.
Didukung: youtube.com/watch?v=ID, youtu.be/ID, /shorts/ID, /live/ID, /embed/ID.
YouTube akan tampil sebagai pemutar video di atas judul dan keterangannya.
Video mengikuti izin penyematan, wilayah, dan pembatasan pemilik.

## 6. Mengaktifkan contoh kartu yang sudah ada
Contoh berada di antara pembuka komentar <!-- CONTOH ... dan penutup ... -->.
Untuk mengaktifkan:
1. Hapus baris pembuka komentar sampai tepat sebelum <article>.
2. Hapus baris AKHIR CONTOH ... --> setelah </article>.
3. Ganti placeholder href dengan URL media asli.
4. Ganti judul dan keterangannya.
Jangan membiarkan placeholder sebagai URL aktif.
Komentar HTML tidak tampil di web.

## 7. Menambah atau menghapus kartu
Tambah: salin satu blok lengkap dari <article class="media-card"> sampai </article>.
Tempel di dalam <div class="media-grid"> sebelum komentar DAFTAR MEDIA SELESAI.
Ubah judul, keterangan, dan href.
Tidak perlu id, koma, atau data JavaScript.
Hapus: hapus seluruh satu blok article.
Jika ada kartu aktif, panel “Ruang untuk karya Anda” otomatis disembunyikan.
Jika ingin panel kosong tidak pernah muncul, hapus div yang memiliki data-empty-media.

## 8. Mengapa preview belum tampil?
Pastikan URL memakai HTTPS, bukan placeholder.
Pastikan tautan Drive adalah file, bukan folder.
Pastikan akses file tersedia bagi calon pengunjung.
Untuk dokumen, PDF di Drive biasanya praktis dipreview.
Jika penyematan dibatasi, gunakan Buka sumber untuk melihat file/video langsung.
Jika main.js tidak ikut diunggah, judul/keterangan dan link tetap terlihat, tetapi preview otomatis tidak dibuat.
Jika URL salah, kartu menampilkan pesan agar Anda memperbaiki href.

## 9. Mengganti foto profil
Saat ini area profil berisi ilustrasi SVG.
Di profile.html, cari <div class="portrait">.
Ganti elemen <svg>...</svg> di dalamnya dengan:
  <img src="assets/img/foto-profil.jpg" alt="Foto profil"
       style="width:100%;height:310px;object-fit:cover;">
Simpan foto dengan nama foto-profil.jpg di assets/img/.
Sesuaikan nama file dan atribut alt bila berbeda.

## 10. Mengganti desain
Buka assets/css/style.css.
Bagian :root memuat warna utama:
--bg = latar, --ink = teks, --green = warna utama, --lime = aksen.
Cari h1 untuk ukuran judul; .media-preview untuk tinggi preview dokumen.
Bagian @media mengatur layar tablet dan ponsel.
Navigasi dan footer tertulis di masing-masing HTML; jika menggantinya, lakukan pada tujuh file agar konsisten.

## 11. Mempublikasikan perubahan
Simpan HTML dan muat ulang browser untuk melihat hasil lokal.
Untuk hosting statis, unggah seluruh isi folder EPortofolio.
Pastikan index.html berada di akar folder yang diterbitkan.
Setiap perubahan HTML harus diunggah ulang agar terlihat oleh semua pengunjung.
Jika hosting masih menampilkan versi lama, lakukan hard refresh.
Tidak ada lagi perbedaan antara isi kode dan isi tersimpan di browser pada versi ini.

## 12. Catatan beralih dari versi sebelumnya
Versi ini tidak membaca data yang dahulu disimpan editor browser.
Bila ada URL atau narasi yang hanya pernah dimasukkan melalui editor versi lama, salin ke HTML versi ini.
Jangan mencampur folder data atau skrip editor versi lama ke dalam folder versi ini.
Tidak ada tombol upload, tambah media, edit isi, impor, atau ekspor.
