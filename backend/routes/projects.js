const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET semua projects
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects');
        //WHERE tahun_anggaran != 2023 ORDER BY tahun_anggaran DESC, created_at DESC <- pakai ini kalau untuk tidak menampilkan data 2023
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET projects by kategori
router.get('/kategori/:kategori', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects WHERE kategori = ?', [req.params.kategori]);
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET statistik
router.get('/stats', async (req, res) => {
    try {
        const [total] = await db.query('SELECT COUNT(*) as total FROM projects');
        const [byKategori] = await db.query('SELECT kategori, COUNT(*) as jumlah FROM projects GROUP BY kategori');
        
        res.json({
            success: true,
            data: {
                total_paket: total[0].total,
                by_kategori: byKategori
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;