## FAUZAN NOTE :
"Aplikasi Catalog-Film adalah sebuah aplikasi web yang dirancang untuk mengelola dan menampilkan informasi tentang film dan menampilkan layarmuka yang interaktif"
Struktuf foldernya
catalog-film/client (front-end)
catalog-film/server (java-springboot)
MySQL (Ddatabase)

1. Persiapkan Lingkungan Pengembangan
    - Instal Node.js dan npm:
    Pastikan Node.js dan npm (Node Package Manager) sudah terinstal di sistem Anda. Anda dapat mengunduh dan menginstalnya dari situs resmi Node.js.
    - Cek Instalasi:
    node -v
    npm -v
2. Clone atau Download Aplikasi
    - git clone <URL_REPOSITORY_GITHUB>
3. Instal Dependensi
    - Masuk ke folder proyek client di terminal dan jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan oleh aplikasi: npm install.
    - masuk ke folder proyek server bisa melalui visual code , lalu masuk ke file src/java/com/server/server/resource/application.properties
    lalu betulkan environment
4. Jalankan Aplikasi
    - masuk ke folder client lalu ketik npm start
    - masuk ke folder server lalu jalankan springboot;

## Backend: Java Spring Boot
Java Spring Boot digunakan untuk membangun backend aplikasi Anda. Di sini, Anda telah membuat beberapa modul untuk menangani berbagai aspek aplikasi:

## 1. Auth Management:

Fungsi: Modul ini mengelola proses otentikasi dan otorisasi pengguna. Ini termasuk pendaftaran pengguna, login, dan manajemen token untuk sesi pengguna."

## 2. User Management:

Fungsi: Modul ini bertanggung jawab untuk mengelola data pengguna setelah mereka terdaftar. Ini termasuk operasi CRUD (Create, Read, Update, Delete) pada profil pengguna.

## 3. Film Management:

Fungsi: Modul ini mengelola informasi tentang film yang ada dalam aplikasi. Ini termasuk operasi CRUD untuk film.

## Frontend: React
React digunakan untuk membangun antarmuka pengguna aplikasi Anda. Anda telah mengembangkan beberapa tampilan untuk berinteraksi dengan backend dan menyediakan pengalaman pengguna yang interaktif:

## 1. Tampilan Awal:

Fungsi: Ini adalah halaman utama aplikasi Anda yang mungkin menampilkan informasi umum atau panduan untuk pengguna baru.

## 2. Tampilan Login:

Fungsi: Halaman ini memungkinkan pengguna untuk masuk ke aplikasi dengan menggunakan kredensial mereka. Ini berinteraksi dengan modul Auth Management di backend untuk memverifikasi pengguna dan mendapatkan token autentikasi.

## 3. Tampilan Register:

Fungsi: Halaman pendaftaran di mana pengguna dapat membuat akun baru. Ini mengirimkan data pendaftaran ke backend untuk membuat entri pengguna baru.

## 3. Tampilan CRUD Film:

Fungsi: Halaman ini memungkinkan pengguna untuk melakukan operasi CRUD pada data film. Pengguna dapat:

## Integrasi Frontend dan Backend:

- Interaksi dengan Backend: Frontend Anda terhubung dengan backend melalui API yang disediakan oleh modul-modul di Spring Boot. Misalnya, ketika pengguna mendaftar, frontend mengirimkan data pendaftaran ke endpoint pendaftaran di backend.

- Pengelolaan Status dan Tampilan: React mengelola status aplikasi dan tampilan berdasarkan data yang diterima dari backend, seperti menampilkan pesan kesalahan atau sukses berdasarkan respons dari server.

## Contoh Alur Kerja:

- Pengguna baru mendaftar: Pengguna memasukkan informasi mereka di halaman Register, dan data dikirimkan ke backend untuk membuat akun. Backend memproses data dan mengirimkan respons yang kemudian ditampilkan di frontend.

- Pengguna login: Setelah mendaftar, pengguna dapat login melalui halaman Login. Frontend mengirimkan kredensial pengguna ke backend, yang memverifikasi dan mengirimkan token autentikasi jika berhasil.

- Manajemen Film: Pengguna dapat mengelola film melalui antarmuka CRUD yang disediakan di frontend. Setiap tindakan (menambahkan, memperbarui, atau menghapus film) berinteraksi dengan backend untuk memperbarui data film.

