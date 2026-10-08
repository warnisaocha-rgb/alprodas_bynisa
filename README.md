# 🚀 ALPRO-LAB: Platform Pembelajaran Interaktif C++ (Modul 1 - 3)

Platform web pembelajaran interaktif yang dirancang khusus untuk Asisten Dosen (Asdos) dan praktikan mata kuliah **Algoritma dan Pemrograman Dasar (Alprodas)** Program Studi Teknik Komputer / Teknik Informatika, Universitas Negeri Makassar (UNM).

Platform ini disusun secara sistematis berdasarkan **Laporan Praktikum 1, 2, dan 3** (Pedoman Laprak karya Warnisyah Armin, NIM 250210500034) guna mengatasi kendala umum mahasiswa baru yang kesulitan memahami teori memori dan sintaks C++.

---

## 🌟 Fitur Utama & Keunggulan Platform

### 🎨 1. Pilihan 2 Tema Tampilan (Dual Theme Mode)
* **Tema Cyber Dark (Default)**: Nuansa gelap modern (Slate/Indigo/Cyan) untuk sesi coding malam hari yang fokus dan elegan.
* **Tema Pink & Sorbet (Aesthetic Pastel @cattobiens)**: Dibuat khusus sesuai palet warna imut pastel (`#FFCAD6`, `#E9CBE5`, `#F44F83`, `#EE9DBD`) dengan maskot kucing, sentuhan lembut, dan ramah untuk pemula. Praktikan bisa berganti tema kapan saja dengan 1 klik tombol di navbar!

### 🎬 2. Bioskop Animasi Interaktif (Simulasi Video untuk Orang Awam)
Mahasiswa baru yang belum pernah ngoding sering kesulitan membayangkan hal abstrak. Di tab **Bioskop Animasi**, tersedia simulator video 60 FPS (Canvas + Web Audio API) dengan narasi teks dan suara lembut:
* **Video 1: Perbedaan Karakteristik Tipe Data (Laprak 1)**: Membandingkan 4 wadah memori (`int`, `float/double`, `char/string`, `bool`) dan mendemonstrasikan fenomena *decimal truncation* (saat 3.14 dimasukkan ke `int`, .14 terpotong menjadi 3).
* **Video 2: Rahasia Operator Penugasan (Laprak 2)**: Mengupas tuntas `=` penugasan nilai dari kanan ke kiri vs `==` perbandingan, serta compound assignment (`+=`, `*=`, `%=`) dengan visualisasi brankas variabel digital.
* **Video 3: Tipe Data Bentukan (Laprak 3)**: Mengapa butuh `struct` (Paket Internet Laprak 3.1), perbedaan kamar memori terpisah `struct` vs `union` shared memory (Laprak 3.2), pita `enum` Presiden RI (Laprak 3.3), dan alias `typedef` (Laprak 3.5).

### 📝 3. Simulasi UTS Live Coding (Mengisi Titik-Titik Gabungan Laprak 1 - 3)
* **Format Ujian Realistis**: Praktikan mengerjakan program C++ nyata di mana beberapa sintaks krusial sengaja dikosongkan/ditutupi dalam bentuk kolom isian titik-titik `[ Titik-titik X ]`.
* **5 Paket Soal Lengkap**:
  * **Paket A**: Sistem Kasir Optik Pintar & Diskon Bitwise (Laprak 1 + 2 + 3)
  * **Paket B**: Kuota Internet Mahasiswa & Fenomena Union Nilai (Laprak 1 + 2 + 3)
  * **Paket C**: Pabrik Balok 3D Typedef & Silsilah Enum Presiden (Laprak 1 + 2 + 3)
  * **Paket D**: Laboratorium Geometri Fisika & Operator Ternary (Laprak 1 + 2 + 3)
  * **Paket E**: Logistik Gudang Lab UNM & Enkripsi Shift Right (Laprak 1 + 2 + 3)
* **Timer Ujian 15 Menit**: Menghitung mundur otomatis saat praktikan mulai mengisi.
* **Koreksi & Terminal Compiler Otomatis (g++)**:
  * Jika benar semua: Terminal langsung mengompilasi dan menampilkan output program yang sukses!
  * Jika ada yang salah: Kolom yang salah ditandai merah, dan sistem memunculkan catatan pembahasan serta perbaikan dari Kak Asdos.
* **Lembar Hasil Nilai UTS**: Menampilkan skor akhir, nilai mutu (A/B/C/E), identitas mahasiswa (Nama & NIM), dan tombol cetak/simpan ke PDF.

### 4. C++ Virtual Code Playground & Terminal Simulator
* Mahasiswa dapat memilih kode program dari Laprak 1, 2, atau 3.
* Menyesuaikan variabel input melalui formulir interaktif atau mengedit kode langsung.
* Tombol **"Jalankan Program (g++)"** menampilkan console terminal gelap bergaya VS Code / Code::Blocks dengan status kompilasi dan waktu eksekusi.

### 4. 📐 Panduan & Standar Simbol Flowchart UNM (Laprak 1 - 3)
* **Katalog 4 Simbol Utama**:
  * **Mulai / Selesai (Oval)**: Menandai awal (`int main`) dan akhir program (`return 0`).
  * **Deklarasi (Persegi Bergaris Sisi Ganda)**: Menyiapkan variabel, konstanta, atau struct di RAM.
  * **Proses (Persegi Polos)**: Operasi kalkulasi, rumus matematika, dan assignment.
  * **Input & Output (Jajaran Genjang)**: Operasi keluaran layar (`cout <<`) dan masukan (`cin >>`).
* **Visualisator Flowchart Interaktif**: Diagram alir kasus Luas Lingkaran, Transaksi Kacamata, dan Struct Paket Internet di mana setiap simbol dapat diklik untuk melihat padanan kode program C++!

### 5. 💻 C++ Virtual Code Playground & Terminal Simulator
* Mahasiswa dapat memilih kode program dari Laprak 1, 2, atau 3.
* Menyesuaikan variabel input melalui formulir interaktif atau mengedit kode langsung.
* Tombol **"Jalankan Program (g++)"** menampilkan console terminal gelap bergaya VS Code / Code::Blocks dengan status kompilasi dan waktu eksekusi.

---

## 🖥️ Cara Menjalankan Platform

Ada 3 cara mudah untuk menjalankan platform ini:

### Cara 1: Menggunakan File Batch (Paling Praktis di Windows)
Cukup **klik dua kali (double-click)** pada berkas:
```text
start_web.bat
```
Browser default Anda akan otomatis terbuka di `http://localhost:8000`.

### Cara 2: Menggunakan Python
Buka terminal / PowerShell di folder ini, lalu jalankan:
```bash
python server.py
```
atau:
```bash
python -m http.server 8000
```
Lalu buka browser di alamat `http://localhost:8000`.

### Cara 3: Membuka Langsung File HTML
Bisa juga langsung klik dua kali pada berkas `index.html` untuk membuka secara offline di Google Chrome, Microsoft Edge, atau Mozilla Firefox.

---

## 📁 Struktur Berkas

```text
ASDOS ALPRODAS/
│
├── index.html          # Halaman Web App Utama Interaktif
├── server.py           # Web Server Lokal Python
├── start_web.bat       # Launcher 1-Klik Windows
├── README.md           # Dokumentasi Panduan Asdos & Praktikan
│
├── css/
│   └── style.css       # Styling, font JetBrains Mono, efek glow & terminal
│
└── js/
    ├── data.js         # Data materi modul 1-3, kasus laprak & panduan flowchart
    ├── visualizers.js  # Engine visualisator RAM, Bitwise, Struct/Union, Increment
    ├── animator.js     # Engine animasi video 60 FPS di Canvas ("Bioskop Edukasi")
    ├── uts_engine.js   # Engine Simulasi UTS Live Coding (Isi Celah Kode)
    ├── simulator.js    # C++ Virtual Playground & Terminal Compiler Simulator
    └── app.js          # Controller utama navigasi tab, tema & flowchart viewer
```

---

Dibuat dengan ❤️ untuk kemajuan pendidikan pemrograman mahasiswa baru UNM.
Semoga asistensinya menyenangkan dan adek tingkat makin paham serta mencintai dunia pemrograman!
