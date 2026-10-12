/**
 * ALPRO-LAB DATA STORE
 * Materi Lengkap Berdasarkan Laporan Praktikum 1 - 3
 * Algoritma dan Pemrograman Dasar C++
 * Universitas Negeri Makassar - Prodi Teknik Komputer
 */

const ALPRO_DATA = {
  meta: {
    title: "ALPRO-LAB: Pembelajaran Alpro C++ Modul 1 - 5",
    subtitle: "Media Belajar Teori, Analogi Pemula & Sintaks Interaktif Khusus Praktikan Alprodas",
    author: "Kakak Asisten Dosen Alprodas UNM",
    pedoman: "Laporan Praktikum 1 s.d. 5 (Warnisyah Armin - Teknik Komputer UNM)",
    version: "3.0 - Seleksi Kondisi & Control Flow Edition"
  },

  modules: [
    {
      id: "modul-1",
      number: 1,
      title: "Variabel, Konstanta & Tipe Data Dasar",
      badge: "Fondasi Utama",
      icon: "box",
      color: "blue",
      summary: "Pelajari cara komputer menyimpan data di memori: integer, float, double, char, dan boolean, serta cara kerja variabel & konstanta C++.",
      objectives: [
        "Memahami dan mengimplementasikan tipe data integer dan variasinya (short, int, long, unsigned)",
        "Memahami dan membedakan tipe data float (single precision) dan double (double precision)",
        "Memahami dan mengimplementasikan tipe data boolean (true / false)",
        "Memahami dan mengimplementasikan tipe data char (ASCII 1 byte)",
        "Memahami konsep variabel, konstanta (const dan #define), serta I/O stream (cout, cin, iomanip)"
      ],
      theory: {
        intro: `Dalam pemrograman C++, <strong>Tipe Data</strong> adalah klasifikasi yang menentukan jenis nilai yang dapat disimpan dalam variabel serta operasi yang dapat dilakukan pada nilai tersebut. Menurut Kernighan & Ritchie (1988), tipe data membantu pengelolaan memori komputer dan memastikan data diproses secara aman sesuai jenisnya.`,
        analogy: `Bayangkan RAM komputermu seperti lemari dengan laci-laci berukuran berbeda. Kamu tidak bisa memasukkan kasur ke laci kaos kaki! Tipe data memberi tahu compiler ukuran laci yang harus disiapkan (misal 1 byte, 4 byte, atau 8 byte) dan jenis barang apa yang boleh masuk (bilangan bulat, angka koma, atau huruf).`,
        dataTypesTable: [
          { type: "char", size: "1 Byte (8 bit)", range: "-128 s.d. 127", desc: "Menyimpan 1 karakter atau angka ASCII kecil", example: "char grade = 'A';" },
          { type: "unsigned char", size: "1 Byte (8 bit)", range: "0 s.d. 255", desc: "Karakter tanpa tanda negatif", example: "unsigned char kode = 200;" },
          { type: "short int", size: "2 Byte (16 bit)", range: "-32.768 s.d. 32.767", desc: "Bilangan bulat berukuran kecil", example: "short int umur = 20;" },
          { type: "int", size: "4 Byte (32 bit)", range: "-2.147.483.648 s.d. 2.147.483.647", desc: "Bilangan bulat standar paling umum", example: "int jumlah = 50000;" },
          { type: "unsigned int", size: "4 Byte (32 bit)", range: "0 s.d. 4.294.967.295", desc: "Bilangan bulat non-negatif (jangkauan positif 2x lipat)", example: "unsigned int penduduk = 4000000000;" },
          { type: "long int", size: "4 atau 8 Byte", range: "Sama dengan int / lebih besar", desc: "Bilangan bulat panjang", example: "long int jarak = 1000000L;" },
          { type: "long long int", size: "8 Byte (64 bit)", range: "±9.22 × 10¹⁸", desc: "Bilangan bulat ekstra besar", example: "long long int nanos = 123456789012345LL;" },
          { type: "float", size: "4 Byte (32 bit)", range: "±1.2×10⁻³⁸ s.d. ±3.4×10³⁸ (6-7 digit presisi)", desc: "Bilangan riil pecahan (single precision)", example: "float phi = 3.14159f;" },
          { type: "double", size: "8 Byte (64 bit)", range: "±2.3×10⁻³⁰⁸ s.d. ±1.7×10³⁰⁸ (15-17 digit)", desc: "Bilangan pecahan presisi tinggi (double precision)", example: "double gravitasi = 9.806652;" },
          { type: "bool", size: "1 Byte (8 bit)", range: "true (1) atau false (0)", desc: "Nilai logika kebenaran", example: "bool lulus = true;" }
        ],
        codeAnatomy: [
          { line: "#include <iostream>", explanation: "Preprocessor directive untuk menyertakan pustaka iostream (Input/Output Stream) agar bisa memakai 'cout' dan 'cin'." },
          { line: "#include <iomanip>", explanation: "Pustaka untuk manipulasi I/O, misalnya 'setprecision(n)' untuk mengatur jumlah digit desimal output." },
          { line: "using namespace std;", explanation: "Memberi tahu compiler agar kita bisa memanggil elemen standar seperti 'cout', 'cin', 'endl' tanpa awalan 'std::'." },
          { line: "const float PHI = 3.14;", explanation: "Mendeklarasikan variabel konstanta: nilainya TIDAK BISA diubah setelah ditetapkan." },
          { line: "int main() { ... }", explanation: "Fungsi utama program. Eksekusi kode C++ SELALU dimulai dari baris pertama fungsi main()." },
          { line: "return 0;", explanation: "Mengembalikan status 0 ke sistem operasi, menandakan bahwa program berhasil dieksekusi tanpa galat/error." }
        ]
      },
      cases: [
        {
          id: "case-1-1",
          title: "Studi Kasus 1: Perhitungan Luas Lingkaran (Praktikum 1)",
          description: "Menghitung luas lingkaran menggunakan konstanta nilai PHI (3.14) dan jari-jari (r = 2.5) dengan tipe data float.",
          flowchart: [
            { step: "Mulai", shape: "oval" },
            { step: "Deklarasi: float PHI = 3.14, float r = 2.5, float L", shape: "process" },
            { step: "Hitung Luas: L = PHI * r * r", shape: "process" },
            { step: "Cetak Output: 'Luas lingkaran adalah: ' + L + ' Cm'", shape: "io" },
            { step: "Selesai", shape: "oval" }
          ],
          code: `#include <iostream>
using namespace std;

int main() {
    // Deklarasi konstanta PHI dan variabel jari-jari serta Luas
    const float PHI = 3.14f;
    float r = 2.5f;
    float L;

    // Rumus Luas Lingkaran = PHI * r^2
    L = PHI * r * r;

    // Tampilkan hasil ke terminal
    cout << "=================================" << endl;
    cout << "  PROGRAM HITUNG LUAS LINGKARAN  " << endl;
    cout << "=================================" << endl;
    cout << "Jari-jari (r)   : " << r << " cm" << endl;
    cout << "Nilai PHI       : " << PHI << endl;
    cout << "Luas lingkaran  : " << L << " cm^2" << endl;

    return 0;
}`,
          expectedOutput: `=================================
  PROGRAM HITUNG LUAS LINGKARAN  
=================================
Jari-jari (r)   : 2.5 cm
Nilai PHI       : 3.14
Luas lingkaran  : 19.625 cm^2`
        },
        {
          id: "case-1-2",
          title: "Studi Kasus 2: Transaksi Optik Kacamata (Praktikum 1 Bagian E)",
          description: "Menerapkan kombinasi tipe data: string nama, unsigned short int umur, float lensa, unsigned long int harga, int diskon.",
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Penggunaan beragam tipe data sesuai karakteristik data
    string namaPasien = "Ferdi sambo";
    unsigned short int umur = 55;
    float ukuranKacamata = -2.5f;
    unsigned long int hargaKacamata = 2147483;
    int diskon = 5000;

    // Hitung total bayar
    unsigned long int totalBayar = hargaKacamata - diskon;

    cout << "===== STRUK TRANSAKSI OPTIK =====" << endl;
    cout << "Nama Pasien     : " << namaPasien << endl;
    cout << "Umur Pasien     : " << umur << " Tahun" << endl;
    cout << "Ukuran Kacamata : " << ukuranKacamata << " Dioptri" << endl;
    cout << "Harga Kacamata  : Rp " << hargaKacamata << endl;
    cout << "Diskon          : Rp " << diskon << endl;
    cout << "---------------------------------" << endl;
    cout << "Total Bayar     : Rp " << totalBayar << endl;

    return 0;
}`,
          expectedOutput: `===== STRUK TRANSAKSI OPTIK =====
Nama Pasien     : Ferdi sambo
Umur Pasien     : 55 Tahun
Ukuran Kacamata : -2.5 Dioptri
Harga Kacamata  : Rp 2147483
Diskon          : Rp 5000
---------------------------------
Total Bayar     : Rp 2142483`
        },
        {
          id: "case-1-3",
          title: "Studi Kasus 3: Format Presisi Pecahan dengan iomanip (Praktikum 1.3)",
          description: "Melihat pengaruh setprecision untuk float (presisi tunggal) vs double (presisi ganda).",
          code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    float tinggiBadan = 155.123456f;
    double beratBadan = 50.1234567891011;

    cout << "Tanpa setprecision:" << endl;
    cout << "Tinggi Badan: " << tinggiBadan << endl;
    cout << "Berat Badan : " << beratBadan << endl;

    cout << "\nDengan setprecision:" << endl;
    cout << "Tinggi (8 digit): " << setprecision(8) << tinggiBadan << endl;
    cout << "Berat (11 digit): " << setprecision(11) << beratBadan << endl;

    return 0;
}`,
          expectedOutput: `Tanpa setprecision:
Tinggi Badan: 155.123
Berat Badan : 50.1235

Dengan setprecision:
Tinggi (8 digit): 155.12346
Berat (11 digit): 50.123456789`
        }
      ]
    },

    {
      id: "modul-2",
      number: 2,
      title: "Operator dalam C++",
      badge: "Logika & Kalkulasi",
      icon: "cpu",
      color: "emerald",
      summary: "Kuasai operator Unary, Binary, Ternary: Aritmatika, Assignment, Pre/Post Increment, Relasional, Logika Boolean, hingga Bitwise Shift (<< & >>).",
      objectives: [
        "Memahami definisi dan sifat operator: Unary (1 operand), Binary (2 operand), Ternary (3 operand)",
        "Menguasai operator Aritmatika (+, -, *, /, %) dan aturan pembagian integer",
        "Memahami perbedaan krusial Pre-increment (++x) vs Post-increment (x++)",
        "Menguasai operator Relasional / Pembanding (==, !=, <, >, <=, >=) yang menghasilkan boolean",
        "Menguasai operator Logika (&&, ||, !) serta memahami Tabel Kebenaran",
        "Memahami operator Bitwise Shifting (<< geser kiri dan >> geser kanan) dan representasi binernya"
      ],
      theory: {
        intro: `<strong>Operator</strong> adalah simbol khusus yang memberikan instruksi kepada compiler untuk melakukan manipulasi atau operasi matematika/logika tertentu terhadap satu atau lebih <strong>operand</strong> (data/variabel).`,
        operatorProperties: [
          { name: "Unary Operator", operands: "1 Operand", desc: "Melibatkan satu variabel saja.", examples: "++a, --b, !flag, -angka" },
          { name: "Binary Operator", operands: "2 Operand", desc: "Melibatkan dua operand dengan operator di tengah.", examples: "a + b, x * y, a == b, p && q" },
          { name: "Ternary Operator", operands: "3 Operand", desc: "Operator kondisi (conditional ternary).", examples: "(nilai >= 75) ? 'Lulus' : 'Remedial'" }
        ],
        categories: [
          {
            category: "1. Operator Aritmatika",
            items: [
              { op: "+", desc: "Penjumlahan", contoh: "10 + 5 = 15" },
              { op: "-", desc: "Pengurangan", contoh: "10 - 5 = 5" },
              { op: "*", desc: "Perkalian", contoh: "10 * 5 = 50" },
              { op: "/", desc: "Pembagian (Jika kedua operand int, hasilnya bilangan bulat!)", contoh: "10 / 4 = 2 (Bukan 2.5!)" },
              { op: "%", desc: "Modulus (Sisa pembagian, hanya berlaku untuk integer)", contoh: "10 % 3 = 1" }
            ]
          },
          {
            category: "2. Increment (++) & Decrement (--)",
            items: [
              { op: "++x (Pre-increment)", desc: "Nilai ditambah 1 DULU, baru digunakan dalam ekspresi", contoh: "int a = 5; int b = ++a; // a=6, b=6" },
              { op: "x++ (Post-increment)", desc: "Nilai digunakan DULU, baru variabel ditambah 1 setelahnya", contoh: "int a = 5; int b = a++; // b=5, lalu a jadi 6" },
              { op: "--x (Pre-decrement)", desc: "Nilai dikurang 1 DULU, baru digunakan", contoh: "int a = 5; int b = --a; // a=4, b=4" },
              { op: "x-- (Post-decrement)", desc: "Nilai digunakan DULU, baru variabel dikurang 1", contoh: "int a = 5; int b = a--; // b=5, lalu a jadi 4" }
            ]
          },
          {
            category: "3. Operator Penugasan (Assignment & Compound)",
            items: [
              { op: "=", desc: "Menetapkan nilai ke variabel", contoh: "x = 10;" },
              { op: "+=", desc: "x = x + y", contoh: "x += 5; // x bertambah 5" },
              { op: "-=", desc: "x = x - y", contoh: "x -= 3; // x berkurang 3" },
              { op: "*=", desc: "x = x * y", contoh: "x *= 2; // x dikali 2" },
              { op: "/=", desc: "x = x / y", contoh: "x /= 2; // x dibagi 2" },
              { op: "%=", desc: "x = x % y", contoh: "x %= 3; // x diisi sisa bagi" },
              { op: "<<=", desc: "x = x << y (Shift left compound)", contoh: "x <<= 1; // geser kiri 1 bit" },
              { op: ">>=", desc: "x = x >> y (Shift right compound)", contoh: "x >>= 1; // geser kanan 1 bit" }
            ]
          },
          {
            category: "4. Operator Relasi & Pembanding",
            items: [
              { op: "==", desc: "Sama dengan (PERHATIAN: Jangan tertukar dengan = penugasan!)", contoh: "(5 == 5) -> 1 (true)" },
              { op: "!=", desc: "Tidak sama dengan", contoh: "(5 != 3) -> 1 (true)" },
              { op: "<", desc: "Kurang dari", contoh: "(3 < 7) -> 1 (true)" },
              { op: ">", desc: "Lebih dari", contoh: "(8 > 12) -> 0 (false)" },
              { op: "<=", desc: "Kurang dari atau sama dengan", contoh: "(5 <= 5) -> 1 (true)" },
              { op: ">=", desc: "Lebih dari atau sama dengan", contoh: "(10 >= 15) -> 0 (false)" }
            ]
          },
          {
            category: "5. Operator Logika (Boolean Logic)",
            items: [
              { op: "&& (AND)", desc: "Bernilai TRUE hanya jika KEDUA sisi bernilai TRUE", contoh: "(5 > 2) && (10 > 3) -> 1 (true)" },
              { op: "|| (OR)", desc: "Bernilai TRUE jika SALAH SATU atau KEDUA sisi bernilai TRUE", contoh: "(5 > 10) || (10 > 3) -> 1 (true)" },
              { op: "! (NOT)", desc: "Pembalikan nilai logika (TRUE jadi FALSE, FALSE jadi TRUE)", contoh: "!(5 > 2) -> 0 (false)" }
            ]
          },
          {
            category: "6. Operator Bitwise Shift (Laprak Halaman 15-16, 22)",
            items: [
              { op: "a << n (Shift Left)", desc: "Menggeser bit biner ke kiri sebanyak n posisi (sama dengan dikalikan 2ⁿ). Bit kosong di kanan diisi 0.", contoh: "1 << 3: biner 00000001 jadi 00001000 = 8" },
              { op: "b >> n (Shift Right)", desc: "Menggeser bit biner ke kanan sebanyak n posisi (sama dengan dibagi 2ⁿ).", contoh: "10 >> 1: biner 00001010 jadi 00000101 = 5" }
            ]
          }
        ]
      },
      cases: [
        {
          id: "case-2-1",
          title: "Studi Kasus 1: Aritmatika & Increment/Decrement (Praktikum 2.1)",
          description: "Melihat bagaimana perubahan nilai variabel akibat a++ dan b-- memengaruhi hasil perkalian.",
          code: `#include <iostream>
using namespace std;

int main() {
    int hasil, a, b;
    a = 10;
    b = 5;

    // a bertambah 1 -> a menjadi 11
    a++;
    // b berkurang 1 -> b menjadi 4 (di laprak 2.1 ada a++ b--)
    b--;

    hasil = a * b;

    cout << "Nilai a setelah a++ : " << a << endl;
    cout << "Nilai b setelah b-- : " << b << endl;
    cout << "Variabel hasil berisi nilai: " << hasil << endl;

    return 0;
}`,
          expectedOutput: `Nilai a setelah a++ : 11
Nilai b setelah b-- : 4
Variabel hasil berisi nilai: 44`
        },
        {
          id: "case-2-2",
          title: "Studi Kasus 2: Bitwise Shift Left & Shift Right (Praktikum 2.2)",
          description: "Membuktikan pergeseran bit biner pada variabel a = 1 (<<= 3) dan b = 10 (>>= 1).",
          code: `#include <iostream>
using namespace std;

int main() {
    int a = 1;   // Biner 8-bit: 0000 0001
    int b = 10;  // Biner 8-bit: 0000 1010

    // Geser a ke kiri 3 kali: 0000 0001 -> 0000 1000 (Nilai = 8)
    a <<= 3;

    // Geser b ke kanan 1 kali: 0000 1010 -> 0000 0101 (Nilai = 5)
    b >>= 1;

    cout << "Isi variabel a saat ini adalah " << a << endl;
    cout << "Isi variabel b saat ini adalah " << b << endl;

    return 0;
}`,
          expectedOutput: `Isi variabel a saat ini adalah 8
Isi variabel b saat ini adalah 5`
        },
        {
          id: "case-2-3",
          title: "Studi Kasus 3: Relasi & Logika Boolean Terpadu (Praktikum 2.4 & 2.5)",
          description: "Penggabungan relasi pembanding dan logika AND (&&) serta OR (||).",
          code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 5;

    // Evaluasi ekspresi relasional (menghasilkan bool)
    bool c = a < b;               // 10 < 5 -> false (0)
    bool d = a > b;               // 10 > 5 -> true (1)
    bool e = (a > b) && (a != b); // (true) && (true) -> true (1)

    cout << boolalpha; // Agar output mencetak 'true'/'false' bukan 1/0
    cout << "Hasil perbandingan a < b : " << c << endl;
    cout << "Hasil perbandingan a > b : " << d << endl;
    cout << "Hasil (a > b) && (a != b): " << e << endl;

    return 0;
}`,
          expectedOutput: `Hasil perbandingan a < b : false
Hasil perbandingan a > b : true
Hasil (a > b) && (a != b): true`
        }
      ]
    },

    {
      id: "modul-3",
      number: 3,
      title: "Tipe Data Bentukan: Struct, Union, Enum, Typedef",
      badge: "Arsitektur Data",
      icon: "layers",
      color: "purple",
      summary: "Pelajari cara membungkus banyak variabel menjadi satu tipe custom dengan Struct & Union. Pahami perbedaan alokasi RAM yang sering membuat mahasiswa bingung!",
      objectives: [
        "Memahami definisi dan urgensi tipe data bentukan (User-Defined Data Types)",
        "Menguasai sintaks deklarasi Struct, inisialisasi objek, dan operator titik (.)",
        "Menguasai sintaks Union dan memahami konsep memori bersama (shared memory)",
        "Menganalisis perbedaan mendasar Struct vs Union melalui visualisasi RAM",
        "Menggunakan enum untuk daftar konstanta terindeks (studi kasus Presiden RI)",
        "Menggunakan typedef untuk memberi nama alias tipe data"
      ],
      theory: {
        intro: `Di dunia nyata, satu objek sering memiliki banyak atribut berbeda. Contohnya sebuah <strong>Paket Internet</strong> memiliki nama paket (string), kuota telpon (int), dan kuota internet (int). Tipe data primitif tunggal seperti <code>int</code> tidak cukup. Di sinilah kita membutuhkan <strong>Tipe Data Bentukan</strong> (User-Defined Type)!`,
        structSection: {
          title: "A. Struct (Structure)",
          definition: "Struct adalah tipe data bentukan yang mengelompokkan beberapa variabel (member) dengan tipe data yang sama maupun berbeda ke dalam satu wadah berwujud nama baru.",
          syntax: `struct NamaStruct {
    tipe_data member1;
    tipe_data member2;
};`,
          memoryBehavior: "Setiap member di dalam struct memiliki <strong>ALAMAT MEMORI SENDIRI</strong> secara berdampingan. Total memori struct adalah jumlah dari semua ukuran membernya.",
          accessMethod: "Gunakan tanda titik (dot operator): <code>nama_objek.nama_member</code>"
        },
        unionSection: {
          title: "B. Union (Memori Bersama)",
          definition: "Union secara sintaks mirip dengan struct, namun SEMUA MEMBER BERBAGI LOKASI MEMORI YANG SAMA. Ukuran union HANYA sebesar ukuran member terbesarnya!",
          syntax: `union NamaUnion {
    tipe_data member1;
    tipe_data member2;
};`,
          memoryBehavior: "Karena berbagi alamat memori yang sama, <strong>hanya SATU member yang bisa menyimpan nilai valid pada satu waktu</strong>. Jika Anda mengisi member B, maka nilai member A yang sebelumnya tersimpan akan tertimpa (overwritten)!",
          accessMethod: "Sama seperti struct, menggunakan tanda titik: <code>nama_objek.nama_member</code>"
        },
        comparisonTable: [
          { feature: "Kata Kunci", structVal: "Menggunakan keyword 'struct'", unionVal: "Menggunakan keyword 'union'" },
          { feature: "Alokasi Memori", structVal: "Tiap member dialokasikan di alamat RAM terpisah", unionVal: "Semua member BERBAGI satu alamat RAM yang sama" },
          { feature: "Ukuran Total (sizeof)", structVal: "Total penjumlahan ukuran semua member (+ alignment)", unionVal: "Hanya sebesar ukuran member terbesarnya saja" },
          { feature: "Akses Nilai", structVal: "Semua member dapat menyimpan dan diakses bersamaan secara valid", unionVal: "Hanya satu member yang menyimpan nilai valid pada satu waktu" },
          { feature: "Efek Overwrite", structVal: "Mengubah member A tidak memengaruhi member B", unionVal: "Mengubah member A akan menimpa nilai member B!" },
          { feature: "Kasus Penggunaan", structVal: "Biodata, data transaksi, entitas lengkap", unionVal: "Penghematan memori ekstrem, representasi data multi-format" }
        ],
        enumSection: {
          title: "C. Enum (Enumeration)",
          definition: "Enum adalah tipe data yang berisi kumpulan konstanta bernilai integer dengan nama simbolik yang mudah dibaca manusia. Secara default, elemen pertama bernilai 0, kedua bernilai 1, dan seterusnya.",
          syntax: `enum namaPresiden { Soekarno, Soeharto, Habibie, Megawati, Gusdur, SBY, Jokowi };`
        },
        typedefSection: {
          title: "D. Typedef",
          definition: "Typedef digunakan untuk memberikan nama alias baru pada tipe data yang sudah ada, membuat kode lebih ekspresif dan mudah dipelihara.",
          syntax: `typedef float angkaPecahan;
typedef string kata;`
        }
      },
      cases: [
        {
          id: "case-3-1",
          title: "Studi Kasus 1: Struct Paket Internet Begadang (Praktikum 3.1)",
          description: "Mendefinisikan struct paket_internet dengan 3 member, membuat objek begadang, dan mengakses nilainya.",
          code: `#include <iostream>
#include <string>
using namespace std;

// Deklarasi Tipe Bentukan Struct
struct paket_internet {
    string nama_paket;
    int kouta_telpon;
    int kouta_internet;
} begadang; // Cara 2: Objek 'begadang' langsung dibuat di akhir struct

int main() {
    // Mengisi data member menggunakan dot operator (.)
    begadang.nama_paket = "Begadang";
    begadang.kouta_telpon = 50;
    begadang.kouta_internet = 25;

    // Menampilkan isi data struct
    cout << "===== DETAIL PAKET INTERNET =====" << endl;
    cout << "Nama paket     : " << begadang.nama_paket << endl;
    cout << "Kouta telpon   : " << begadang.kouta_telpon << " Menit" << endl;
    cout << "Kouta internet : " << begadang.kouta_internet << " GB" << endl;

    return 0;
}`,
          expectedOutput: `===== DETAIL PAKET INTERNET =====
Nama paket     : Begadang
Kouta telpon   : 50 Menit
Kouta internet : 25 GB`
        },
        {
          id: "case-3-2",
          title: "Studi Kasus 2: Demonstrasi Memori Union DaftarNilai (Praktikum 3.2)",
          description: "Membuktikan fenomena Union: ukuran memori hanya 4 bytes dan nilai pengetahuan menimpa nilai sikap!",
          code: `#include <iostream>
using namespace std;

// Deklarasi Union: Ketiga member float berbagi 4 byte yang sama!
union DaftarNilai {
    float nilaiPengetahuan;
    float nilaiSikap;
    float nilaiPsikomotorik;
} budi;

int main() {
    // 1. Isi nilaiSikap pertama kali
    budi.nilaiSikap = 70.5f;

    // 2. Sekarang isi nilaiPengetahuan
    budi.nilaiPengetahuan = 85.5f;

    // Perhatikan: Karena berada di alamat memori yang sama,
    // pengisian nilaiPengetahuan menimpa nilaiSikap!
    cout << "Nilai Pengetahuan : " << budi.nilaiPengetahuan << endl;
    cout << "Nilai Sikap       : " << budi.nilaiSikap << "  <-- Ikut tertimpa!" << endl;
    cout << "Nilai Psikomotorik: " << budi.nilaiPsikomotorik << "  <-- Ikut membaca bit yang sama!" << endl;
    cout << "Ukuran Objek      : " << sizeof(budi) << " bytes" << endl;

    return 0;
}`,
          expectedOutput: `Nilai Pengetahuan : 85.5
Nilai Sikap       : 85.5  <-- Ikut tertimpa!
Nilai Psikomotorik: 85.5  <-- Ikut membaca bit yang sama!
Ukuran Objek      : 4 bytes`
        },
        {
          id: "case-3-3",
          title: "Studi Kasus 3: Enum Urutan Presiden RI (Praktikum 3.3)",
          description: "Menggunakan enum namaPresiden di mana index otomatis dimulai dari 0 (Soekarno=0, Soeharto=1, Habibie=2, dst).",
          code: `#include <iostream>
using namespace std;

// Enum otomatis mengurutkan 0, 1, 2, 3, 4, 5, 6
enum namaPresiden {
    Soekarno,  // index 0
    Soeharto,  // index 1
    Habibie,   // index 2
    Megawati,  // index 3
    Gusdur,    // index 4
    SBY,       // index 5
    Jokowi     // index 6
} presidenku;

int main() {
    namaPresiden presiden;

    // Set presiden = Habibie (nilai integer = 2)
    presiden = Habibie;
    cout << "Presiden Indonesia Ke-" << (presiden + 1) << " : B.J. Habibie" << endl;

    // Set presidenku = Jokowi (nilai integer = 6)
    presidenku = Jokowi;
    cout << "Presiden Indonesia Ke-" << (presidenku + 1) << " : Joko Widodo" << endl;

    return 0;
}`,
          expectedOutput: `Presiden Indonesia Ke-3 : B.J. Habibie
Presiden Indonesia Ke-7 : Joko Widodo`
        },
        {
          id: "case-3-4",
          title: "Studi Kasus 4: Union dengan Berbeda Tipe Data (char, int, float)",
          description: "Membuktikan fenomena Union saat menggunakan tipe data yang berbeda: ukuran memori hanya mengambil member terbesar (4 byte) dan data baru menimpa data lama.",
          code: `#include <iostream>
using namespace std;

// Union serbaguna dengan 3 tipe data berbeda
union DataSerbaguna {
    char huruf;         // 1 Byte
    int angkaBulat;     // 4 Byte
    float angkaKoma;    // 4 Byte
};

int main() {
    DataSerbaguna kotak;

    cout << "=== DEMO UNION DENGAN TIPE DATA BERBEDA ===" << endl;
    cout << "Ukuran char        : " << sizeof(kotak.huruf) << " byte" << endl;
    cout << "Ukuran int         : " << sizeof(kotak.angkaBulat) << " byte" << endl;
    cout << "Ukuran float       : " << sizeof(kotak.angkaKoma) << " byte" << endl;
    cout << "Total Ukuran Union : " << sizeof(kotak) << " byte (Hanya sebesar yang terbesar!)" << endl << endl;

    // Tahap 1: Mengisi huruf 'A'
    kotak.huruf = 'A';
    cout << "[1] Isi huruf       : " << kotak.huruf << " (VALID)" << endl;

    // Tahap 2: Mengisi angka bulat 100 -> menimpa huruf!
    kotak.angkaBulat = 100;
    cout << "[2] Isi angkaBulat  : " << kotak.angkaBulat << " (VALID)" << endl;
    cout << "    Isi huruf lama  : " << kotak.huruf << " (TERTIMPA kode ASCII 100 = 'd')" << endl;

    // Tahap 3: Mengisi angka koma 3.14 -> menimpa angka bulat!
    kotak.angkaKoma = 3.14f;
    cout << "[3] Isi angkaKoma   : " << kotak.angkaKoma << " (VALID)" << endl;
    cout << "    Isi angkaBulat  : " << kotak.angkaBulat << " (RUSAK bit terbagi)" << endl;

    return 0;
}`,
          expectedOutput: `=== DEMO UNION DENGAN TIPE DATA BERBEDA ===
Ukuran char        : 1 byte
Ukuran int         : 4 byte
Ukuran float       : 4 byte
Total Ukuran Union : 4 byte (Hanya sebesar yang terbesar!)

[1] Isi huruf       : A (VALID)
[2] Isi angkaBulat  : 100 (VALID)
    Isi huruf lama  : d (TERTIMPA kode ASCII 100 = 'd')
[3] Isi angkaKoma   : 3.14 (VALID)
    Isi angkaBulat  : 1078530011 (RUSAK bit terbagi)`
        },
        {
          id: "case-3-5",
          title: "Studi Kasus 5: Typedef & Struct Volume Balok (Praktikum 3.5)",
          description: "Mengkombinasikan typedef angkaPecahan/kata dengan struct balok untuk menghitung volume 3 balok.",
          code: `#include <iostream>
#include <string>
using namespace std;

// Menggunakan typedef sebagai alias tipe data
typedef float angkaPecahan;
typedef string kata;

struct balok {
    kata nama;
    angkaPecahan panjang;
    angkaPecahan lebar;
    angkaPecahan tinggi;
};

int main() {
    // Inisialisasi struct balok A, B, C
    balok balokA = {"Si Merah", 10.0f, 2.5f, 2.0f};
    balok balokB = {"Si Kuning", 5.5f, 3.0f, 0.0f};
    balok balokC = {"Si Hijau", 2.0f, 1.5f, 1.0f};

    // Hitung volume
    angkaPecahan volA = balokA.panjang * balokA.lebar * balokA.tinggi;
    angkaPecahan volB = balokB.panjang * balokB.lebar * balokB.tinggi;
    angkaPecahan volC = balokC.panjang * balokC.lebar * balokC.tinggi;

    cout << "===== " << balokA.nama << " =====" << endl;
    cout << "Panjang: " << balokA.panjang << ", Lebar: " << balokA.lebar << ", Tinggi: " << balokA.tinggi << endl;
    cout << "Volume : " << volA << " cm^3" << endl;

    cout << "\n===== " << balokB.nama << " =====" << endl;
    cout << "Panjang: " << balokB.panjang << ", Lebar: " << balokB.lebar << ", Tinggi: " << balokB.tinggi << endl;
    cout << "Volume : " << volB << " cm^3" << endl;

    cout << "\n===== " << balokC.nama << " =====" << endl;
    cout << "Panjang: " << balokC.panjang << ", Lebar: " << balokC.lebar << ", Tinggi: " << balokC.tinggi << endl;
    cout << "Volume : " << volC << " cm^3" << endl;

    return 0;
}`,
          expectedOutput: `===== Si Merah =====
Panjang: 10, Lebar: 2.5, Tinggi: 2
Volume : 50 cm^3

===== Si Kuning =====
Panjang: 5.5, Lebar: 3, Tinggi: 0
Volume : 0 cm^3

===== Si Hijau =====
Panjang: 2, Lebar: 1.5, Tinggi: 1
Volume : 3 cm^3`
        }
      ]
    },

    {
      id: "modul-4",
      number: 4,
      title: "Tipe Data String & Pustaka <string>",
      badge: "Manipulasi Teks C++",
      icon: "type",
      color: "emerald",
      summary: "Pelajari perbedaan mendasar C-String (char[]) vs C++ std::string, membaca input berspasi dengan cin.get(), serta 10 fungsi sakti pustaka <string> seperti .length(), .replace(), .find(), swap(), dan .at()!",
      objectives: [
        "Memahami dan mengimplementasikan penggunaan tipe data string gaya C (C-String / array of char) dan gaya C++ (std::string)",
        "Memahami perbedaan cara membaca input string: cin >> (hanya satu kata) vs cin.get() (membaca kalimat berspasi)",
        "Menguasai dan mempraktikkan fungsi-fungsi bawaan pustaka <string>: .length(), .size(), .at(), .replace(), .clear(), swap(), .find(), .empty(), dan .substr()",
        "Mampu mengombinasikan tipe bentukan struct dengan anggota bertipe data string dan pengaksesan karakter spesifiknya (Praktikum 4.4)"
      ],
      theory: {
        intro: `Dalam pemrograman C++, <strong>String</strong> adalah kumpulan atau deretan karakter yang digunakan untuk merepresentasikan data teks. Berdasarkan Laporan Praktikum 4 (Warnisyah Armin), C++ mendukung dua pendekatan string: <strong>String Gaya Bahasa C (C-style string)</strong> yang berupa larik karakter berukuran tetap diakhiri karakter null (<code>\\0</code>), dan <strong>String Gaya Bahasa C++ (std::string)</strong> yang berbasis kelas objek modern dengan alokasi memori dinamis otomatis.`,
        analogy: `Bayangkan C-String seperti <em>papan nama kayu berukuran tetap</em> (misal 50 slot). Jika nama terlalu panjang maka papannya patah, dan jika ada spasi maka pembacaan cin >> langsung berhenti di kata pertama. Sedangkan std::string seperti <em>pita ketik elastis pintar</em> yang otomatis memanjang atau memendek di memori RAM, serta memiliki tombol-tombol pintar seperti <code>.length()</code> untuk mengukur panjang huruf, <code>.at()</code> untuk mengambil huruf tertentu, <code>.replace()</code> untuk mengganti kata, dan <code>.find()</code> untuk melacak kata kunci!`,
        cVsCppTable: [
          { feature: "Definisi & Tipe Data", cStyle: "Array karakter bertipe char (char nama[50];)", cppStyle: "Objek dari kelas string standar (#include <string>)" },
          { feature: "Sintaks Deklarasi", cStyle: "char str[50] = \"Teks\";", cppStyle: "string str = \"Teks\";" },
          { feature: "Kecepatan Akses", cStyle: "Sangat cepat, langsung di memori statis", cppStyle: "Sangat efisien dengan sedikit overhead class OOP" },
          { feature: "Array Decay", cStyle: "Rentan terjadi degradasi pointer (array decay)", cppStyle: "Aman, terbungkus rapi dalam enkapsulasi objek" },
          { feature: "Alokasi Memori", cStyle: "Statis (ukuran kapasitas tetap sejak awal)", cppStyle: "Dinamis saat runtime (otomatis reallocate)" },
          { feature: "Manipulasi Teks", cStyle: "Membutuhkan fungsi manual dari <cstring>", cppStyle: "Menyediakan method bawaan (.length(), .replace(), dll.)" },
          { feature: "Dukungan Operator", cStyle: "Tidak mendukung operator C++ (+, ==, =)", cppStyle: "Mendukung operator + (gabung), == (banding), = (isi)" }
        ],
        stringMethodsCatalog: [
          { method: ".length() atau .size()", desc: "Mengembalikan jumlah total karakter yang ada dalam string.", example: "str.length(); // \"Halo\" -> 4" },
          { method: ".at(index)", desc: "Mengakses karakter pada posisi indeks tertentu dengan pengecekan batas aman (out of bounds check).", example: "str.at(1); // \"Nisa\" -> 'i'" },
          { method: ".replace(pos, len, str_baru)", desc: "Mengganti sebanyak 'len' karakter mulai dari posisi 'pos' dengan teks baru.", example: "str.replace(0, 4, \"Hai\");" },
          { method: ".clear()", desc: "Menghapus dan mengosongkan seluruh isi string hingga panjangnya menjadi 0.", example: "str.clear(); // str jadi \"\"" },
          { method: "swap(str1, str2)", desc: "Menukar isi dua variabel string secara instan tanpa perlu variabel perantara ketiga.", example: "swap(s1, s2);" },
          { method: ".find(kataKunci)", desc: "Mencari posisi kemunculan pertama substring. Menghasilkan indeks posisi atau string::npos jika tidak ditemukan.", example: "str.find(\"UNM\");" },
          { method: ".empty()", desc: "Mengecek apakah string kosong. Mengembalikan nilai true (1) jika kosong, atau false (0) jika berisi.", example: "str.empty(); // true/false" },
          { method: ".substr(pos, len)", desc: "Memotong dan mengambil cuplikan substring sepanjang 'len' karakter mulai dari posisi 'pos'.", example: "str.substr(0, 4);" },
          { method: "Operator + / .append()", desc: "Menyambung (menggabungkan / konkatenasi) dua string menjadi satu kalimat utuh.", example: "str1 + \" \" + str2;" },
          { method: "cin.get(str, size)", desc: "Membaca teks C-String dari keyboard termasuk spasi hingga batas kapasitas ukuran 'size'.", example: "cin.get(nama, 50);" }
        ]
      },
      cases: [
        {
          id: "case-4-1",
          title: "Studi Kasus 1: Input C-String Satu Kata cin >> (Praktikum 4.1)",
          description: "Membaca input string gaya C menggunakan cin >>. Perhatikan bahwa input akan terpotong jika ada spasi!",
          code: `#include <iostream>
using namespace std;

int main() {
    char namaPanggilan[50];

    cout << "Masukkan nama panggilan anda: ";
    cin >> namaPanggilan; // Hanya membaca kata pertama!

    cout << "Anda memasukkan nama: " << namaPanggilan << endl;

    return 0;
}`,
          expectedOutput: `Masukkan nama panggilan anda: Nisa
Anda memasukkan nama: Nisa`
        },
        {
          id: "case-4-2",
          title: "Studi Kasus 2: Input C-String Berspasi cin.get() (Praktikum 4.2)",
          description: "Membaca nama lengkap ber-spasi menggunakan cin.get(namaLengkap, 50) sehingga spasi tidak memotong teks.",
          code: `#include <iostream>
using namespace std;

int main() {
    char namaLengkap[50];

    cout << "Masukkan nama lengkap anda: ";
    cin.get(namaLengkap, 50); // Membaca teks utuh termasuk spasi!

    cout << "Anda memasukkan: " << namaLengkap << endl;

    return 0;
}`,
          expectedOutput: `Masukkan nama lengkap anda: Warnisyah Armin
Anda memasukkan: Warnisyah Armin`
        },
        {
          id: "case-4-3",
          title: "Studi Kasus 3: Manipulasi Lengkap Pustaka <string> (Praktikum 4.3)",
          description: "Mendemonstrasikan fungsi .length(), .clear(), .replace(), swap(), dan .find() pada objek C++ string.",
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string teks = "Halo, dunia! Selamat datang.";

    // 1. Menghitung panjang karakter dengan .length()
    cout << "Panjang string: " << teks.length() << " karakter" << endl;

    // 2. Mengosongkan string dengan .clear()
    teks.clear();
    cout << "String setelah dihapus: " << teks << endl;

    // 3. Mengganti kata dengan .replace()
    teks = "Ini adalah contoh penggunaan replace.";
    teks.replace(11, 8, "sebuah"); // Ganti 8 karakter di indeks 11
    cout << "String setelah diganti: " << teks << endl;

    // 4. Menukar isi dua string dengan swap()
    string str1 = "String Pertama";
    string str2 = "String Kedua";
    swap(str1, str2);
    cout << "Setelah swap - Str1: " << str1 << " | Str2: " << str2 << endl;

    // 5. Mencari posisi kata kunci dengan .find()
    string kataKunci = "adalah";
    size_t pos = teks.find(kataKunci);
    if (pos != string::npos) {
        cout << "Kata kunci '" << kataKunci << "' ditemukan di indeks ke-" << pos << endl;
    }

    return 0;
}`,
          expectedOutput: `Panjang string: 28 karakter
String setelah dihapus: 
String setelah diganti: Ini adalah sebuah penggunaan replace.
Setelah swap - Str1: String Kedua | Str2: String Pertama
Kata kunci 'adalah' ditemukan di indeks ke-4`
        },
        {
          id: "case-4-4",
          title: "Studi Kasus 4: Struct Hewan & Akses Karakter .at() (Praktikum 4.4)",
          description: "Mengkombinasikan struct namaHewan dengan member string, lalu mengambil karakter spesifik menggunakan method .at(index) dan .length().",
          code: `#include <iostream>
#include <string>
using namespace std;

// Struct berisi member string
struct namaHewan {
    string anjing = "Anjing";
    string kucing = "Kucing";
    string macan = "Macan";
} mamalia;

int main() {
    cout << "Nama hewan ke-1 : " << mamalia.anjing << endl;
    cout << "Panjang karakter: " << mamalia.anjing.length() << " karakter" << endl;
    cout << "Karakter kedua  : " << mamalia.anjing.at(1) << " (indeks 1)" << endl;
    cout << endl;

    cout << "Nama hewan ke-2 : " << mamalia.kucing << endl;
    cout << "Panjang karakter: " << mamalia.kucing.length() << " karakter" << endl;
    cout << "Karakter kedua  : " << mamalia.kucing.at(1) << " (indeks 1)" << endl;
    cout << endl;

    cout << "Nama hewan ke-3 : " << mamalia.macan << endl;
    cout << "Panjang karakter: " << mamalia.macan.length() << " karakter" << endl;
    cout << "Karakter kedua  : " << mamalia.macan.at(1) << " (indeks 1)" << endl;

    return 0;
}`,
          expectedOutput: `Nama hewan ke-1 : Anjing
Panjang karakter: 6 karakter
Karakter kedua  : n (indeks 1)

Nama hewan ke-2 : Kucing
Panjang karakter: 6 karakter
Karakter kedua  : u (indeks 1)

Nama hewan ke-3 : Macan
Panjang karakter: 5 karakter
Karakter kedua  : a (indeks 1)`
        }
      ]
    },
    {
      id: "modul-5",
      number: 5,
      title: "Seleksi Kondisi & Percabangan",
      badge: "Alur Logika",
      icon: "branch",
      color: "amber",
      summary: "Kendalikan jalan pikiran program menggunakan if, if-else, if-else-if usia 5 tingkat, serta switch-case dan studi kasus kasir diskon bertingkat.",
      objectives: [
        "Memahami konsep dasar seleksi kondisi sebagai otak pengambil keputusan di program komputer",
        "Mengimplementasikan if tunggal dan if-else ganda untuk menentukan tindakan alternatif",
        "Mengimplementasikan percabangan if-else-if majemuk untuk mengelompokkan rentang nilai dan usia",
        "Mengimplementasikan struktur switch-case dengan keyword break dan default untuk menu pilihan",
        "Menyelesaikan kasus perhitungan kasir diskon bertingkat toko pakaian (Praktikum 5.5)"
      ],
      theory: {
        intro: `Dalam pemrograman C++, <strong>Seleksi Kondisi (Percabangan / Control Flow)</strong> adalah instruksi yang mengarahkan alur jalannya program ke cabang yang berbeda berdasarkan terpenuhinya suatu syarat (ekspresi kondisi bernilai <code>true</code> atau <code>false</code>). Menurut Suryam (2018), percabangan memungkinkan program beradaptasi secara dinamis terhadap data yang dimasukkan pengguna.`,
        analogy: `Bayangkan kamu sedang berada di persimpangan jalan atau di depan vending machine minuman. Kalau kamu punya uang pas dan pencet tombol A, keluar Cola. Kalau pencet tombol B, keluar Susu. Kalau pencet tombol lain yang tidak ada di menu, uangmu dikembalikan (itu fungsi <em>default</em>!). Tanpa percabangan, program komputermu cuma bisa jalan lurus tanpa bisa berpikir fleksibel.`,
        branchesComparison: [
          {
            aspect: "Bentuk Sintaks",
            ifElse: "if (kondisi) { ... } else if (kondisi) { ... } else { ... }",
            switchCase: "switch (variabel) { case nilai: ... break; default: ... }"
          },
          {
            aspect: "Jenis Pengecekan",
            ifElse: "Sangat fleksibel: rentang angka (>, <, >=, <=) & gabungan logika (&&, ||)",
            switchCase: "Hanya untuk pengecekan nilai persis / mutlak (equality ==)"
          },
          {
            aspect: "Tipe Data Variabel",
            ifElse: "Bisa semua tipe data: int, float, double, char, string, boolean",
            switchCase: "Hanya tipe bilangan bulat (int, short, long) dan karakter tunggal (char)"
          },
          {
            aspect: "Keluarnya Alur",
            ifElse: "Otomatis keluar blok kurung kurawal begitu kondisi terpenuhi",
            switchCase: "Wajib pakai 'break;' di setiap akhir case agar tidak bablas ke bawah (fall-through)"
          },
          {
            aspect: "Contoh Kasus Pas",
            ifElse: "Kategori rentang usia (bayi, anak, remaja, dewasa) atau syarat diskon belanja",
            switchCase: "Pilihan huruf nilai matakuliah (A, B, C, D, E) atau menu angka 1, 2, 3"
          }
        ]
      },
      cases: [
        {
          id: "case-5-1",
          title: "Studi Kasus 1: Percabangan if Tunggal (Praktikum 5.1)",
          description: "Mengecek apakah nilai x (10) lebih besar atau sama dengan y (10). Jika kondisi terpenuhi, teks di dalam blok dieksekusi.",
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = 10;

    // Percabangan if tunggal: hanya bereaksi jika kondisi TRUE
    if (x >= y) {
        cout << "x lebih besar atau sama dengan y" << endl;
    }

    cout << "Nilai x: " << x << endl;
    cout << "Nilai y: " << y << endl;

    return 0;
}`,
          expectedOutput: `x lebih besar atau sama dengan y
Nilai x: 10
Nilai y: 10`
        },
        {
          id: "case-5-2",
          title: "Studi Kasus 2: Percabangan if-else Ganda (Praktikum 5.2)",
          description: "Mengecek nilai x (7) dan y (10). Karena kondisi x >= y bernilai false, alur berpindah otomatis ke blok else.",
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 7;
    int y = 10;

    // Percabangan if-else: ada jalan cadangan jika kondisi FALSE
    if (x >= y) {
        cout << "x lebih besar atau sama dengan y" << endl;
    } else {
        cout << "x lebih kecil daripada y" << endl;
    }

    cout << "Nilai x: " << x << endl;
    cout << "Nilai y: " << y << endl;

    return 0;
}`,
          expectedOutput: `x lebih kecil daripada y
Nilai x: 7
Nilai y: 10`
        },
        {
          id: "case-5-3",
          title: "Studi Kasus 3: Seleksi if-else if Kategori Usia (Praktikum 5.3)",
          description: "Mengelompokkan usia manusia ke dalam 5 tingkatan rentang: bayi (<= 1), anak-anak (<= 10), remaja (<= 19), dewasa (<= 60), dan lansia (> 60).",
          code: `#include <iostream>
using namespace std;

int main() {
    unsigned short int usia = 20;

    // Evaluasi berurutan dari atas ke bawah
    if (usia <= 1) {
        cout << "Usia bayi (0-1 tahun)" << endl;
    } else if (usia <= 10) {
        cout << "Usia anak-anak (2-10 tahun)" << endl;
    } else if (usia <= 19) {
        cout << "Usia remaja (11-19 tahun)" << endl;
    } else if (usia <= 60) {
        cout << "Usia dewasa (20-60 tahun)" << endl;
    } else {
        cout << "Usia tua / Lansia (Lebih dari 60 tahun)" << endl;
    }

    cout << "Usia yang dimasukkan adalah " << usia << " tahun" << endl;

    return 0;
}`,
          expectedOutput: `Usia dewasa (20-60 tahun)
Usia yang dimasukkan adalah 20 tahun`
        },
        {
          id: "case-5-4",
          title: "Studi Kasus 4: Seleksi Kondisi switch-case Nilai MK (Praktikum 5.4)",
          description: "Membaca huruf mutu nilai matakuliah (A, B, C, D, E) dan mencocokkannya ke case yang sesuai dengan perintah break.",
          code: `#include <iostream>
using namespace std;

int main() {
    char nilaiMK = 'A';

    cout << "Input nilai Mata Kuliah Anda: (A, B, C, D, E)" << endl;
    cout << nilaiMK << endl;

    switch (nilaiMK) {
        case 'A':
            cout << "Nilai anda adalah A" << endl;
            break;
        case 'B':
            cout << "Nilai anda adalah B" << endl;
            break;
        case 'C':
            cout << "Nilai anda adalah C" << endl;
            break;
        case 'D':
            cout << "Nilai anda adalah D" << endl;
            break;
        case 'E':
            cout << "Nilai anda adalah E" << endl;
            break;
        default:
            cout << "Anda keliru menginput data!" << endl;
            break;
    }

    return 0;
}`,
          expectedOutput: `Input nilai Mata Kuliah Anda: (A, B, C, D, E)
A
Nilai anda adalah A`
        },
        {
          id: "case-5-5",
          title: "Studi Kasus 5: Program Kasir Diskon Pakaian (Praktikum 5.5)",
          description: "Menghitung total pembelian baju (Rp 60.000) dan celana (Rp 40.000), memberi diskon 20% jika baju > 100.000 dan diskon 25% jika celana > 70.000.",
          code: `#include <iostream>
using namespace std;

int main() {
    int jumlahBaju = 3, jumlahCelana = 2;
    int hargaBaju = 60000, hargaCelana = 40000;
    float totalBaju, totalCelana, diskonBaju, diskonCelana, totalBayar;

    totalBaju = jumlahBaju * hargaBaju;
    totalCelana = jumlahCelana * hargaCelana;

    // Diskon baju 20% jika total harga baju > 100.000
    if (totalBaju > 100000) {
        diskonBaju = 0.2 * totalBaju;
    } else {
        diskonBaju = 0;
    }

    // Diskon celana 25% jika total harga celana > 70.000
    if (totalCelana > 70000) {
        diskonCelana = 0.25 * totalCelana;
    } else {
        diskonCelana = 0;
    }

    totalBayar = (totalBaju - diskonBaju) + (totalCelana - diskonCelana);

    cout << "\n=== RINCIAN PEMBAYARAN ===" << endl;
    cout << "Total harga baju   : Rp " << totalBaju << endl;
    cout << "Diskon baju        : Rp " << diskonBaju << endl;
    cout << "Total harga celana : Rp " << totalCelana << endl;
    cout << "Diskon celana      : Rp " << diskonCelana << endl;
    cout << "---------------------------------" << endl;
    cout << "Total yang harus dibayar: Rp " << totalBayar << endl;

    return 0;
}`,
          expectedOutput: `=== RINCIAN PEMBAYARAN ===
Total harga baju   : Rp 180000
Diskon baju        : Rp 36000
Total harga celana : Rp 80000
Diskon celana      : Rp 20000
---------------------------------
Total yang harus dibayar: Rp 204000`
        }
      ]
    }
  ],



  flowchartGuide: {
    title: "Standar & Panduan Flowchart Laporan Praktikum UNM",
    subtitle: "Aturan Resmi Penggambaran Simbol Diagram Alir Berdasarkan Laprak 1, 2, dan 3",
    symbols: [
      {
        id: "sym-terminator",
        name: "1. Terminator (Mulai & Selesai / Akhiri)",
        shape: "Oval / Kapsul",
        colorClass: "amber",
        symbolType: "oval",
        cppCode: "int main() { ... return 0; }",
        role: "Menandai titik awal (Mulai) dimulainya program dan titik penutup (Selesai/Akhiri) berhentinya eksekusi program.",
        rules: "Setiap diagram alir di Laprak UNM WAJIB diawali dengan simbol Oval bertuliskan 'Mulai' di bagian paling atas dan diakhiri dengan simbol Oval bertuliskan 'Selesai' di bagian paling bawah."
      },
      {
        id: "sym-prep",
        name: "2. Deklarasi / Preparation (Persegi Bergaris Sisi)",
        shape: "Persegi Panjang dengan Garis Vertikal Ganda di Kedua Sisi",
        colorClass: "rose",
        symbolType: "prep",
        cppCode: "float PHI, float r, float L;\nstring nama;\nstruct paket_internet { ... };",
        role: "Tempat memesan kapling memori di RAM komputer: mendeklarasikan tipe data, nama variabel, konstanta (const), serta tipe data bentukan (struct / union / enum).",
        rules: "Di Laprak 1 s.d 3 karya Warnisyah Armin di UNM, bagian deklarasi digambarkan dengan Persegi Panjang bergaris samping (seperti preparation box pada halaman 4, 6, dan 32 laprak)."
      },
      {
        id: "sym-process",
        name: "3. Proses / Assignment (Persegi Polos)",
        shape: "Persegi Panjang Polos (Standar)",
        colorClass: "sky",
        symbolType: "process",
        cppCode: "PHI = 3.14;\nr = 2.5;\nL = PHI * r * r;\nbegadang.kouta_internet = 25;",
        role: "Mewakili langkah pemrosesan data: perhitungan rumus matematika, manipulasi bit biner, operasi increment/decrement, atau pemberian nilai (assignment) ke variabel.",
        rules: "Gunakan persegi panjang polos saat Anda melakukan kalkulasi rumus seperti 'L = PHI * r * r' atau inisialisasi isi variabel."
      },
      {
        id: "sym-io",
        name: "4. Input & Output / cout & cin (Jajaran Genjang)",
        shape: "Jajaran Genjang (Parallelogram)",
        colorClass: "emerald",
        symbolType: "io",
        cppCode: 'cout << "Luas lingkaran adalah: " << L << " Cm" << endl;\ncin >> umur;',
        role: "Mewakili instruksi masukan (cin >>) dari pengguna atau pencetakan keluaran hasil/informasi ke layar konsol monitor (cout <<).",
        rules: "Setiap kali ada baris perintah cout untuk menampilkan tulisan, nama pasien, kuota internet, atau hasil perhitungan ke layar, WAJIB menggunakan jajaran genjang."
      },
      {
        id: "sym-decision",
        name: "5. Decision / Percabangan (Belah Ketupat)",
        shape: "Belah Ketupat (Diamond)",
        colorClass: "purple",
        symbolType: "diamond",
        cppCode: "if (kondisi) { ... } else { ... }",
        role: "Mewakili penentuan keputusan logika atau pengujian syarat yang menghasilkan 2 cabang: Ya (True) atau Tidak (False).",
        rules: "Pasti memiliki minimal dua anak panah keluar (satu jalur 'Ya' dan satu jalur 'Tidak')."
      }
    ],

    interactiveCases: [
      {
        id: "fc-lingkaran",
        title: "Kasus 1: Perhitungan Luas Lingkaran (Laprak 1 Hal 4)",
        desc: "Diagram alir menghitung luas lingkaran dari konstanta PHI dan jari-jari r.",
        nodes: [
          { type: "oval", label: "Mulai", sub: "Titik Awal Eksekusi", cpp: "int main() {" },
          { type: "prep", label: "float PHI\nfloat r\nfloat L", sub: "Deklarasi (Persegi Bergaris)", cpp: "const float PHI = 3.14f;\nfloat r = 2.5f;\nfloat L;" },
          { type: "process", label: "PHI = 3.14\nr = 2.5", sub: "Proses Pemberian Nilai (Persegi)", cpp: "PHI = 3.14f;\nr = 2.5f;" },
          { type: "process", label: "L = PHI * r * r", sub: "Proses Rumus Luas (Persegi)", cpp: "L = PHI * r * r;" },
          { type: "io", label: "\"Luas lingkaran adalah: \" [L] \"Cm\"", sub: "Output cout (Jajargenjang)", cpp: 'cout << "Luas lingkaran adalah: " << L << " Cm" << endl;' },
          { type: "oval", label: "Selesai", sub: "Titik Akhir Program", cpp: "return 0;\n}" }
        ]
      },
      {
        id: "fc-kacamata",
        title: "Kasus 2: Transaksi Pasien Kacamata (Laprak 1 Hal 6)",
        desc: "Diagram alir pencatatan kacamata dengan 5 tipe data kombinasi dan perhitungan diskon.",
        nodes: [
          { type: "oval", label: "Mulai", sub: "Titik Awal Eksekusi", cpp: "int main() {" },
          { type: "prep", label: "string nama\nunsigned short int umur\nfloat ukuranKacamata\nunsigned long int hargaKacamata\nint diskon", sub: "Deklarasi (Persegi Bergaris)", cpp: "string nama;\nunsigned short int umur;\nfloat ukuranKacamata;\nunsigned long int hargaKacamata;\nint diskon;" },
          { type: "process", label: "nama = \"Ferdi sambo\"\numur = 55\nukuranKacamata = -2.5\nhargaKacamata = 2147483\ndiskon = 5000", sub: "Proses Nilai (Persegi)", cpp: "nama = \"Ferdi sambo\";\numur = 55;\nukuranKacamata = -2.5f;\nhargaKacamata = 2147483;\ndiskon = 5000;" },
          { type: "io", label: "\"Nama pasien: \" [nama]\n\"Umur pasien: \" [umur] \"Tahun\"\n\"Harga bayar: \" [hargaKacamata - diskon] \"Rupiah\"", sub: "Output cout (Jajargenjang)", cpp: 'cout << "Nama pasien: " << nama << endl;\ncout << "Total: " << (hargaKacamata - diskon) << endl;' },
          { type: "oval", label: "Selesai", sub: "Titik Akhir Program", cpp: "return 0;\n}" }
        ]
      },
      {
        id: "fc-struct-paket",
        title: "Kasus 3: Struct Paket Internet Begadang (Laprak 3 Hal 32)",
        desc: "Diagram alir pembungkusan 3 member data ke dalam struct paket_internet.",
        nodes: [
          { type: "oval", label: "Mulai", sub: "Titik Awal Eksekusi", cpp: "int main() {" },
          { type: "prep", label: "struct paket_internet {\n  string nama_paket\n  int kouta_telpon\n  int kouta_internet\n}\npaket_internet begadang", sub: "Deklarasi Struct (Persegi Bergaris)", cpp: "struct paket_internet {\n    string nama_paket;\n    int kouta_telpon;\n    int kouta_internet;\n} begadang;" },
          { type: "process", label: "begadang.nama_paket = \"Begadang\"\nbegadang.kouta_telpon = 50\nbegadang.kouta_internet = 25", sub: "Proses Isi Member Struct (Persegi)", cpp: "begadang.nama_paket = \"Begadang\";\nbegadang.kouta_telpon = 50;\nbegadang.kouta_internet = 25;" },
          { type: "io", label: "\"Nama paket: \" [begadang.nama_paket]\n\"Kouta telpon: \" [begadang.kouta_telpon] \"Menit\"\n\"Kouta internet: \" [begadang.kouta_internet] \"GB\"", sub: "Output cout (Jajargenjang)", cpp: 'cout << "Nama: " << begadang.nama_paket << endl;\ncout << "Internet: " << begadang.kouta_internet << " GB" << endl;' },
          { type: "oval", label: "Selesai", sub: "Titik Akhir Program", cpp: "return 0;\n}" }
        ]
      }
    ]
  },

  // ========================================================
  // SIMULASI UTS LIVE CODING (MENGISI TITIK-TITIK LAPRAK 1-3)
  // ========================================================
  utsPackages: [
    {
      id: "uts-paket-a",
      title: "Paket A: Sistem Kasir Optik Pintar & Diskon Bitwise",
      durationMinutes: 15,
      scenario: "Sebuah klinik optik membutuhkan program C++ untuk menghitung total belanja kacamata pasien, menerapkan diskon menggunakan pergeseran bit (bitwise shift) dan membungkus data transaksi ke dalam struct. Lengkapi kode di bawah ini pada bagian titik-titik yang ditandai!",
      coveredModules: "Modul 1 (Variabel & Tipe Data) + Modul 2 (Operator & Bitwise) + Modul 3 (Struct)",
      rawCode: `#include <iostream>
#include <string>
#include <iomanip>
___BLANK_1___ namespace std;

// 1. Tipe Data Bentukan Struct (Modul 3)
___BLANK_2___ TransaksiKacamata {
    string namaPasien;
    unsigned short int umur;
    float ukuranLensa;
    unsigned long int hargaKacamata;
};

int main() {
    // 2. Deklarasi Objek Struct & Konstanta (Modul 1 & 3)
    TransaksiKacamata pasien1;
    const float DISKON_BONUS = 5000.0f;

    // Mengisi member struct menggunakan operator titik
    pasien1.___BLANK_3___ = "Ferdi sambo";
    pasien1.umur = 55;
    pasien1.ukuranLensa = -2.5f;
    pasien1.hargaKacamata = 2147483;

    // 3. Operator Bitwise Shift (Modul 2):
    // Nilai kupon awal adalah 1, geser ke kiri 3 kali (a <<= 3)
    int kuponDiskon = 1;
    kuponDiskon ___BLANK_4___ 3; // Menjadi 8

    // 4. Operator Aritmatika & Pengurangan (Modul 1 & 2)
    unsigned long int totalBayar = pasien1.hargaKacamata - (int)DISKON_BONUS;

    // 5. Output ke Konsol (Modul 1)
    cout << "===== STRUK KLINIK OPTIK UNM =====" << endl;
    cout << "Nama Pasien : " ___BLANK_5___ pasien1.namaPasien << endl;
    cout << "Kupon Hadiah: " << kuponDiskon << endl;
    cout << "Total Bayar : Rp " << totalBayar << endl;

    ___BLANK_6___ 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword sebelum namespace std (untuk mengizinkan cout/cin)",
          answers: ["using", "USING"],
          explanation: "'using namespace std;' digunakan agar kita tidak perlu mengetik 'std::cout' berulang kali."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Keyword untuk membuat tipe data bentukan (Modul 3)",
          answers: ["struct", "STRUCT"],
          explanation: "Keyword 'struct' digunakan untuk mengelompokkan berbagai tipe data ke dalam satu wadah."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Nama member struct untuk menyimpan nama pasien",
          answers: ["namaPasien", "nama_pasien"],
          explanation: "Nama member dalam deklarasi struct adalah 'namaPasien'."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator compound bitwise shift left (geser ke kiri 3 kali, Modul 2)",
          answers: ["<<=", "<< ="],
          explanation: "Operator '<<=' menggeser bit ke kiri dan menyimpan hasilnya ke variabel kuponDiskon."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Operator insertion stream untuk output cout (Modul 1)",
          answers: ["<<", "< <"],
          explanation: "Operator '<<' (insertion operator) digunakan untuk mengirim data ke stream cout."
        },
        {
          id: "BLANK_6",
          label: "Titik-titik 6",
          hint: "Pernyataan penutup fungsi main() untuk menandakan program sukses (Modul 1)",
          answers: ["return", "RETURN"],
          explanation: "'return 0;' mengembalikan kode status 0 ke sistem operasi menandakan sukses."
        }
      ],
      expectedOutput: `===== STRUK KLINIK OPTIK UNM =====
Nama Pasien : Ferdi sambo
Kupon Hadiah: 8
Total Bayar : Rp 2142483

Process returned 0 (0x0)   execution time : 0.024 s`
    },

    {
      id: "uts-paket-b",
      title: "Paket B: Kuota Internet Mahasiswa & Fenomena Union Nilai",
      durationMinutes: 15,
      scenario: "Bantulah Asdos membuat program pendaftaran paket kuota internet dan input nilai ujian mahasiswa yang mendemonstrasikan fenomena shared memory pada union (Laprak 3.1 & 3.2). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Tipe Data Pecahan) + Modul 2 (Increment/Decrement) + Modul 3 (Struct & Union)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

// Struct Paket Internet (Laprak 3.1)
struct PaketInternet {
    string namaPaket;
    int kuotaTelpon;
    int kuotaInternet;
};

// Union Daftar Nilai (Laprak 3.2 - Shared Memory)
___BLANK_1___ DaftarNilai {
    float nilaiPengetahuan;
    float nilaiSikap;
    float nilaiPsikomotorik;
};

int main() {
    PaketInternet mhs;
    mhs.namaPaket = "Begadang";
    mhs.kuotaTelpon = 50;
    mhs.kuotaInternet = 25;

    // Operator Post-increment (Modul 2): kuota internet ditambah 1
    mhs.kuotaInternet___BLANK_2___; // 25 menjadi 26

    DaftarNilai budi;
    // Mengisi nilai sikap pertama kali
    budi.___BLANK_3___ = 70.5f;

    // Lalu mengisi nilai pengetahuan (akan menimpa nilai sikap di alamat RAM yang sama!)
    budi.nilaiPengetahuan = 85.5f;

    cout << "Paket: " << mhs.namaPaket << endl;
    cout << "Total Kuota Internet: " << mhs.kuotaInternet << " GB" << endl;
    cout << "Nilai Sikap Budi: " << budi.nilaiSikap << endl;
    cout << "Ukuran Memori Union: " << ___BLANK_4___(budi) << " bytes" << endl;

    return ___BLANK_5___;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword untuk tipe data bentukan memori bersama (Laprak 3.2)",
          answers: ["union", "UNION"],
          explanation: "Keyword 'union' membuat semua member berbagi alamat memori yang sama (shared memory)."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Operator increment untuk menambah 1 (Modul 2)",
          answers: ["++", "+ +"],
          explanation: "Operator '++' adalah increment yang menaikkan nilai variabel sebesar 1."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Member union untuk nilai sikap",
          answers: ["nilaiSikap", "nilai_sikap"],
          explanation: "Nama variabel member union adalah 'nilaiSikap'."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator bawaan C++ untuk menghitung ukuran byte objek di memori (Modul 1 & 3)",
          answers: ["sizeof", "SIZEOF"],
          explanation: "'sizeof' digunakan untuk mengetahui jumlah byte yang dialokasikan di RAM."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Angka pengembalian status normal pada fungsi main()",
          answers: ["0", "0;"],
          explanation: "Nilai 0 pada return 0 menandakan program selesai normal."
        }
      ],
      expectedOutput: `Paket: Begadang
Total Kuota Internet: 26 GB
Nilai Sikap Budi: 85.5
Ukuran Memori Union: 4 bytes

Process returned 0 (0x0)   execution time : 0.019 s`
    },

    {
      id: "uts-paket-c",
      title: "Paket C: Pabrik Balok 3D Typedef & Silsilah Enum Presiden",
      durationMinutes: 15,
      scenario: "Lengkapi program kalkulasi volume balok menggunakan typedef alias dan penentuan urutan kepemimpinan Presiden RI menggunakan enum (Laprak 3.3 & 3.5).",
      coveredModules: "Modul 1 (Pecahan & Logika) + Modul 2 (Relasi & Logika) + Modul 3 (Typedef & Enum)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Alias Tipe Data Menggunakan Typedef (Laprak 3.5)
___BLANK_1___ float angkaPecahan;
typedef string kata;

struct Balok {
    kata nama;
    angkaPecahan panjang, lebar, tinggi;
};

// 2. Enum Urutan Presiden (Laprak 3.3)
___BLANK_2___ NamaPresiden {
    Soekarno, Soeharto, Habibie, Megawati, Gusdur, SBY, Jokowi
};

int main() {
    Balok b1 = {"Si Merah", 10.0f, 2.5f, 2.0f};

    // Hitung volume balok
    angkaPecahan volume = b1.panjang * b1.lebar ___BLANK_3___ b1.tinggi;

    // Enum: Habibie memiliki index ke-2
    NamaPresiden p = Habibie;
    int urutanPresiden = p ___BLANK_4___ 1; // 2 + 1 = 3

    // Operator Logika (Modul 2): cek apakah volume > 0 dan urutan valid
    bool statusValid = (volume > 0) ___BLANK_5___ (urutanPresiden == 3);

    cout << "Balok: " << b1.nama << " | Volume: " << volume << " cm3" << endl;
    cout << "B.J. Habibie adalah Presiden RI Ke-" << urutanPresiden << endl;
    cout << "Status Verifikasi: " << (statusValid ? "VALID" : "TIDAK") << endl;

    return 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword untuk mendefinisikan alias tipe data baru (Laprak 3.5)",
          answers: ["typedef", "TYPEDEF"],
          explanation: "'typedef' digunakan untuk memberi nama alternatif pada tipe data primitif/bentukan."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Keyword untuk membuat tipe data enumerasi (Laprak 3.3)",
          answers: ["enum", "ENUM"],
          explanation: "'enum' mendefinisikan himpunan konstanta bilangan bulat terindeks."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Operator perkalian dalam C++ (Modul 2)",
          answers: ["*", "x"],
          explanation: "Simbol '*' digunakan untuk operasi perkalian matematis di C++."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator penjumlahan untuk menambah index enum (Modul 2)",
          answers: ["+", "+="],
          explanation: "Karena index Habibie bernilai 2, maka ditambah 1 (+) menghasilkan Presiden Ke-3."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Operator logika AND dalam C++ (Modul 2)",
          answers: ["&&", "and"],
          explanation: "Simbol '&&' adalah operator logika AND (keduanya harus bernilai true)."
        }
      ],
      expectedOutput: `Balok: Si Merah | Volume: 50 cm3
B.J. Habibie adalah Presiden RI Ke-3
Status Verifikasi: VALID

Process returned 0 (0x0)   execution time : 0.021 s`
    },

    {
      id: "uts-paket-d",
      title: "Paket D: Laboratorium Geometri Fisika & Operator Ternary",
      durationMinutes: 15,
      scenario: "Laboratorium Fisika UNM membutuhkan program untuk menghitung luas dan keliling lingkaran berpresisi tinggi dengan konstanta matematika, membungkus data ke dalam struct, dan mengevaluasi status batas area menggunakan operator ternary dan relasional (Laprak 1.1, Modul 2, & Laprak 3). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Konstanta & Double) + Modul 2 (Operator Relasional & Ternary) + Modul 3 (Struct Lingkaran)",
      rawCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

// 1. Deklarasi Konstanta Nilai PHI (Laprak 1.1)
___BLANK_1___ double PHI = 3.1415926535;

// 2. Tipe Data Bentukan Struct untuk Menyimpan Data Lingkaran (Modul 3)
struct DataLingkaran {
    string label;
    double jariJari;
    double luas;
    double keliling;
};

int main() {
    DataLingkaran l1;
    l1.label = "Sensor Partikel A";
    l1.jariJari = 7.0;

    // 3. Menghitung Luas Lingkaran: PHI * r * r (Modul 1 & 2)
    l1.luas = PHI ___BLANK_2___ l1.jariJari * l1.jariJari;

    // 4. Menghitung Keliling Lingkaran: 2 * PHI * r
    l1.keliling = 2.0 * PHI * l1.jariJari;

    // 5. Operator Ternary & Logika (Modul 2):
    // Cek apakah luas >= 100.0, jika ya "MEMENUHI", jika tidak "TIDAK MEMENUHI"
    string statusKelayakan = (l1.luas >= 100.0) ___BLANK_3___ "MEMENUHI" : "TIDAK MEMENUHI";

    // 6. Output ke Konsol dengan operator insertion (Modul 1)
    cout << "===== PENGUJIAN LINGKARAN FISIKA UNM =====" << endl;
    cout << "Label Objek    : " << l1.label << endl;
    cout << "Jari-jari (r)  : " << l1.jariJari << " cm" << endl;
    cout << "Luas Lingkaran : " << fixed << setprecision(2) << l1.luas << " cm2" << endl;
    cout << "Status Uji     : " ___BLANK_4___ statusKelayakan << endl;

    return ___BLANK_5___;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword untuk menetapkan nilai tetap/konstanta yang tidak bisa diubah (Laprak 1.1)",
          answers: ["const", "CONST"],
          explanation: "Keyword 'const' digunakan untuk mengunci nilai suatu variabel agar tidak dapat diubah sepanjang jalannya program."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Operator perkalian matematika dalam C++ (Modul 2)",
          answers: ["*", "x"],
          explanation: "Tanda bintang '*' adalah operator perkalian aritmatika dalam C++."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Simbol pertama dari ternary conditional operator ? : (Modul 2)",
          answers: ["?", "? "],
          explanation: "Operator ternary menggunakan sintaks 'kondisi ? nilai_jika_true : nilai_jika_false'."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator insertion stream untuk menampilkan data cout (Modul 1)",
          answers: ["<<", "< <"],
          explanation: "Operator '<<' (insertion stream) mengalirkan data ke layar konsol melalui objek cout."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Kode status normal keluaran fungsi main()",
          answers: ["0", "0;"],
          explanation: "'return 0;' menandakan eksekusi program selesai dengan sukses tanpa galat."
        }
      ],
      expectedOutput: `===== PENGUJIAN LINGKARAN FISIKA UNM =====
Label Objek    : Sensor Partikel A
Jari-jari (r)  : 7 cm
Luas Lingkaran : 153.94 cm2
Status Uji     : MEMENUHI

Process returned 0 (0x0)   execution time : 0.018 s`
    },

    {
      id: "uts-paket-e",
      title: "Paket E: Logistik Gudang Lab UNM & Enkripsi Shift Right",
      durationMinutes: 15,
      scenario: "Gudang Laboratorium Komputer UNM memerlukan sistem pencatatan stok komponen server dan enkripsi token akses keamanan menggunakan operator pergeseran bit ke kanan (bitwise right shift) serta compound subtraction (Laprak 1, 2, dan 3). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Tipe Data Unsigned & String) + Modul 2 (Bitwise Shift Right & Compound -=) + Modul 3 (Struct Gudang)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Tipe Data Bentukan Struct Barang (Modul 3)
___BLANK_1___ BarangGudang {
    string kodeBarang;
    string namaKomponen;
    unsigned int stokAwal;
    unsigned long int hargaSatuan;
};

int main() {
    BarangGudang ram;
    ram.kodeBarang = "DDR5-16GB";
    ram.namaKomponen = "RAM Server Corsair";
    ram.stokAwal = 80;
    ram.hargaSatuan = 1250000;

    // 2. Pengambilan stok: berkurang 15 unit menggunakan compound assignment (Modul 2)
    int jumlahKeluar = 15;
    ram.stokAwal ___BLANK_2___ jumlahKeluar; // 80 - 15 = 65

    // 3. Bitwise Right Shift (Modul 2):
    // Kode kunci awal bernilai 64, digeser ke kanan 2 kali (>> 2) setara 64 / 4 = 16
    unsigned int kunciKeamanan = 64;
    unsigned int tokenAkses = kunciKeamanan ___BLANK_3___ 2;

    // 4. Operator Relasional / Logika Boolean (Modul 1 & 2): Cek ketersediaan stok
    ___BLANK_4___ stokAman = (ram.stokAwal > 20);

    // 5. Output ke Konsol (Modul 1)
    cout << "===== SISTEM LOGISTIK GUDANG LAB UNM =====" << endl;
    cout << "Komponen      : " << ram.___BLANK_5___ << endl;
    cout << "Sisa Stok     : " << ram.stokAwal << " unit" << endl;
    cout << "Token Akses   : " << tokenAkses << endl;
    cout << "Status Gudang : " << (stokAman ? "STOK AMAN" : "PERLU RESTOCK") << endl;

    return 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword untuk mendefinisikan tipe data bentukan (Modul 3)",
          answers: ["struct", "STRUCT"],
          explanation: "Keyword 'struct' digunakan untuk mengelompokkan variabel bertipe beda ke dalam satu entitas objek."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Operator compound assignment pengurangan (Modul 2)",
          answers: ["-=", "- ="],
          explanation: "Operator '-=' mengurangkan nilai di kanan dari variabel di kiri dan menyimpan hasilnya ke variabel tersebut."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Operator bitwise shift right (geser bit ke kanan, Modul 2)",
          answers: [">>", "> >"],
          explanation: "Operator '>>' menggeser bit biner ke kanan, yang secara matematis membagi nilai bilangan bulat dengan 2 pangkat N."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Tipe data logika kebenaran true atau false (Modul 1)",
          answers: ["bool", "BOOL"],
          explanation: "Tipe data 'bool' (boolean) berukuran 1 Byte digunakan untuk menampung kondisi true (1) atau false (0)."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Nama member struct yang menyimpan nama komponen",
          answers: ["namaKomponen", "nama_komponen"],
          explanation: "Nama member dalam deklarasi struct BarangGudang adalah 'namaKomponen'."
        }
      ],
      expectedOutput: `===== SISTEM LOGISTIK GUDANG LAB UNM =====
Komponen      : RAM Server Corsair
Sisa Stok     : 65 unit
Token Akses   : 16
Status Gudang : STOK AMAN

Process returned 0 (0x0)   execution time : 0.022 s`
    },

    {
      id: "uts-paket-f",
      title: "Paket F: Registrasi Mahasiswa & Manipulasi String C++",
      durationMinutes: 15,
      scenario: "Biro Akademik UNM membutuhkan modul pendaftaran mahasiswa baru: membaca nama lengkap berspasi dengan aman, menghitung panjang karakter dengan fungsi bawaan, menukar jadwal kelas dengan swap(), dan mengecek karakter inisial dengan .at() (Modul 1 & Modul 4). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Variabel & IO) + Modul 4 (String, .length(), .at(), swap(), getline())",
      rawCode: `#include <iostream>
#include <___BLANK_1___>
using namespace std;

int main() {
    string namaLengkap = "Warnisyah Armin";
    string kelasAsal = "PTI-A";
    string kelasTujuan = "PTI-B";

    // 1. Mengambil panjang karakter nama (Modul 4)
    int panjangNama = namaLengkap.___BLANK_2___();

    // 2. Mengambil karakter inisial indeks pertama (indeks 0) secara aman (Modul 4)
    char inisial = namaLengkap.___BLANK_3___(0);

    // 3. Menukar jadwal kelas antara kelasAsal dan kelasTujuan tanpa variabel ketiga (Modul 4)
    ___BLANK_4___(kelasAsal, kelasTujuan);

    // 4. Output hasil ke konsol (Modul 1)
    cout << "===== REGISTRASI AKADEMIK UNM =====" << endl;
    cout << "Nama Mahasiswa : " << namaLengkap << endl;
    cout << "Panjang Nama   : " << panjangNama << " karakter" << endl;
    cout << "Inisial Huruf  : " << inisial << endl;
    cout << "Kelas Sekarang : " << kelasAsal << endl;

    return ___BLANK_5___;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Header pustaka standar untuk tipe data teks di C++ (Modul 4)",
          answers: ["string", "string.h"],
          explanation: "Header <string> wajib di-include untuk menggunakan objek kelas std::string dan metode-metodenya."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Fungsi bawaan string untuk menghitung jumlah karakter (Modul 4)",
          answers: ["length", "size"],
          explanation: "Fungsi .length() atau .size() menghitung jumlah karakter nyata dalam objek string tanpa menghitung null terminator."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Fungsi aman pengakses karakter berdasarkan indeks (Modul 4)",
          answers: ["at", "at()"],
          explanation: "Metode .at(0) mengakses karakter pada indeks tertentu dengan perlindungan bounds-checking."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Fungsi bawaan C++ untuk menukar isi dua variabel string seketika (Modul 4)",
          answers: ["swap", "std::swap"],
          explanation: "Fungsi swap(a, b) menukar isi dua string secara langsung dan efisien di memori."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Nilai integer status sukses keluaran fungsi main() (Modul 1)",
          answers: ["0", "0;"],
          explanation: "'return 0;' menandakan fungsi utama program berhasil diselesaikan tanpa kesalahan."
        }
      ],
      expectedOutput: `===== REGISTRASI AKADEMIK UNM =====
Nama Mahasiswa : Warnisyah Armin
Panjang Nama   : 15 karakter
Inisial Huruf  : W
Kelas Sekarang : PTI-B

Process returned 0 (0x0)   execution time : 0.016 s`
    },

    {
      id: "uts-paket-g",
      title: "Paket G: Konversi Mutu Nilai Kuliah & Switch-Case",
      durationMinutes: 15,
      scenario: "Sistem Informasi Akademik Jurusan Teknik Komputer UNM mengonversi nilai huruf mutu (A, B, C, D, E) menjadi bobot indeks prestasi angka dan predikat kelulusan menggunakan struktur switch-case serta kata kunci kendali break (Modul 3 & Modul 5). Lengkapi titik-titik kode!",
      coveredModules: "Modul 3 (Tipe Data Karakter & Enum) + Modul 5 (Percabangan switch-case, break, default)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Enum Semester Terindeks (Modul 3)
enum Semester { GANJIL, GENAP };

int main() {
    char grade = 'A';
    float bobot = 0.0f;
    string predikat = "";

    // 2. Evaluasi Nilai Mutu dengan Struktur Percabangan switch (Modul 5)
    ___BLANK_1___ (grade) {
        case 'A':
            bobot = 4.0f;
            predikat = "Istimewa (Sangat Memuaskan)";
            ___BLANK_2___; // Mencegah fall-through terjun bebas!
        case 'B':
            bobot = 3.0f;
            predikat = "Baik";
            break;
        case 'C':
            bobot = 2.0f;
            predikat = "Cukup";
            break;
        case 'D':
            bobot = 1.0f;
            predikat = "Kurang";
            break;
        ___BLANK_3___: // Label cadangan jika nilai huruf tidak terdaftar
            bobot = 0.0f;
            predikat = "Tidak Lulus / Tidak Valid";
            break;
    }

    // 3. Operator Relasional (Modul 2): Cek status kelulusan (bobot >= 2.0)
    bool isLulus = (bobot ___BLANK_4___ 2.0f);

    cout << "===== KARTU HASIL STUDI TEKNIK KOMPUTER =====" << endl;
    cout << "Nilai Huruf   : " << grade << endl;
    cout << "Bobot Angka   : " << bobot << endl;
    cout << "Predikat      : " << predikat << endl;
    cout << "Status Lulus  : " << (isLulus ? "LULUS" : "MENGULANG") << ___BLANK_5___;

    return 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword percabangan multi-arah berbasis nilai bulat/karakter diskrit (Modul 5)",
          answers: ["switch", "SWITCH"],
          explanation: "Struktur 'switch' digunakan untuk memilih salah satu dari banyak blok kode berdasarkan kecocokan nilai eksak."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Pernyataan penghenti lompatan agar tidak terjadi bahaya fall-through (Modul 5)",
          answers: ["break", "break;"],
          explanation: "'break;' memaksa program keluar dari kurung switch setelah suatu case terpenuhi, mencegah eksekusi case di bawahnya."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Label penampung dalam switch jika tidak ada case yang cocok (Modul 5)",
          answers: ["default", "DEFAULT"],
          explanation: "Label 'default:' dieksekusi apabila nilai variabel switch tidak sesuai dengan semua pilihan case yang ada."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator perbandingan lebih besar atau sama dengan (Modul 2)",
          answers: [">=", "=>"],
          explanation: "Operator '>=' menghasilkan true jika nilai di sebelah kiri lebih besar atau sama dengan nilai di sebelah kanan."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Manipulator output untuk pindah ke baris baru dan flush buffer (Modul 1)",
          answers: ["endl", "endl;"],
          explanation: "'endl' menyisipkan karakter baris baru ('\\n') dan mengosongkan buffer output stream."
        }
      ],
      expectedOutput: `===== KARTU HASIL STUDI TEKNIK KOMPUTER =====
Nilai Huruf   : A
Bobot Angka   : 4
Predikat      : Istimewa (Sangat Memuaskan)
Status Lulus  : LULUS

Process returned 0 (0x0)   execution time : 0.017 s`
    },

    {
      id: "uts-paket-h",
      title: "Paket H: Kasir Diskon Bertingkat Toko Busana UNM",
      durationMinutes: 15,
      scenario: "Toko Koperasi Mahasiswa UNM menerapkan diskon terpisah: Baju @Rp 60.000 diskon 20% jika subtotal baju > Rp 100.000, dan Celana @Rp 40.000 diskon 25% jika subtotal celana > Rp 70.000. Program menghitung total akhir yang harus dibayar pembeli (Praktikum 5.5 UNM & Modul 1-2). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Variabel Integer & Double) + Modul 2 (Aritmatika) + Modul 5 (if Seleksi Kondisi Independen)",
      rawCode: `#include <iostream>
using namespace std;

int main() {
    int qtyBaju = 3;
    int qtyCelana = 2;
    int hargaBaju = 60000;
    int hargaCelana = 40000;

    // 1. Perkalian subtotal belanja (Modul 2)
    int totalBaju = qtyBaju ___BLANK_1___ hargaBaju;     // 3 * 60000 = 180000
    int totalCelana = qtyCelana * hargaCelana;  // 2 * 40000 = 80000

    double diskonBaju = 0;
    double diskonCelana = 0;

    // 2. Evaluasi Diskon Baju: Syarat > Rp 100.000 diskon 20% (Laprak 5.5)
    ___BLANK_2___ (totalBaju > 100000) {
        diskonBaju = 0.20 * totalBaju; // Diskon 20%
    }

    // 3. Evaluasi Diskon Celana: Syarat > Rp 70.000 diskon 25% (Laprak 5.5)
    if (totalCelana ___BLANK_3___ 70000) {
        diskonCelana = 0.25 * totalCelana; // Diskon 25%
    }

    // 4. Hitung Total Pembayaran Akhir
    double totalBayar = (totalBaju - diskonBaju) ___BLANK_4___ (totalCelana - diskonCelana);

    cout << "===== STRUK KASIR TOKO BUSANA UNM =====" << endl;
    cout << "Subtotal Baju   : Rp " << totalBaju << endl;
    cout << "Diskon Baju     : Rp " << (long long)diskonBaju << endl;
    cout << "Subtotal Celana : Rp " << totalCelana << endl;
    cout << "Diskon Celana   : Rp " << (long long)diskonCelana << endl;
    cout << "Total Bayar     : Rp " << (long long)totalBayar << endl;

    return ___BLANK_5___;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Operator perkalian matematika dalam C++ (Modul 2)",
          answers: ["*", "x"],
          explanation: "Simbol '*' adalah operator perkalian aritmatika standar di C++."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Keyword seleksi kondisi dasar di C++ (Modul 5)",
          answers: ["if", "IF"],
          explanation: "Pernyataan 'if' mengevaluasi apakah kondisi di dalam kurung bernilai benar (true)."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Operator relasional lebih besar dari (Modul 2)",
          answers: [">", ">="],
          explanation: "Operator '>' menguji apakah total belanja celana melampaui ambang batas Rp 70.000."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator penjumlahan aritmatika (Modul 2)",
          answers: ["+", "+="],
          explanation: "Tanda '+' menjumlahkan total bersih baju dengan total bersih celana."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Nilai return status sukses fungsi main (Modul 1)",
          answers: ["0", "0;"],
          explanation: "'return 0;' menandakan eksekusi program selesai secara sukses tanpa error."
        }
      ],
      expectedOutput: `===== STRUK KASIR TOKO BUSANA UNM =====
Subtotal Baju   : Rp 180000
Diskon Baju     : Rp 36000
Subtotal Celana : Rp 80000
Diskon Celana   : Rp 20000
Total Bayar     : Rp 204000

Process returned 0 (0x0)   execution time : 0.019 s`
    },

    {
      id: "uts-paket-i",
      title: "Paket I: Validasi Usia & Rentang if-else if Majemuk",
      durationMinutes: 15,
      scenario: "Komisi Pemilihan Umum Mahasiswa UNM memverifikasi usia pemilih ke dalam 5 rentang klasifikasi usia berantai: Bayi (<=1), Anak-anak (<=10), Remaja (<=19), Dewasa (<=60), dan Lansia (>60 th) sesuai studi kasus Praktikum 5.3 Resmi UNM. Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Tipe Data Integer) + Modul 2 (Operator Relasional) + Modul 5 (if-else if Majemuk)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int usia = 20;
    string kategori = "";

    // Evaluasi 5 Rentang Usia Berantai (Praktikum 5.3)
    if (usia <= 1) {
        kategori = "Bayi";
    } ___BLANK_1___ (usia <= 10) {
        kategori = "Anak-anak";
    } else if (usia ___BLANK_2___ 19) {
        kategori = "Remaja";
    } else if (usia <= 60) {
        kategori = "Dewasa";
    } ___BLANK_3___ {
        kategori = "Lansia";
    }

    // Operator Relasional (Modul 2): Syarat berhak memilih dalam pemilu adalah usia >= 17 tahun
    bool berhakMemilih = (usia ___BLANK_4___ 17);

    cout << "===== KLASIFIKASI USIA PEMILU MAHASISWA =====" << endl;
    cout << "Usia Terdata   : " << usia << " tahun" << endl;
    cout << "Kategori Usia  : " << kategori << endl;
    cout << "Hak Suara      : " << (berhakMemilih ? "BERHAK MEMILIH" : "BELUM CUKUP UMUR") << ___BLANK_5___;

    return 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Struktur lanjutan if untuk menguji cabang kondisi berikutnya (Modul 5)",
          answers: ["else if", "elseif"],
          explanation: "'else if' digunakan untuk memeriksa kondisi alternatif jika kondisi sebelumnya bernilai false."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Operator relasional kurang dari atau sama dengan (Modul 2)",
          answers: ["<=", "=<"],
          explanation: "Operator '<=' mengevaluasi batas atas rentang umur remaja hingga 19 tahun."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Cabang penutup terakhir jika semua rentang sebelumnya false (Modul 5)",
          answers: ["else", "ELSE"],
          explanation: "Blok 'else' menangkap semua nilai usia yang tidak memenuhi syarat di atasnya (> 60 tahun)."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator relasional lebih besar atau sama dengan (Modul 2)",
          answers: [">=", "=>"],
          explanation: "Operator '>=' memastikan pemilih berumur minimal 17 tahun ke atas."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Manipulator pindah baris output (Modul 1)",
          answers: ["endl", "endl;"],
          explanation: "'endl' mengakhiri baris tampilan konsol dan memindahkan kursor ke baris berikutnya."
        }
      ],
      expectedOutput: `===== KLASIFIKASI USIA PEMILU MAHASISWA =====
Usia Terdata   : 20 tahun
Kategori Usia  : Dewasa
Hak Suara      : BERHAK MEMILIH

Process returned 0 (0x0)   execution time : 0.018 s`
    },

    {
      id: "uts-paket-j",
      title: "Paket J: Sanitasi Teks & Deteksi Kata Terlarang",
      durationMinutes: 15,
      scenario: "Laboratorium Komputasi Awan UNM membangun filter sensor kata untuk komentar forum diskusi mahasiswa: mencari posisi kata terlarang menggunakan method .find(), mengecek konstanta string::npos, dan menyensor kata tersebut dengan method .replace() (Modul 3 & Modul 4). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Tipe Data & IO) + Modul 4 (Pustaka String, .find(), .replace(), string::npos)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Struct Rekap Moderasi Pesan (Modul 3)
struct LaporanSensor {
    string idKomentar;
    int jumlahKataSensor;
};

int main() {
    string pesan = "Program ini buruk sekali dan tidak rapi";
    string kataTerlarang = "buruk";

    // 2. Mencari indeks kemunculan kata terlarang (Modul 4)
    size_t posisi = pesan.___BLANK_1___(kataTerlarang);

    // 3. Konstanta C++ string yang menandakan substring tidak ditemukan (Modul 4)
    if (posisi != string::___BLANK_2___) {
        // 4. Mengganti kata terlarang dengan tanda sensor "***" (Modul 4)
        pesan.___BLANK_3___(posisi, kataTerlarang.length(), "***");
    }

    // 5. Cek apakah string pesan kosong (Modul 4)
    bool statusKosong = pesan.___BLANK_4___();

    LaporanSensor rep;
    rep.idKomentar = "CMT-101";
    rep.jumlahKataSensor = 1;

    cout << "===== SISTEM SENSOR FORUM MAHASISWA =====" << endl;
    cout << "ID Komentar : " << rep.___BLANK_5___ << endl;
    cout << "Hasil Teks  : " << pesan << endl;
    cout << "Pesan Kosong: " << (statusKosong ? "YA" : "TIDAK") << endl;

    return 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Method string untuk mencari posisi pertama kemunculan substring (Modul 4)",
          answers: ["find", "find()"],
          explanation: "Metode .find(keyword) mengembalikan indeks posisi karakter pertama dari substring yang dicari."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Konstanta penanda 'tidak ditemukan' milik kelas std::string (Modul 4)",
          answers: ["npos", "NPOS"],
          explanation: "'string::npos' adalah konstanta statis berukuran maksimum yang merepresentasikan kondisi 'No Position' / tidak ditemukan."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Method string untuk mengganti sebagian teks dengan kata baru (Modul 4)",
          answers: ["replace", "replace()"],
          explanation: "Metode .replace(pos, len, string_baru) mengganti sejumlah karakter di posisi tertentu dengan kata baru."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Method string untuk memeriksa apakah teks kosong tanpa karakter (Modul 4)",
          answers: ["empty", "empty()"],
          explanation: "Metode .empty() mengembalikan nilai boolean true jika panjang string adalah 0."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Nama anggota member struct LaporanSensor yang menyimpan ID komentar (Modul 3)",
          answers: ["idKomentar", "id_komentar"],
          explanation: "Member dalam deklarasi struct LaporanSensor adalah 'idKomentar'."
        }
      ],
      expectedOutput: `===== SISTEM SENSOR FORUM MAHASISWA =====
ID Komentar : CMT-101
Hasil Teks  : Program ini *** sekali dan tidak rapi
Pesan Kosong: TIDAK

Process returned 0 (0x0)   execution time : 0.020 s`
    },

    {
      id: "uts-paket-k",
      title: "Paket K: Sistem Keamanan IoT & Bitwise Masking",
      durationMinutes: 15,
      scenario: "Laboratorium Jaringan & IoT UNM membaca 8-bit register sensor keamanan gedung: Bit 0 (Pintu), Bit 1 (Jendela), Bit 2 (Sensor Asap). Lakukan bitwise AND untuk mengekstrak status sensor asap dan evaluasi percabangan alarm darurat (Modul 2 & Modul 5). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Tipe Data Unsigned Char) + Modul 2 (Bitwise AND &, OR |, Compound |=) + Modul 5 (if-else Status Darurat)",
      rawCode: `#include <iostream>
using namespace std;

int main() {
    // Register status awal: 0b00000101 (Pintu & Sensor Asap Aktif) = desimal 5
    unsigned char registerStatus = 5;

    // Masker bit untuk memeriksa sensor asap pada Bit-2 (2^2 = 4 biner: 00000100)
    unsigned char MASK_ASAP = 4;

    // 1. Bitwise AND (Modul 2): Isolasi hanya bit sensor asap
    unsigned char cekAsap = registerStatus ___BLANK_1___ MASK_ASAP;

    string statusBahaya = "";

    // 2. Percabangan if-else untuk status darurat (Modul 5)
    ___BLANK_2___ (cekAsap != 0) {
        statusBahaya = "DARURAT ASAP TERDETEKSI";
        // 3. Menyalakan Bit-7 Sirine Alarm (nilai 128) menggunakan Bitwise OR (Modul 2)
        registerStatus = registerStatus ___BLANK_3___ 128;
    } else {
        statusBahaya = "KONDISI AMAN";
    }

    // 4. Operator compound assignment pergeseran bit shift left (Modul 2)
    unsigned int timerDetik = 1;
    timerDetik ___BLANK_4___ 3; // 1 << 3 setara 1 * 8 = 8 detik

    cout << "===== SISTEM KEAMANAN IoT GEDUNG LAB UNM =====" << endl;
    cout << "Status Deteksi : " << statusBahaya << endl;
    cout << "Register Akhir : " << (int)registerStatus << endl;
    cout << "Durasi Alarm   : " << timerDetik << " detik" << endl;

    return ___BLANK_5___;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Operator bitwise AND untuk masking bit tertentu (Modul 2)",
          answers: ["&", "and"],
          explanation: "Operator '&' (bitwise AND) melakukan operasi logika DAN pada setiap pasangan bit individual."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Keyword percabangan kondisi C++ (Modul 5)",
          answers: ["if", "IF"],
          explanation: "Keyword 'if' digunakan untuk memeriksa apakah hasil masking sensor asap bernilai tidak sama dengan 0 (aktif)."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Operator bitwise OR untuk menyalakan/mengaktifkan bit tertentu (Modul 2)",
          answers: ["|", "or"],
          explanation: "Operator '|' (bitwise OR) digunakan untuk menyalakan bit tertentu tanpa mematikan bit lainnya."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Operator compound assignment geser bit ke kiri (bitwise shift left compound, Modul 2)",
          answers: ["<<=", "<< ="],
          explanation: "Operator '<<=' menggeser bit ke kiri dan langsung menugaskan hasilnya ke variabel tersebut (mengalikan dengan 2^N)."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Status kode keluaran sukses program main (Modul 1)",
          answers: ["0", "0;"],
          explanation: "'return 0;' mengembalikan kode status 0 yang berarti program berjalan lancar."
        }
      ],
      expectedOutput: `===== SISTEM KEAMANAN IoT GEDUNG LAB UNM =====
Status Deteksi : DARURAT ASAP TERDETEKSI
Register Akhir : 133
Durasi Alarm   : 8 detik

Process returned 0 (0x0)   execution time : 0.021 s`
    },

    {
      id: "uts-paket-l",
      title: "Paket L: Skrining Medis Pasien Klinik UNM",
      durationMinutes: 15,
      scenario: "Klinik Kesehatan Mahasiswa UNM mencatat pemeriksaan fisik pasien: mengunci ambang batas demam dengan konstanta const, menyimpan atribut pasien ke dalam struct, dan mendiagnosa status kesehatan dengan if-else ganda serta operator ternary (Modul 1, 2, 3, 5). Lengkapi titik-titik kode!",
      coveredModules: "Modul 1 (Konstanta const & Float) + Modul 2 (Ternary & Logika) + Modul 3 (Struct Pasien) + Modul 5 (if-else Ganda)",
      rawCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Deklarasi Konstanta Ambang Batas Demam (Modul 1)
___BLANK_1___ float BATAS_DEMAM = 37.5f;

// 2. Deklarasi Tipe Data Bentukan Struct Pasien (Modul 3)
struct PasienKlinik {
    string namaPasien;
    float suhuBadan;
    int denyutNadi;
};

int main() {
    PasienKlinik p;
    p.namaPasien = "Andi Reski";
    p.suhuBadan = 38.2f;
    p.denyutNadi = 95;

    string statusKesehatan = "";

    // 3. Seleksi Kondisi if-else Ganda (Modul 5)
    if (p.suhuBadan ___BLANK_2___ BATAS_DEMAM) {
        statusKesehatan = "Pasien Mengalami Demam";
    } ___BLANK_3___ {
        statusKesehatan = "Suhu Tubuh Normal";
    }

    // 4. Operator Ternary (Modul 2): Rekomendasi tindakan medis
    string rekomendasi = (p.suhuBadan >= 38.0f) ___BLANK_4___ "Beri Parasetamol & Kompres" : "Banyak Minum Air Putih";

    cout << "===== KLINIK KESEHATAN MAHASISWA UNM =====" << endl;
    cout << "Nama Pasien    : " << p.___BLANK_5___ << endl;
    cout << "Suhu Tubuh     : " << p.suhuBadan << " C" << endl;
    cout << "Status Klinis  : " << statusKesehatan << endl;
    cout << "Rekomendasi    : " << rekomendasi << endl;

    return 0;
}`,
      blanks: [
        {
          id: "BLANK_1",
          label: "Titik-titik 1",
          hint: "Keyword untuk mendefinisikan variabel konstan/tetap yang nilainya read-only (Modul 1)",
          answers: ["const", "CONST"],
          explanation: "Keyword 'const' mengunci nilai variabel agar tidak dapat dimodifikasi oleh baris program lain."
        },
        {
          id: "BLANK_2",
          label: "Titik-titik 2",
          hint: "Operator perbandingan lebih besar atau sama dengan (Modul 2)",
          answers: [">=", "=>"],
          explanation: "Operator '>=' memeriksa apakah suhu pasien telah mencapai atau melampaui batas 37.5 derajat celcius."
        },
        {
          id: "BLANK_3",
          label: "Titik-titik 3",
          hint: "Keyword cabang cadangan pada percabangan if (Modul 5)",
          answers: ["else", "ELSE"],
          explanation: "Blok 'else' dieksekusi saat kondisi if bernilai false (suhu di bawah batas demam)."
        },
        {
          id: "BLANK_4",
          label: "Titik-titik 4",
          hint: "Simbol penanda pertanyaan pada operator ternary ? : (Modul 2)",
          answers: ["?", "? "],
          explanation: "Tanda tanya '?' memisahkan kondisi dengan nilai keluaran jika kondisi bernilai true."
        },
        {
          id: "BLANK_5",
          label: "Titik-titik 5",
          hint: "Nama anggota member struct PasienKlinik yang menyimpan nama (Modul 3)",
          answers: ["namaPasien", "nama_pasien"],
          explanation: "Akses member struct menggunakan operator titik diikuti nama member yaitu 'namaPasien'."
        }
      ],
      expectedOutput: `===== KLINIK KESEHATAN MAHASISWA UNM =====
Nama Pasien    : Andi Reski
Suhu Tubuh     : 38.2 C
Status Klinis  : Pasien Mengalami Demam
Rekomendasi    : Beri Parasetamol & Kompres

Process returned 0 (0x0)   execution time : 0.017 s`
    }
  ],


  // ========================================================
  // STORYBOARD VIDEO SIMULASI ANIMASI ORANG AWAM
  // ========================================================
  videoSimulations: [
    {
      id: "sim-vid-1",
      title: "1. Perbedaan Karakteristik & Wadah Tipe Data",
      module: "Modul 1 (Laprak 1: Tipe Data Dasar)",
      durationSec: 24,
      tagline: "Membedakan int, float/double, char/string, dan bool secara visual",
      story: "Komputer membutuhkan wadah yang berbeda untuk setiap jenis data. Memasukkan angka pecahan ke integer akan memotong komanya, dan char hanya dapat menampung satu huruf. Mari pelajari perbedaannya!",
      steps: [
        { time: 0, title: "1. Integer (int): Khusus Bilangan Bulat Utuh", desc: "int hanya menampung angka bulat tanpa koma (seperti 10, -5, 50000). Jika kamu memaksa memasukkan angka 3.14 ke tipe int, angka .14 akan dibuang (terpotong) dan hanya tersimpan 3!" },
        { time: 7, title: "2. Float & Double: Khusus Angka Pecahan Desimal", desc: "float (presisi tunggal 4 byte, 7 digit) dan double (presisi ganda 8 byte, 15 digit) mampu menampung koma desimal seperti 3.14 atau 0.005 secara akurat." },
        { time: 14, title: "3. Char vs String: Satu Karakter vs Kumpulan Teks", desc: "char diapit petik satu ('A') dan hanya berukuran 1 Byte untuk satu huruf. Sedangkan string diapit petik dua (\"Warnisyah\") untuk menampung banyak huruf/kata." },
        { time: 20, title: "4. Boolean (bool): Saklar Logika True / False", desc: "bool hanya memiliki dua kemungkinan nilai: true (bernilai 1 di memori) atau false (bernilai 0 di memori). Sangat hemat memori (1 byte)." }
      ]
    },
    {
      id: "sim-vid-2",
      title: "2. Rahasia Operator Penugasan (Assignment & Compound)",
      module: "Modul 2 (Laprak 2: Operator Penugasan)",
      durationSec: 22,
      tagline: "Bukan Sama Dengan Matematika! Pahami Cara Variabel Diisi & Diubah",
      story: "Simbol '=' di C++ bukan menyatakan kesamaan matematika, melainkan memasukkan (menugaskan) nilai dari kanan ke dalam variabel kiri. Ditambah operator gabungan seperti +=, -=, *=, /= yang mempercepat proses coding!",
      steps: [
        { time: 0, title: "1. Penugasan Dasar: x = 10", desc: "Tanda '=' memasukkan nilai 10 ke dalam wadah variabel x. Ingat: Di C++, '=' adalah penugasan (assignment), sedangkan '==' adalah perbandingan kesamaan!" },
        { time: 6, title: "2. Penugasan Penjumlahan: x += 5", desc: "Sintaks 'x += 5' adalah singkatan dari 'x = x + 5'. Nilai awal x (10) ditambah 5, sehingga isi wadah x sekarang menjadi 15!" },
        { time: 11, title: "3. Penugasan Perkalian: x *= 2", desc: "Sintaks 'x *= 2' artinya 'x = x * 2'. Nilai 15 langsung digandakan 2 kali lipat menjadi 30 di dalam memori yang sama." },
        { time: 17, title: "4. Penugasan Modulo & Sisa Bagi: x %= 4", desc: "Sintaks 'x %= 4' artinya 'x = x % 4'. Nilai 30 dibagi 4 bersisa 2, maka nilai akhir variabel x menjadi 2!" }
      ]
    },
    {
      id: "sim-vid-3",
      title: "3. Tipe Data Bentukan: Struct, Union, Enum, & Typedef",
      module: "Modul 3 (Laprak 3: Tipe Data Bentukan)",
      durationSec: 24,
      tagline: "Membungkus Banyak Variabel Menjadi Satu Entitas Nyata",
      story: "Tipe data dasar seperti int hanya menyimpan satu angka. Di Laprak 3, kita membuat tipe bentukan baru (User-Defined Types) seperti paket internet, data pasien kacamata, urutan presiden, dan balok 3D!",
      steps: [
        { time: 0, title: "1. Kenapa Butuh Tipe Bentukan?", desc: "Dunia nyata memiliki banyak atribut. Contoh Paket Internet di Laprak 3.1 butuh nama_paket (string), kouta_telpon (int), dan kouta_internet (int) sekaligus dalam satu objek!" },
        { time: 7, title: "2. Struct: Rumah Bersama dengan Kamar Terpisah", desc: "Struct membungkus berbagai tipe data ke dalam satu kesatuan. Setiap member memiliki alamat RAM sendiri (Total 12 Byte), diakses dengan operator titik (objek.member)." },
        { time: 14, title: "3. Union: Hemat Memori Berbagi Satu Alamat (Laprak 3.2)", desc: "Union membuat semua member berbagi alamat RAM yang sama (Total sizeof cuma 4 Byte). Mengisi member satu akan menimpa (overwrite) isi member lainnya!" },
        { time: 20, title: "4. Enum & Typedef: Simbol Terindeks & Nama Alias", desc: "Enum memberi nama simbolik berurutan mulai dari 0 (Laprak 3.3 Presiden RI), dan Typedef memberi nama panggilan baru yang mudah dibaca (Laprak 3.5 typedef float angkaPecahan)." }
      ]
    }
  ],

  // ========================================================
  // SONTEKAN PINTASAN SINTAKS C++ (CHEATSHEET ASDOS)
  // ========================================================
  syntaxCheatSheet: [
    // --- MODUL 1 ---
    {
      id: "cs-1-1",
      module: "mod1",
      moduleLabel: "Modul 1 (I/O & Tipe Data)",
      title: "Kerangka Dasar Program C++",
      keywords: "iostream using namespace std main return 0 boilerplate kerangka",
      code: `#include <iostream>
using namespace std;

int main() {
    // Tulis kodemu di sini
    return 0;
}`,
      tip: "Jangan lupa tanda kurung kurawal buka-tutup {} dan return 0; di akhir fungsi main!"
    },
    {
      id: "cs-1-2",
      module: "mod1",
      moduleLabel: "Modul 1 (I/O & Tipe Data)",
      title: "Input & Output Konsol (cin >> & cout <<)",
      keywords: "cin cout endl input output panah cetak",
      code: `int angka;
cout << "Masukkan angka: "; // Panah mengalir KE LAYAR (<<)
cin >> angka;               // Panah mengalir DARI KEYBOARD (>>)
cout << "Angka kamu: " << angka << endl;`,
      tip: "Jembatan Keledai: cout << (panah ke kiri / keluar layar), cin >> (panah ke kanan / masuk variabel)."
    },
    {
      id: "cs-1-3",
      module: "mod1",
      moduleLabel: "Modul 1 (I/O & Tipe Data)",
      title: "Format Koma Desimal (iomanip & setprecision)",
      keywords: "iomanip setprecision fixed float double pecahan desimal koma",
      code: `#include <iomanip> // Wajib include ini!

double nilai = 3.141592;
cout << fixed << setprecision(2) << nilai; // Hasil: 3.14`,
      tip: "Gunakan 'fixed << setprecision(N)' agar angka desimal dibulatkan rapi tepat N digit di belakang koma."
    },
    {
      id: "cs-1-4",
      module: "mod1",
      moduleLabel: "Modul 1 (I/O & Tipe Data)",
      title: "Konstanta Read-Only (const)",
      keywords: "const konstanta tetapan read only phi",
      code: `const float PHI = 3.14f;
const int MAX_SISWA = 40;
// PHI = 3.15; // ERROR! Nilai const dikunci mati`,
      tip: "Nama konstanta biasanya ditulis HURUF_KAPITAL untuk memudahkan pembacaan kode."
    },

    // --- MODUL 2 ---
    {
      id: "cs-2-1",
      module: "mod2",
      moduleLabel: "Modul 2 (Operator)",
      title: "Operator Penugasan Gabungan (Compound Assignment)",
      keywords: "compound assignment += -= *= /= %= operator",
      code: `x += 5;  // Sama dengan: x = x + 5
x -= 2;  // Sama dengan: x = x - 2
x *= 3;  // Sama dengan: x = x * 3
x /= 2;  // Sama dengan: x = x / 2
x %= 4;  // Sama dengan: x = x % 4 (sisa bagi)`,
      tip: "Compound assignment lebih ringkas dan langsung memodifikasi variabel di tempat yang sama."
    },
    {
      id: "cs-2-2",
      module: "mod2",
      moduleLabel: "Modul 2 (Operator)",
      title: "Operator Ternary (? :) (if-else 1 Baris)",
      keywords: "ternary conditional if else singkat tanda tanya titik dua",
      code: `// Format: (kondisi) ? nilai_jika_true : nilai_jika_false;
int nilai = 75;
string status = (nilai >= 70) ? "LULUS" : "REMIDI";
cout << "Status: " << status << endl;`,
      tip: "Sangat cocok untuk menentukan label teks singkat tanpa harus membuat blok if-else panjang."
    },
    {
      id: "cs-2-3",
      module: "mod2",
      moduleLabel: "Modul 2 (Operator)",
      title: "Operator Bitwise Pergeseran Bit (<< & >>)",
      keywords: "bitwise shift left right geser bit kali bagi biner",
      code: `int a = 1;
int hasilKiri = a << 3;  // Geser kiri 3 bit: 1 * (2^3) = 8
int b = 64;
int hasilKanan = b >> 2; // Geser kanan 2 bit: 64 / (2^2) = 16`,
      tip: "'<< N' setara dengan dikali 2 pangkat N. '>> N' setara dengan dibagi 2 pangkat N."
    },
    {
      id: "cs-2-4",
      module: "mod2",
      moduleLabel: "Modul 2 (Operator)",
      title: "Logika Boolean vs Bitwise",
      keywords: "and or xor not boolean logika bitwise && || & | ^ ~",
      code: `// Logika Boolean (Hasil: true / false):
bool cek = (x > 5) && (y < 10); // Logika AND
bool opsi = (x == 1) || (y == 2); // Logika OR

// Bitwise (Dioperasikan per bit biner):
int c = a & b; // Bitwise AND
int d = a | b; // Bitwise OR
int e = a ^ b; // Bitwise XOR`,
      tip: "Hati-hati tertukar! '&&' adalah logika boolean untuk if, sedangkan '&' adalah bitwise untuk angka biner."
    },

    // --- MODUL 3 ---
    {
      id: "cs-3-1",
      module: "mod3",
      moduleLabel: "Modul 3 (Struct & Union)",
      title: "Deklarasi Struct & Titik Koma Wajib (;)",
      keywords: "struct struktur tipe bentukan objek member titik",
      code: `struct Mahasiswa {
    string nama;
    int nim;
    float ipk;
}; // <-- WAJIB TITIK KOMA DI SINI!

// Cara pakai:
Mahasiswa m1;
m1.nama = "Warnisyah";
m1.nim = 2502105;
m1.ipk = 3.95f;`,
      tip: "Jebakan Batman: 90% maba lupa tanda titik koma ';' di akhir penutup struct. Jangan sampai lupa!"
    },
    {
      id: "cs-3-2",
      module: "mod3",
      moduleLabel: "Modul 3 (Struct & Union)",
      title: "Union: Memori Bersama (Shared Memory)",
      keywords: "union shared memory hemat ram timpa overwrite",
      code: `union Data {
    char huruf;  // 1 Byte
    int angka;   // 4 Byte
};

Data d;
d.huruf = 'A';
d.angka = 100; // NILAI 'A' AKAN KETIMPA OLEH 100!
// Ukuran sizeof(d) HANYA 4 Byte (sebesar member terbesarnya)`,
      tip: "Union digunakan untuk menghemat RAM di mikrokontroler. Nilai member terakhir selalu menimpa nilai sebelumnya."
    },
    {
      id: "cs-3-3",
      module: "mod3",
      moduleLabel: "Modul 3 (Struct & Union)",
      title: "Enum: Konstanta Otomatis Mulai dari 0",
      keywords: "enum enumerasi daftar konstanta urut indeks",
      code: `enum Hari { SENIN, SELASA, RABU, KAMIS, JUMAT };
// SENIN=0, SELASA=1, RABU=2, dst.

Hari ini = RABU;
cout << "Index hari: " << ini; // Mencetak angka 2`,
      tip: "Untuk urutan ke-n manusia, tambahkan 1: (namaEnum + 1), contoh urutan presiden di Laprak 3.3."
    },
    {
      id: "cs-3-4",
      module: "mod3",
      moduleLabel: "Modul 3 (Struct & Union)",
      title: "Typedef: Nama Panggilan Alias Tipe Data",
      keywords: "typedef alias nama panggilan tipe data baru",
      code: `typedef float angkaPecahan;
typedef string kata;

angkaPecahan luas = 50.5;
kata nama = "Teknik Komputer";`,
      tip: "Sintaks: 'typedef tipe_asli nama_panggilan;'. Bermanfaat menyederhanakan penulisan kode panjang."
    },

    // --- MODUL 4 ---
    {
      id: "cs-4-1",
      module: "mod4",
      moduleLabel: "Modul 4 (String C++)",
      title: "Membaca Kalimat Berspasi (getline)",
      keywords: "getline spasi kalimat string cin input teks",
      code: `#include <string>

string namaLengkap;
cout << "Ketik nama lengkap: ";
getline(cin, namaLengkap); // Membaca spasi dengan aman!
// cin >> namaLengkap;    // JANGAN! Ini terpotong di spasi pertama`,
      tip: "Gunakan 'getline(cin, str)' untuk string C++, atau 'cin.get(str, 50)' jika menggunakan char array kuno."
    },
    {
      id: "cs-4-2",
      module: "mod4",
      moduleLabel: "Modul 4 (String C++)",
      title: "Penyelamat Hantu Enter (cin.ignore)",
      keywords: "cin.ignore buffer keyboard enter lewati input terlewati",
      code: `int umur;
string nama;

cin >> umur;
cin.ignore(); // <-- WAJIB: Membuang sisa tombol Enter!
getline(cin, nama);`,
      tip: "Jika getline terlewati tanpa bisa diketik, itu karena sisa '\\n' dari cin >> sebelumnya. Solusinya: cin.ignore();!"
    },
    {
      id: "cs-4-3",
      module: "mod4",
      moduleLabel: "Modul 4 (String C++)",
      title: "Method Bawaan String (.length, .at, swap)",
      keywords: "length size at swap panjang karakter tukar",
      code: `string teks = "Makassar";

int len = teks.length(); // 8 karakter
char huruf = teks.at(0); // 'M' (Aman dengan bounds-check)

string a = "Kopi", b = "Teh";
swap(a, b); // Isi ditukar seketika! a jadi "Teh", b jadi "Kopi"`,
      tip: "Gunakan .at(idx) daripada teks[idx] saat ujian responsi karena .at() memiliki pengaman jika indeks di luar batas."
    },
    {
      id: "cs-4-4",
      module: "mod4",
      moduleLabel: "Modul 4 (String C++)",
      title: "Pencarian & Penggantian Teks (.find & .replace)",
      keywords: "find replace string npos cari ganti sensor kata",
      code: `string pesan = "Saya benci error";
size_t pos = pesan.find("benci");

if (pos != string::npos) { // Jika ditemukan
    pesan.replace(pos, 5, "suka"); // Ganti 5 huruf di pos
}
// Hasil: "Saya suka error"`,
      tip: "Jika kata tidak ditemukan, .find() mengembalikan nilai spesial 'string::npos'."
    },

    // --- MODUL 5 ---
    {
      id: "cs-5-1",
      module: "mod5",
      moduleLabel: "Modul 5 (Percabangan)",
      title: "Percabangan if - else if - else Bertingkat",
      keywords: "if else if bertingkat majemuk kondisi percabangan",
      code: `if (nilai >= 85) {
    cout << "Grade A";
} else if (nilai >= 70) {
    cout << "Grade B";
} else if (nilai >= 55) {
    cout << "Grade C";
} else {
    cout << "Mengulang";
}`,
      tip: "Jebakan Batman: Jangan pernah menulis 'if (syarat);' dengan titik koma di belakang kurung!"
    },
    {
      id: "cs-5-2",
      module: "mod5",
      moduleLabel: "Modul 5 (Percabangan)",
      title: "Percabangan switch - case & Wajib break",
      keywords: "switch case break default menu pilihan",
      code: `char menu = 'B';

switch (menu) {
    case 'A':
        cout << "Pilihan Paket A";
        break; // <-- WAJIB: Mencegah terjun bebas (fall-through)!
    case 'B':
        cout << "Pilihan Paket B";
        break;
    default:
        cout << "Pilihan Tidak Valid";
        break;
}`,
      tip: "switch hanya menerima nilai diskrit bilangan bulat atau karakter (char/int/enum), TIDAK BISA untuk float atau string!"
    },
    {
      id: "cs-5-3",
      module: "mod5",
      moduleLabel: "Modul 5 (Percabangan)",
      title: "Logika Kasir Diskon Mandiri (Praktikum 5.5)",
      keywords: "kasir diskon belanja toko baju celana laprak 5.5",
      code: `// Evaluasi diskon baju mandiri:
if (totalBaju > 100000) {
    diskonBaju = 0.20 * totalBaju; // 20%
}

// Evaluasi diskon celana mandiri:
if (totalCelana > 70000) {
    diskonCelana = 0.25 * totalCelana; // 25%
}

double totalBayar = (totalBaju - diskonBaju) + (totalCelana - diskonCelana);`,
      tip: "Dua diskon dievaluasi secara terpisah (independen). Diskon baju tidak mempengaruhi diskon celana."
    }
  ]
};



