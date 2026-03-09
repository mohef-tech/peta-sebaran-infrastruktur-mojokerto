// ===== INISIALISASI PETA =====
const map = L.map('map', {
    center: [-7.4663, 112.4336], // Koordinat Kab. Mojokerto
    zoom: 11,
    minZoom: 4,
    maxZoom: 18,
    zoomControl: true
});

// Tile layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
}).addTo(map);

// ===== KONFIGURASI WARNA BERDASARKAN TAHUN =====
const yearColors = {
    2023: '#3b82f6',  // Biru
    2024: '#10b981',  // Hijau
    2025: '#f59e0b',  // Kuning
    2026: '#8b5cf6'   // Ungu
};

// Function untuk get warna berdasarkan tahun
function getColorByYear(tahun) {
    return yearColors[tahun] || '#6b7280'; // Abu-abu default
}

// ===== CUSTOM PIN ICON =====
function createPinIcon(color) {
    return L.divIcon({
        className: 'custom-pin',
        html: `
            <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z" 
                      fill="${color}" 
                      stroke="#fff" 
                      stroke-width="2"/>
                <circle cx="16" cy="15" r="6" fill="#fff"/>
            </svg>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42]
    });
}

// ===== GLOBAL VARIABLES =====
let allMarkers = [];
let allProjects = [];

// ===== FUNCTION: LOAD DATA FROM API =====
async function loadProjects() {
    try {
        console.log('🔄 Fetching data from API...');
        
        const response = await fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Data received:', result);
        
        if (result.success && result.data && Array.isArray(result.data)) {
            allProjects = result.data;
            console.log(`✅ Total projects: ${allProjects.length}`);
            
            if (allProjects.length > 0) {
                displayMarkers(allProjects);
                updateStats(allProjects);
            } else {
                console.warn('⚠️ No projects found in database');
                document.getElementById('totalProyek').textContent = '0 Proyek';
                document.getElementById('sebaranTahun').innerHTML = 'Belum ada data';
            }
        } else {
            throw new Error('Data tidak valid dari server');
        }
        
        // Update last update date
        updateLastUpdateDate();
        
    } catch (error) {
        console.error('❌ Error loading data:', error);
        handleLoadError(error);
    }
}

// ===== FUNCTION: DISPLAY MARKERS ON MAP =====
function displayMarkers(projects) {
    // Hapus marker lama
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];
    
    // Tambah marker baru
    projects.forEach(project => {
        const color = getColorByYear(project.tahun_anggaran);
        const pinIcon = createPinIcon(color);
        
        const marker = L.marker([project.latitude, project.longitude], {
            icon: pinIcon
        }).addTo(map);
        
        // Popup content
        const popupContent = `
            <div class="popup-title">${project.nama_proyek}</div>
            <div class="popup-info">
                <strong>📅 Tahun:</strong> ${project.tahun_anggaran}<br>
                <strong>📍 Alamat:</strong> ${project.alamat}<br>
                <strong>📊 Status:</strong> ${project.status}
                ${project.keterangan ? `<br><strong>📝 Keterangan:</strong> ${project.keterangan}` : ''}
            </div>
        `;
        
        marker.bindPopup(popupContent);
        allMarkers.push(marker);
    });
    
    console.log(`✅ ${allMarkers.length} markers displayed`);
}

// ===== FUNCTION: UPDATE STATISTICS =====
function updateStats(projects) {
    const total = projects.length;
    
    // Hitung proyek per tahun
    const byYear = {};
    projects.forEach(p => {
        byYear[p.tahun_anggaran] = (byYear[p.tahun_anggaran] || 0) + 1;
    });
    
    // Update total proyek
    document.getElementById('totalProyek').textContent = `${total} Proyek`;
    
    // Format sebaran tahun dengan WARNA
    const yearInfo = Object.entries(byYear)
        .sort((a, b) => a[0] - b[0])
        .map(([year, count]) => {
            const color = getColorByYear(year);
            return `<span style="color: ${color}; font-weight: 700;">${year}: ${count} proyek</span>`;
        })
        .join('<br>');
    
    document.getElementById('sebaranTahun').innerHTML = yearInfo;
    
    console.log('✅ Stats updated');
}

// ===== FUNCTION: UPDATE LAST UPDATE DATE =====
function updateLastUpdateDate() {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
    
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = formatted;
        console.log('✅ Last update set:', formatted);
    } else {
        console.error('❌ Element #lastUpdate tidak ditemukan!');
    }
}

// ===== FUNCTION: HANDLE LOAD ERROR =====
function handleLoadError(error) {
    console.error('Error details:', error.message);
    
    // Set error state
    const totalEl = document.getElementById('totalProyek');
    const sebaranEl = document.getElementById('sebaranTahun');
    const lastUpdateEl = document.getElementById('lastUpdate');
    
    if (totalEl) totalEl.textContent = 'Error';
    if (sebaranEl) sebaranEl.innerHTML = 'Gagal memuat';
    if (lastUpdateEl) lastUpdateEl.textContent = 'Error';
    
    // Tampilkan alert
    alert(`Gagal memuat data!\n\nError: ${error.message}\n\nPastikan:\n1. Backend sudah running (npm run dev)\n2. Database MySQL sudah running\n3. Port 3000 tidak digunakan aplikasi lain`);
}

// ===== INIT: LOAD DATA SAAT HALAMAN DIMUAT =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded, initializing...');
    loadProjects();
});