-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2025 at 05:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peta_proyek_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `nama_proyek` varchar(255) NOT NULL,
  `tahun_anggaran` year(4) NOT NULL,
  `alamat` text NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `status` enum('Perencanaan','Pelaksanaan','Selesai') DEFAULT 'Perencanaan',
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `nama_proyek`, `tahun_anggaran`, `alamat`, `latitude`, `longitude`, `status`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'Pengaspalan Jalan Desa Jotangan', '2023', 'Desa Jotangan, Kec. Prajurit Kulon', -7.45280000, 112.45120000, 'Selesai', '-', '2025-11-16 02:21:34', '2025-11-16 03:56:28'),
(2, 'Pengaspalan Jalan Desa Gedeg', '2023', 'Kec. Gedeg', -7.39560000, 112.45230000, 'Selesai', '-', '2025-11-16 02:21:34', '2025-11-16 03:56:28'),
(3, 'Pembangunan MCK Komunal', '2023', 'Desa Pungging, Kec. Pungging', -7.41780000, 112.59010000, 'Selesai', '-', '2025-11-16 02:21:34', '2025-11-16 03:58:48'),
(4, 'Rekonstruksi Jalan Ruas Jalan Jasem-Tanjangrono', '2024', 'Sukoanyar, Ngoro', -7.52021689, 112.61306575, 'Pelaksanaan', '-', '2025-11-16 02:21:34', '2025-11-16 03:52:14'),
(5, 'Pemeliharaan Berkala Jalan Lebaksono-Slepi', '2024', 'Jl. Raya Tretes-Trawas', -7.66234562, 112.58911605, 'Pelaksanaan', '-', '2025-11-16 02:21:34', '2025-11-16 03:59:01'),
(6, 'Pemeliharaan Berkala Jalan Pandanarum-Cembor', '2024', 'Kec. Pacet', -7.66052648, 112.57454039, 'Pelaksanaan', '-', '2025-11-16 02:21:34', '2025-11-16 03:59:28'),
(7, 'Pembangunan Jembatan Purworejo', '2024', 'Jatijejer, Pacet', -7.60536648, 112.55850465, 'Pelaksanaan', '-', '2025-11-16 02:21:34', '2025-11-16 03:59:39'),
(8, 'Pemeliharaan Berkala Jalan Pacing-Pacet', '2024', 'Kec. bangsal', -7.50074817, 112.47631448, 'Pelaksanaan', '-', '2025-11-16 02:21:34', '2025-11-16 03:59:50'),
(9, 'Pembangunan Jembatan Kedungudi', '2024', 'Kedungudi, Trawas', -7.65472034, 112.60115939, 'Pelaksanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:00'),
(10, 'Pelebaran Jalan Menuju Standar Ruas Banjaragung-Balongmojo', '2025', 'Banjaragung Puri', -7.53022000, 112.43120334, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:10'),
(11, 'Pelebaran Jalan Menuju Standar Ruas Bendung-Bantengan', '2025', 'Kec. Jatirejo', -7.59887616, 112.41695609, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:20'),
(12, 'Pelebaran Jalan Menuju Standar Ruas Kepuhanyar-Ngimbangan', '2025', 'Kec.Mojosari', -7.46142384, 112.47507898, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:30'),
(13, 'Rekonstruksi Jalan Ruas Jalan Lengkong-Gondang', '2025', 'jl Raya Dinoyo, padangasri', -7.58150812, 112.43964383, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:38'),
(14, 'Pelebaran Jalan Menuju Standar Ruas Ketapanrame-Dlundung', '2025', 'Ketapanrame, Trawas', -7.67052762, 112.61214114, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:47'),
(15, 'Pembangunan Jembatan Talunbrak', '2025', 'Kecamatan Dawarblandong', -7.33739266, 112.42494545, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:00:55'),
(16, 'Peningkatan Bendung Wonokerto', '2025', 'Kecamatan Dawarblandong', -7.33050661, 112.40762210, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:01:04'),
(17, 'Pembangunan Gedung Negara Sederhana - Sarana dan Prasarana Kantor Kelurahan Sawahan', '2025', 'Kecamatan Mojosari', -7.51926180, 112.56140993, 'Perencanaan', '-', '2025-11-16 02:21:34', '2025-11-16 04:01:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
