// Configuración y variables globales
const CONFIG = {
    updateInterval: 2000, // 2 segundos para datos locales
    mapCenter: [20, 0],
    mapZoom: 2,
    // URLs de tu radio
    streamUrl: 'https://stream.zeno.fm/yg7bvksbfwzuv',
    metadataUrl: 'https://api.zeno.fm/mounts/metadata/subscribe/yg7bvksbfwzuv',
    // Configuración de tiempo real
    realTimeUpdates: true
};

// Datos simulados de oyentes por país (incluyendo países con 0 oyentes)
let listenersData = {
    'México': { lat: 23.6345, lng: -102.5528, count: 145, flag: '🇲🇽' },
    'Estados Unidos': { lat: 39.8283, lng: -98.5795, count: 89, flag: '🇺🇸' },
    'España': { lat: 40.4637, lng: -3.7492, count: 67, flag: '🇪🇸' },
    'Argentina': { lat: -38.4161, lng: -63.6167, count: 54, flag: '🇦🇷' },
    'Colombia': { lat: 4.5709, lng: -74.2973, count: 43, flag: '🇨🇴' },
    'Chile': { lat: -35.6751, lng: -71.5430, count: 32, flag: '🇨🇱' },
    'Perú': { lat: -9.1900, lng: -75.0152, count: 28, flag: '🇵🇪' },
    'Venezuela': { lat: 6.4238, lng: -66.5897, count: 25, flag: '🇻🇪' },
    'República Dominicana': { lat: 18.7357, lng: -70.1627, count: 15, flag: '🇩🇴' },
    'Reino Unido': { lat: 55.3781, lng: -3.4360, count: 19, flag: '🇬🇧' },
    'Canadá': { lat: 56.1304, lng: -106.3468, count: 16, flag: '🇨🇦' },
    'Francia': { lat: 46.2276, lng: 2.2137, count: 14, flag: '🇫🇷' },
    'Brasil': { lat: -14.2350, lng: -51.9253, count: 12, flag: '🇧🇷' },
    'Alemania': { lat: 51.1657, lng: 10.4515, count: 11, flag: '🇩🇪' },
    'Italia': { lat: 41.8719, lng: 12.5674, count: 8, flag: '🇮🇹' },
    'Japón': { lat: 36.2048, lng: 138.2529, count: 6, flag: '🇯🇵' },
    
    // Países con 0 oyentes (también mostrarán puntos rojos pequeños)
    'Australia': { lat: -25.2744, lng: 133.7751, count: 0, flag: '🇦🇺' },
    'China': { lat: 35.8617, lng: 104.1954, count: 0, flag: '🇨🇳' },
    'India': { lat: 20.5937, lng: 78.9629, count: 0, flag: '🇮🇳' },
    'Rusia': { lat: 61.5240, lng: 105.3188, count: 0, flag: '🇷🇺' },
    'Sudáfrica': { lat: -30.5595, lng: 22.9375, count: 0, flag: '🇿🇦' },
    'Egipto': { lat: 26.8206, lng: 30.8025, count: 0, flag: '🇪🇬' },
    'Nigeria': { lat: 9.0820, lng: 8.6753, count: 0, flag: '🇳🇬' },
    'Marruecos': { lat: 31.7917, lng: -7.0926, count: 0, flag: '🇲🇦' },
    'Turkía': { lat: 38.9637, lng: 35.2433, count: 0, flag: '🇹🇷' },
    'Grecia': { lat: 39.0742, lng: 21.8243, count: 0, flag: '🇬🇷' },
    'Portugal': { lat: 39.3999, lng: -8.2245, count: 0, flag: '🇵🇹' },
    'Países Bajos': { lat: 52.1326, lng: 5.2913, count: 0, flag: '🇳🇱' },
    'Bélgica': { lat: 50.5039, lng: 4.4699, count: 0, flag: '🇧🇪' },
    'Suiza': { lat: 46.8182, lng: 8.2275, count: 0, flag: '🇨🇭' },
    'Austria': { lat: 47.5162, lng: 14.5501, count: 0, flag: '🇦🇹' },
    'Noruega': { lat: 60.4720, lng: 8.4689, count: 0, flag: '🇳🇴' },
    'Suecia': { lat: 60.1282, lng: 18.6435, count: 0, flag: '🇸🇪' },
    'Dinamarca': { lat: 56.2639, lng: 9.5018, count: 0, flag: '🇩🇰' },
    'Finlandia': { lat: 61.9241, lng: 25.7482, count: 0, flag: '🇫🇮' },
    'Polonia': { lat: 51.9194, lng: 19.1451, count: 0, flag: '🇵🇱' },
    'República Checa': { lat: 49.8175, lng: 15.4730, count: 0, flag: '🇨🇿' },
    'Hungría': { lat: 47.1625, lng: 19.5033, count: 0, flag: '🇭🇺' },
    'Rumania': { lat: 45.9432, lng: 24.9668, count: 0, flag: '🇷🇴' },
    'Bulgaria': { lat: 42.7339, lng: 25.4858, count: 0, flag: '🇧🇬' },
    'Croacia': { lat: 45.1, lng: 15.2, count: 0, flag: '🇭🇷' },
    'Serbia': { lat: 44.0165, lng: 21.0059, count: 0, flag: '🇷🇸' },
    'Ucrania': { lat: 48.3794, lng: 31.1656, count: 0, flag: '🇺🇦' },
    'Estonia': { lat: 58.5953, lng: 25.0136, count: 0, flag: '🇪🇪' },
    'Letonia': { lat: 56.8796, lng: 24.6032, count: 0, flag: '🇱🇻' },
    'Lituania': { lat: 55.1694, lng: 23.8813, count: 0, flag: '🇱🇹' },
    'Eslovaquia': { lat: 48.6690, lng: 19.6990, count: 0, flag: '🇸🇰' },
    'Eslovenia': { lat: 46.1512, lng: 14.9955, count: 0, flag: '🇸🇮' },
    'Israel': { lat: 31.0461, lng: 34.8516, count: 0, flag: '🇮🇱' },
    'Jordania': { lat: 30.5852, lng: 36.2384, count: 0, flag: '🇯🇴' },
    'Líbano': { lat: 33.8547, lng: 35.8623, count: 0, flag: '🇱🇧' },
    'Tailandia': { lat: 15.8700, lng: 100.9925, count: 0, flag: '🇹🇭' },
    'Vietnam': { lat: 14.0583, lng: 108.2772, count: 0, flag: '🇻🇳' },
    'Malasia': { lat: 4.2105, lng: 101.9758, count: 0, flag: '🇲🇾' },
    'Singapur': { lat: 1.3521, lng: 103.8198, count: 0, flag: '🇸🇬' },
    'Indonesia': { lat: -0.7893, lng: 113.9213, count: 0, flag: '🇮🇩' },
    'Filipinas': { lat: 12.8797, lng: 121.7740, count: 0, flag: '🇵🇭' },
    'Corea del Sur': { lat: 35.9078, lng: 127.7669, count: 0, flag: '🇰🇷' },
    'Taiwán': { lat: 23.6978, lng: 120.9605, count: 0, flag: '🇹🇼' },
    'Nueva Zelanda': { lat: -40.9006, lng: 174.8860, count: 0, flag: '🇳🇿' }
};

// Variables globales
let map;
let markers = [];
let choroplethLayer = null;
let countriesGeoJSON = null;
let activityChart;
let eventSource = null;
let isConnected = false;

// Historial de canciones
let songHistory = [];

// Datos reales de la radio
let radioData = {
    currentSong: {
        title: 'Cargando...',
        artist: 'Conectando...'
    },
    listeners: 0,
    peakToday: 0,
    hasRealMetadata: false,
    lastMetadataTime: null
};

// Lista de canciones cristianas en español para simulación
const christianSongs = [
    { title: "Cuán Grande Es Él", artist: "Marcos Witt" },
    { title: "Agnus Dei", artist: "Marco Barrientos" },
    { title: "Al Estar Aquí", artist: "Danilo Montero" },
    { title: "Eres Todo Poderoso", artist: "Danilo Montero" },
    { title: "Tu Fidelidad", artist: "Marcos Witt" },
    { title: "Cristo Vive", artist: "Alex Campos" },
    { title: "Hermoso Nombre", artist: "Hillsong en Español" },
    { title: "Renuévame", artist: "Marcela Gándara" },
    { title: "Desde Mi Interior", artist: "Alex Campos" },
    { title: "Hosanna", artist: "Marco Barrientos" },
    { title: "Te Vengo a Decir", artist: "Jesús Adrián Romero" },
    { title: "Mi Universo", artist: "Jesús Adrián Romero" },
    { title: "Sumérgeme", artist: "Jesús Adrián Romero" },
    { title: "Ven Es Hora de Adorarle", artist: "Marcos Witt" },
    { title: "Rey de Reyes", artist: "Christine D'Clario" },
    { title: "Como Tú No Hay Nadie", artist: "Alex Campos" },
    { title: "Bendito Jesús", artist: "Marcela Gándara" },
    { title: "En Tu Luz", artist: "Marco Barrientos" },
    { title: "Cantaré de Tu Amor", artist: "Danilo Montero" },
    { title: "Grande y Fuerte", artist: "Miel San Marcos" },
    { title: "Proezas", artist: "Miel San Marcos" },
    { title: "No Hay Lugar Más Alto", artist: "Miel San Marcos" },
    { title: "Increíble", artist: "Alex Zurdo" },
    { title: "Danzando", artist: "Marcela Gándara" },
    { title: "Océanos", artist: "Hillsong en Español" },
    { title: "Qué Sería de Mí", artist: "Jesús Adrián Romero" },
    { title: "Quedate Tranquilo", artist: "Christine D'Clario" },
    { title: "Admirable Dios", artist: "Marco Barrientos" },
    { title: "Vencedor", artist: "Alex Campos" },
    { title: "Abre Los Cielos", artist: "Miel San Marcos" },
    { title: "Santo", artist: "Marcos Witt" },
    { title: "Mi Corazón Te Adora", artist: "Danilo Montero" },
    { title: "Poderoso", artist: "Alex Campos" },
    { title: "Cree en Mí", artist: "Alex Zurdo" },
    { title: "Levántate Señor", artist: "Miel San Marcos" }
];

let currentSimulatedIndex = 0;
let simulationTimer = null;

// Datos para el gráfico de actividad (últimas 24 horas)
let activityData = {
    labels: [],
    data: []
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeChart();
    initializeSongHistory(); // Inicializar historial de canciones
    
    // Conectar con datos reales de Zeno.fm
    connectToZenoFM();
    
    // Inicializar simulación de canciones cristianas como respaldo
    setTimeout(() => {
        if (!radioData.hasRealMetadata) {
            startSongSimulation();
        }
    }, 5000); // Dar 5 segundos para intentar conexión real
    
    // Inicializar datos simulados para ubicaciones
    initializeLocationData();
    updateStatistics();
    updateCountriesRanking();
    
    // Actualizar datos periódicamente
    setInterval(updateStatistics, CONFIG.updateInterval);
    setInterval(updateMapVisualization, CONFIG.updateInterval);
    setInterval(updateChart, 30000); // Cada 30 segundos
    
    // Actualizar hora
    updateLastUpdate();
    setInterval(updateLastUpdate, 60000); // Cada minuto
});

// Conectar con la API de Zeno.fm usando Server-Sent Events
function connectToZenoFM() {
    console.log('🎵 Conectando con Radio Emisión Cristiana...');
    
    try {
        // Conectar a los metadatos en tiempo real
        eventSource = new EventSource(CONFIG.metadataUrl);
        
        eventSource.onopen = function(event) {
            console.log('✅ Conectado a Zeno.fm');
            isConnected = true;
            updateConnectionStatus(true);
        };
        
        eventSource.onmessage = function(event) {
            try {
                const data = JSON.parse(event.data);
                console.log('📡 Datos recibidos:', data);
                
                // Actualizar información de la canción
                if (data.streamTitle || data.title) {
                    updateCurrentSong(data, true);
                    radioData.hasRealMetadata = true;
                    radioData.lastMetadataTime = Date.now();
                    stopSongSimulation(); // Detener simulación si hay datos reales
                }
                
                // Simular variación en oyentes basada en actividad real
                updateListenerEstimate();
                
            } catch (error) {
                console.log('📊 Datos de metadatos:', event.data);
                // Si no es JSON, puede ser texto plano con título - artista
                if (event.data && event.data.trim() !== '') {
                    parseStreamTitle(event.data, true);
                    radioData.hasRealMetadata = true;
                    radioData.lastMetadataTime = Date.now();
                    stopSongSimulation();
                } else {
                    // No hay metadatos, usar simulación
                    checkAndStartSimulation();
                }
            }
        };
        
        eventSource.onerror = function(event) {
            console.log('❌ Error de conexión con Zeno.fm:', event);
            isConnected = false;
            updateConnectionStatus(false);
            
            // Iniciar simulación si no hay conexión
            checkAndStartSimulation();
            
            // Reintentar conexión en 5 segundos
            setTimeout(() => {
                if (eventSource.readyState === EventSource.CLOSED) {
                    connectToZenoFM();
                }
            }, 5000);
        };
        
    } catch (error) {
        console.error('Error al conectar con Zeno.fm:', error);
        // Usar datos simulados como respaldo
        useFallbackData();
    }
}

// Actualizar información de la canción actual
function updateCurrentSong(data, isRealData = false) {
    let title = 'Radio Emisión Cristiana';
    let artist = 'En Vivo';
    
    // Parsear diferentes formatos de respuesta
    if (data.streamTitle) {
        const parts = data.streamTitle.split(' - ');
        if (parts.length >= 2) {
            artist = parts[0].trim();
            title = parts[1].trim();
        } else {
            title = data.streamTitle;
        }
    } else if (data.title && data.artist) {
        title = data.title;
        artist = data.artist;
    } else if (data.title) {
        title = data.title;
    }
    
    // Solo actualizar si hay contenido válido
    if (title && title !== 'Radio Emisión Cristiana' && title.trim() !== '') {
        // Verificar si la canción cambió
        const currentTitle = radioData.currentSong.title;
        const currentArtist = radioData.currentSong.artist;
        
        if (currentTitle !== title || currentArtist !== artist) {
            // Agregar la canción anterior al historial (si no es la primera vez)
            if (currentTitle !== 'Cargando...' && currentTitle !== 'En Vivo' && 
                currentTitle !== 'Conectando...' && currentTitle !== 'Radio Emisión Cristiana') {
                addToSongHistory(currentTitle, currentArtist);
            }
            
            // Actualizar datos globales
            radioData.currentSong.title = title;
            radioData.currentSong.artist = artist;
            
            // Actualizar interfaz
            document.getElementById('song-title').textContent = title;
            document.getElementById('artist').textContent = artist;
            
            if (isRealData) {
                console.log(`🎵 Ahora sonando (Real): ${artist} - ${title}`);
            }
        }
    } else if (!isRealData) {
        // Si no hay datos válidos y no son datos reales, iniciar simulación
        checkAndStartSimulation();
    }
}

// Parsear título de stream en formato texto
function parseStreamTitle(streamTitle, isRealData = false) {
    if (!streamTitle || streamTitle.trim() === '') {
        if (!isRealData) checkAndStartSimulation();
        return;
    }
    
    const cleanTitle = streamTitle.trim();
    const parts = cleanTitle.split(' - ');
    
    let artist = 'Radio Emisión Cristiana';
    let title = 'En Vivo';
    
    if (parts.length >= 2) {
        artist = parts[0].trim();
        title = parts.slice(1).join(' - ').trim();
    } else {
        title = cleanTitle;
    }
    
    // Solo actualizar si hay contenido válido
    if (title && title !== 'En Vivo' && title.trim() !== '') {
        // Verificar si la canción cambió
        const currentTitle = radioData.currentSong.title;
        const currentArtist = radioData.currentSong.artist;
        
        if (currentTitle !== title || currentArtist !== artist) {
            // Agregar la canción anterior al historial (si no es la primera vez)
            if (currentTitle !== 'Cargando...' && currentTitle !== 'En Vivo' && 
                currentTitle !== 'Conectando...' && currentTitle !== 'Radio Emisión Cristiana') {
                addToSongHistory(currentTitle, currentArtist);
            }
            
            radioData.currentSong.title = title;
            radioData.currentSong.artist = artist;
            
            document.getElementById('song-title').textContent = title;
            document.getElementById('artist').textContent = artist;
            
            if (isRealData) {
                console.log(`🎵 Ahora sonando (Stream): ${artist} - ${title}`);
            }
        }
    } else if (!isRealData) {
        checkAndStartSimulation();
    }
}

// Actualizar estado de conexión
function updateConnectionStatus(connected) {
    const statusText = document.querySelector('.live-text');
    const indicator = document.querySelector('.live-indicator');
    const connectionInfo = document.querySelector('.connection-info small');
    
    if (connected) {
        if (statusText) statusText.textContent = 'EN VIVO';
        if (indicator) indicator.style.backgroundColor = 'var(--accent-color)';
        if (connectionInfo) connectionInfo.textContent = 'Conectado a Zeno.fm';
    } else {
        if (statusText) statusText.textContent = 'RECONECTANDO...';
        if (indicator) indicator.style.backgroundColor = 'var(--warning-color)';
        if (connectionInfo) connectionInfo.textContent = 'Intentando reconectar...';
    }
}

// Estimar oyentes basado en actividad
function updateListenerEstimate() {
    const baseListeners = 85; // Base realista para radio indie
    const variation = Math.floor(Math.random() * 40) - 20; // ±20
    const timeBoost = getTimeBoost(); // Boost según hora del día
    
    radioData.listeners = Math.max(5, baseListeners + variation + timeBoost);
    radioData.peakToday = Math.max(radioData.peakToday, radioData.listeners + Math.floor(Math.random() * 30));
}

// Boost de oyentes según hora del día
function getTimeBoost() {
    const hour = new Date().getHours();
    
    // Horas pico: 7-9 AM, 12-2 PM, 6-10 PM
    if ((hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 22)) {
        return Math.floor(Math.random() * 25) + 15; // +15-40 en horas pico
    }
    
    // Horas normales
    return Math.floor(Math.random() * 15); // +0-15 normal
}

// Inicializar datos de ubicaciones (simulados)
function initializeLocationData() {
    // Los datos ya están inicializados en listenersData
}

// Usar datos de respaldo si falla la conexión
function useFallbackData() {
    console.log('📻 Usando datos de respaldo');
    updateConnectionStatus(false);
    checkAndStartSimulation();
}

// Iniciar simulación de canciones cristianas
function startSongSimulation() {
    console.log('🎵 Iniciando simulación de canciones cristianas');
    
    // Mostrar primera canción inmediatamente
    showNextSimulatedSong();
    
    // Cambiar canción cada 3-4 minutos
    simulationTimer = setInterval(() => {
        if (!radioData.hasRealMetadata) {
            showNextSimulatedSong();
        }
    }, getRandomInterval());
}

// Detener simulación cuando hay datos reales
function stopSongSimulation() {
    if (simulationTimer) {
        clearInterval(simulationTimer);
        simulationTimer = null;
        console.log('⏹️ Simulación detenida - usando datos reales');
    }
}

// Verificar si necesita iniciar simulación
function checkAndStartSimulation() {
    const timeSinceLastMetadata = Date.now() - (radioData.lastMetadataTime || 0);
    
    // Si no hay metadatos por más de 10 segundos, iniciar simulación
    if (!radioData.hasRealMetadata || timeSinceLastMetadata > 10000) {
        if (!simulationTimer) {
            startSongSimulation();
        }
    }
}

// Mostrar siguiente canción simulada
function showNextSimulatedSong() {
    const song = christianSongs[currentSimulatedIndex];
    
    // Agregar la canción anterior al historial (si no es la primera vez)
    const currentTitle = radioData.currentSong.title;
    const currentArtist = radioData.currentSong.artist;
    
    if (currentTitle !== 'Cargando...' && currentTitle !== 'En Vivo' && 
        currentTitle !== 'Conectando...' && currentTitle !== 'Radio Emisión Cristiana') {
        addToSongHistory(currentTitle, currentArtist);
    }
    
    radioData.currentSong.title = song.title;
    radioData.currentSong.artist = song.artist;
    
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('artist').textContent = song.artist;
    
    console.log(`🎵 Simulando: ${song.artist} - ${song.title}`);
    
    // Avanzar al siguiente índice
    currentSimulatedIndex = (currentSimulatedIndex + 1) % christianSongs.length;
}

// Obtener intervalo aleatorio entre 3-4 minutos
function getRandomInterval() {
    return (180 + Math.random() * 60) * 1000; // 3-4 minutos en milisegundos
}

// Agregar canción al historial
function addToSongHistory(title, artist) {
    // Evitar duplicados consecutivos
    if (songHistory.length > 0) {
        const lastSong = songHistory[0];
        if (lastSong.title === title && lastSong.artist === artist) {
            return; // No agregar la misma canción consecutivamente
        }
    }
    
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                      now.getMinutes().toString().padStart(2, '0');
    
    const newSong = {
        title: title,
        artist: artist,
        time: timeString,
        timestamp: now.getTime()
    };
    
    // Agregar al inicio del array
    songHistory.unshift(newSong);
    
    // Mantener solo las últimas 10 canciones
    if (songHistory.length > 10) {
        songHistory = songHistory.slice(0, 10);
    }
    
    // Actualizar la interfaz
    updateSongHistoryDisplay();
    
    console.log(`📝 Agregado al historial: ${artist} - ${title} (${timeString})`);
}

// Actualizar la visualización del historial
function updateSongHistoryDisplay() {
    const historyContainer = document.getElementById('song-history-list');
    
    if (songHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="history-item loading">
                <div class="history-time">--:--</div>
                <div class="history-song">
                    <div class="history-title">Sin historial aún</div>
                    <div class="history-artist">Las canciones aparecerán aquí</div>
                </div>
            </div>
        `;
        return;
    }
    
    const historyHTML = songHistory.map(song => `
        <div class="history-item">
            <div class="history-time">${song.time}</div>
            <div class="history-song">
                <div class="history-title">${song.title}</div>
                <div class="history-artist">${song.artist}</div>
            </div>
        </div>
    `).join('');
    
    historyContainer.innerHTML = historyHTML;
}

// Inicializar historial con algunas canciones de ejemplo
function initializeSongHistory() {
    const now = new Date();
    const sampleSongs = [
        { title: "Cuán Grande Es Él", artist: "Marcos Witt", minutesAgo: 8 },
        { title: "Agnus Dei", artist: "Marco Barrientos", minutesAgo: 12 },
        { title: "Al Estar Aquí", artist: "Danilo Montero", minutesAgo: 16 },
        { title: "Eres Todo Poderoso", artist: "Danilo Montero", minutesAgo: 20 }
    ];
    
    sampleSongs.forEach(song => {
        const time = new Date(now.getTime() - (song.minutesAgo * 60 * 1000));
        const timeString = time.getHours().toString().padStart(2, '0') + ':' + 
                          time.getMinutes().toString().padStart(2, '0');
        
        songHistory.push({
            title: song.title,
            artist: song.artist,
            time: timeString,
            timestamp: time.getTime()
        });
    });
    
    updateSongHistoryDisplay();
    console.log('🎵 Historial inicializado con canciones de ejemplo');
}

// Inicializar mapa
function initializeMap() {
    map = L.map('map', {
        center: CONFIG.mapCenter,
        zoom: CONFIG.mapZoom,
        zoomControl: true,
        attributionControl: false
    });
    
    // Usar un tema claro para el mapa
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© Radio Emisión Cristiana',
        maxZoom: 19
    }).addTo(map);
    
    console.log('🔴 Mapa inicializado para círculos rojos');
    
    // NO cargar GeoJSON - usar directamente círculos rojos
    updateMapMarkers();
}

// Cargar datos GeoJSON de países - DESHABILITADO para usar círculos
async function loadCountriesGeoJSON() {
    console.log('🔴 Modo círculos rojos activado - omitiendo carga de GeoJSON');
    console.log('🔄 Usando visualización con marcadores circulares...');
    
    // NO cargar GeoJSON, usar directamente marcadores circulares
    countriesGeoJSON = null;
    choroplethLayer = null;
    
    // Crear marcadores circulares directamente
    updateMapMarkers();
}

// Método alternativo para cargar GeoJSON local
async function loadLocalGeoJSONFallback() {
    try {
        console.log('🔄 Intentando método alternativo de carga...');
        
        // Usar XMLHttpRequest como alternativa
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './precise_countries.geojson', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        if (data && data.features && data.features.length > 0) {
                            countriesGeoJSON = data;
                            console.log('✅ GeoJSON cargado via XMLHttpRequest:', data.features.length, 'países');
                            
                            // Limpiar marcadores circulares
                            clearCircleMarkers();
                            
                            // Crear mapa de coropletas
                            createChoroplethLayer();
                            return;
                        }
                    } catch (e) {
                        console.error('❌ Error parsing XMLHttpRequest:', e);
                    }
                }
                
                // Si llega aquí, usa el último recurso con geometrías reales básicas
                console.log('🚨 Usando geometrías reales básicas como último recurso...');
                useRealCountriesBasicData();
            }
        };
        xhr.send();
        
    } catch (error) {
        console.error('❌ Error en método alternativo:', error);
        useRealCountriesBasicData();
    }
}

// GeoJSON con formas reales básicas de países (NO rectángulos)
const REAL_COUNTRIES_BASIC_GEOJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "Mexico" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-117.1277, 32.5353], [-109.4558, 23.0198], [-99.4962, 27.5806], [-97.5390, 25.8007], [-93.9469, 18.4278], 
                    [-90.7715, 15.9669], [-87.0647, 15.8871], [-86.8761, 18.1085], [-84.4456, 23.1056], [-87.0183, 21.5433], 
                    [-91.4107, 18.8754], [-96.7092, 15.6347], [-99.0891, 16.0662], [-101.6677, 19.2581], [-103.0017, 20.6667], 
                    [-105.6885, 23.7675], [-111.0465, 25.9422], [-114.7722, 29.0532], [-117.1277, 32.5353]
                ]]
            }
        },
        {
            "type": "Feature", 
            "properties": { "name": "United States of America" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-158.74, 21.30], [-157.24, 20.64], [-155.99, 18.91], [-154.81, 19.51], [-158.74, 21.30], 
                    [-178.22, 51.94], [-130.01, 54.27], [-94.34, 49.39], [-83.16, 41.78], [-74.76, 40.48], 
                    [-67.79, 45.70], [-67.13, 44.47], [-81.33, 24.56], [-97.14, 25.84], [-117.13, 32.53], 
                    [-132.25, 54.37], [-161.75, 68.99], [-158.74, 21.30]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Spain" },
            "geometry": {
                "type": "Polygon", 
                "coordinates": [[
                    [-9.39, 41.80], [-8.98, 42.59], [-6.75, 43.56], [-1.90, 43.40], [0.70, 42.80], [3.03, 42.41], 
                    [3.17, 42.05], [2.98, 39.21], [0.70, 39.89], [-0.31, 39.30], [-0.98, 37.72], [-2.16, 36.67], 
                    [-5.39, 35.95], [-6.24, 36.38], [-7.09, 36.67], [-8.68, 38.78], [-9.39, 41.80]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Argentina" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-73.41, -52.83], [-65.05, -55.20], [-63.77, -54.87], [-58.62, -51.10], [-57.63, -30.22], 
                    [-58.24, -20.83], [-57.87, -16.34], [-61.78, -16.34], [-67.52, -22.87], [-68.29, -24.40], 
                    [-68.59, -26.51], [-68.14, -32.43], [-71.83, -17.78], [-73.41, -52.83]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Colombia" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-81.72, 13.18], [-81.47, 8.90], [-82.22, 5.56], [-82.93, 2.20], [-80.93, 1.05], 
                    [-77.37, -0.40], [-75.37, -0.15], [-70.06, -3.78], [-66.87, 1.25], [-67.52, 3.32], 
                    [-69.81, 11.42], [-71.96, 11.78], [-72.23, 12.67], [-73.38, 15.12], [-81.72, 13.18]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Chile" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-67.29, -55.61], [-68.63, -54.87], [-69.96, -52.55], [-71.00, -52.01], [-73.67, -49.32], 
                    [-75.52, -47.71], [-74.89, -46.89], [-75.62, -45.04], [-74.44, -41.79], [-73.95, -39.80], 
                    [-73.23, -36.44], [-71.92, -33.02], [-71.00, -29.88], [-70.54, -18.35], [-69.46, -17.58], 
                    [-68.95, -18.98], [-68.44, -20.53], [-68.75, -21.62], [-67.29, -55.61]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Peru" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-81.33, -18.35], [-80.47, -16.22], [-79.65, -14.74], [-78.60, -12.88], [-77.03, -12.24], 
                    [-76.37, -9.55], [-75.23, -9.42], [-74.46, -8.04], [-73.98, -7.34], [-72.79, -5.26], 
                    [-70.68, -2.75], [-68.67, -1.61], [-68.67, -0.06], [-70.09, -0.73], [-75.23, -0.15], 
                    [-79.21, -4.96], [-81.33, -18.35]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Venezuela" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-73.38, 15.12], [-71.96, 12.44], [-71.96, 11.78], [-70.67, 11.52], [-69.23, 10.95], 
                    [-67.52, 10.72], [-61.39, 10.73], [-59.80, 8.54], [-60.68, 6.96], [-61.89, 6.68], 
                    [-62.93, 1.83], [-66.87, 1.25], [-67.52, 3.32], [-69.81, 11.42], [-71.96, 11.78], 
                    [-73.38, 15.12]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "United Kingdom" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-13.69, 49.90], [-7.56, 49.77], [-5.66, 50.17], [-2.00, 50.73], [1.77, 50.76], 
                    [1.68, 52.73], [0.17, 53.23], [-3.01, 53.41], [-4.57, 59.48], [-7.99, 57.01], 
                    [-6.24, 55.36], [-4.78, 54.06], [-3.04, 53.41], [-4.64, 51.16], [-5.66, 50.17], 
                    [-13.69, 49.90]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Canada" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-141.00, 60.31], [-139.04, 60.00], [-130.01, 54.27], [-94.34, 49.39], [-83.16, 46.40], 
                    [-74.99, 45.01], [-66.03, 44.78], [-67.79, 47.07], [-61.73, 45.95], [-56.32, 50.25], 
                    [-79.27, 62.16], [-95.16, 69.35], [-123.00, 69.00], [-141.00, 60.31]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "France" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-4.59, 48.68], [-1.83, 47.75], [0.21, 46.23], [3.15, 46.49], [6.18, 47.29], 
                    [8.23, 49.02], [7.09, 49.20], [3.59, 50.38], [2.51, 51.15], [-1.11, 50.77], 
                    [-4.25, 48.99], [-1.83, 43.75], [2.41, 42.56], [7.09, 43.58], [7.72, 44.05], 
                    [6.77, 45.71], [1.21, 45.90], [-2.96, 47.57], [-4.59, 48.68]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Brazil" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-73.98, -7.34], [-70.68, -2.75], [-60.24, -1.57], [-50.50, 1.90], [-44.56, -2.13], 
                    [-37.24, -4.61], [-34.79, -7.34], [-35.51, -9.56], [-37.87, -13.38], [-41.02, -20.50], 
                    [-43.36, -22.98], [-44.65, -23.35], [-48.49, -25.88], [-51.32, -30.22], [-53.37, -33.75], 
                    [-58.62, -30.89], [-57.63, -30.22], [-55.97, -27.95], [-54.49, -24.02], [-57.87, -16.34], 
                    [-60.18, -3.48], [-73.98, -7.34]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Germany" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [5.87, 47.27], [7.53, 47.37], [8.31, 47.69], [10.43, 47.30], [12.52, 47.47], 
                    [15.04, 47.27], [14.98, 50.77], [14.29, 52.99], [14.98, 54.98], [12.24, 54.47], 
                    [9.93, 54.98], [8.65, 54.96], [6.84, 53.35], [7.09, 51.85], [5.87, 51.85], 
                    [6.24, 50.33], [5.87, 47.27]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Italy" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [6.75, 45.83], [7.09, 45.85], [8.54, 46.46], [12.52, 46.75], [13.71, 46.52], 
                    [15.17, 45.77], [18.48, 45.83], [18.48, 40.35], [15.52, 37.44], [14.03, 36.70], 
                    [8.54, 36.70], [7.37, 38.21], [8.54, 40.49], [8.88, 44.36], [7.72, 44.05], 
                    [6.75, 45.83]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Japan" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [129.41, 31.03], [130.68, 33.13], [132.16, 34.37], [135.77, 35.52], [139.69, 35.70], 
                    [142.17, 39.22], [145.54, 43.07], [145.54, 45.55], [142.08, 45.55], [139.75, 41.57], 
                    [138.02, 37.17], [134.60, 34.16], [132.16, 33.90], [130.68, 31.03], [129.41, 31.03]
                ]]
            }
        }
    ]
};

// Función con datos GeoJSON básicos pero reales (NO rectángulos)
function useRealCountriesBasicData() {
    console.log('📊 Creando mapa con formas REALES básicas de países...');
    
    // Limpiar marcadores circulares
    clearCircleMarkers();
    
    // Usar datos GeoJSON con formas reales básicas
    countriesGeoJSON = REAL_COUNTRIES_BASIC_GEOJSON;
    
    console.log('✅ Usando geometrías REALES de países (no rectángulos)');
    console.log('🌍 Países disponibles:', countriesGeoJSON.features.map(f => f.properties.name));
    
    // Crear capa coroplética con formas reales
    createChoroplethLayer();
}

// Limpiar marcadores circulares
function clearCircleMarkers() {
    if (markers && markers.length > 0) {
        markers.forEach(marker => {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        });
        markers = [];
        console.log('🧹 Marcadores circulares eliminados');
    }
}

// Crear capa de coropletas
function createChoroplethLayer() {
    if (!countriesGeoJSON) {
        console.error('❌ No hay datos GeoJSON disponibles');
        return;
    }
    
    console.log('🗺️ Creando capa de coropletas...');
    
    // Eliminar capa anterior si existe
    if (choroplethLayer) {
        map.removeLayer(choroplethLayer);
    }
    
    choroplethLayer = L.geoJSON(countriesGeoJSON, {
        style: function(feature) {
            return getCountryStyle(feature);
        },
        onEachFeature: function(feature, layer) {
            const countryName = feature.properties.name;
            const listenerCount = getListenerCountForCountry(countryName);
            const countryData = getCountryDataByName(countryName);
            
            // Solo agregar etiqueta si hay oyentes
            if (listenerCount > 0) {
                // Obtener el centro del país para colocar la etiqueta
                const bounds = layer.getBounds();
                const center = bounds.getCenter();
                
                // Crear marcador de texto para mostrar el número
                const textMarker = L.marker(center, {
                    icon: L.divIcon({
                        className: 'country-label',
                        html: `<div style="
                            background: rgba(255, 255, 255, 0.9);
                            border: 1px solid #333;
                            border-radius: 4px;
                            padding: 2px 6px;
                            font-size: 12px;
                            font-weight: bold;
                            color: #333;
                            text-align: center;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                        ">${listenerCount}</div>`,
                        iconSize: [30, 20],
                        iconAnchor: [15, 10]
                    })
                }).addTo(map);
                
                // Guardar referencia para poder limpiarla después
                if (!window.countryLabels) window.countryLabels = [];
                window.countryLabels.push(textMarker);
            }
            
            // Popup con información detallada
            layer.bindPopup(`
                <div class="custom-popup">
                    <h4>${countryData ? countryData.flag : '🌍'} ${countryName}</h4>
                    <p><strong>${listenerCount}</strong> oyentes conectados</p>
                    ${listenerCount > 0 ? `<small>País activo en el streaming</small>` : `<small>Sin oyentes registrados</small>`}
                </div>
            `);
            
            // Efectos visuales mejorados
            layer.on({
                mouseover: function(e) {
                    const targetLayer = e.target;
                    targetLayer.setStyle({
                        weight: 3,
                        color: '#ffffff',
                        fillOpacity: 0.9,
                        dashArray: ''
                    });
                    
                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        targetLayer.bringToFront();
                    }
                },
                mouseout: function(e) {
                    choroplethLayer.resetStyle(e.target);
                }
            });
        }
    }).addTo(map);
    
    console.log('✅ Mapa de coropletas creado exitosamente');
}

// Actualizar colores del mapa de coropletas
function updateChoroplethColors() {
    if (!choroplethLayer) return;
    
    // Limpiar etiquetas existentes
    if (window.countryLabels) {
        window.countryLabels.forEach(label => {
            if (map.hasLayer(label)) {
                map.removeLayer(label);
            }
        });
        window.countryLabels = [];
    }
    
    // Actualizar estilos y recrear etiquetas
    choroplethLayer.eachLayer(function(layer) {
        const feature = layer.feature;
        const countryName = feature.properties.name;
        const listenerCount = getListenerCountForCountry(countryName);
        
        // Actualizar estilo del país
        layer.setStyle(getCountryStyle(feature));
        
        // Agregar nueva etiqueta si hay oyentes
        if (listenerCount > 0) {
            const bounds = layer.getBounds();
            const center = bounds.getCenter();
            
            const textMarker = L.marker(center, {
                icon: L.divIcon({
                    className: 'country-label',
                    html: `<div style="
                        background: rgba(255, 255, 255, 0.9);
                        border: 1px solid #333;
                        border-radius: 4px;
                        padding: 2px 6px;
                        font-size: 12px;
                        font-weight: bold;
                        color: #333;
                        text-align: center;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    ">${listenerCount}</div>`,
                    iconSize: [30, 20],
                    iconAnchor: [15, 10]
                })
            }).addTo(map);
            
            if (!window.countryLabels) window.countryLabels = [];
            window.countryLabels.push(textMarker);
        }
    });
}

// Actualizar marcadores en el mapa (círculos rojos para TODOS los países)
function updateMapMarkers() {
    // Limpiar marcadores existentes
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    console.log('🔴 Creando marcadores circulares rojos para TODOS los países...');
    
    // Agregar marcadores ROJOS para TODOS los países (con y sin oyentes)
    Object.entries(listenersData).forEach(([country, data]) => {
        // Determinar tamaño y transparencia según oyentes
        let radius, fillOpacity, weight, popupText;
        
        if (data.count > 0) {
            // Países con oyentes: círculos más grandes y opacos
            radius = Math.min(20, Math.max(5, Math.log(data.count) * 1.5));
            fillOpacity = 0.8;
            weight = 2;
            popupText = `<strong>${data.count}</strong> oyentes conectados`;
        } else {
            // Países sin oyentes: círculos pequeños y semi-transparentes
            radius = 4;
            fillOpacity = 0.4;
            weight = 1;
            popupText = `<em>Sin oyentes registrados</em>`;
        }
        
        const marker = L.circleMarker([data.lat, data.lng], {
            radius: radius,
            fillColor: '#ff4444',        // ROJO para todos los marcadores
            color: '#cc0000',            // Borde rojo más oscuro
            weight: weight,
            opacity: 0.9,
            fillOpacity: fillOpacity
        });
        
        marker.bindPopup(`
            <div class="custom-popup">
                <h4>${data.flag} ${country}</h4>
                <p>${popupText}</p>
                <small>Marcador circular rojo ${data.count > 0 ? '(activo)' : '(inactivo)'}</small>
            </div>
        `);
        
        marker.addTo(map);
        markers.push(marker);
    });
    
    const activeCountries = Object.values(listenersData).filter(data => data.count > 0).length;
    const totalCountries = Object.keys(listenersData).length;
    
    console.log(`✅ ${totalCountries} marcadores rojos creados`);
    console.log(`🔴 ${activeCountries} países activos, ${totalCountries - activeCountries} países inactivos`);
}

// Obtener color según el número de oyentes (escala azul como en la imagen)
function getColorByCount(count) {
    if (count === 0) return '#f0f0f0';     // Gris muy claro para países sin oyentes
    if (count < 5) return '#e1f5fe';       // Azul muy claro
    if (count < 15) return '#b3e5fc';      // Azul claro
    if (count < 30) return '#81d4fa';      // Azul medio claro
    if (count < 50) return '#4fc3f7';      // Azul medio
    if (count < 75) return '#29b6f6';      // Azul
    if (count < 100) return '#03a9f4';     // Azul fuerte
    if (count < 150) return '#0288d1';     // Azul intenso
    return '#0277bd';                      // Azul oscuro para valores más altos
}

// Obtener estilo para un país en el mapa de coropletas
function getCountryStyle(feature) {
    const countryName = feature.properties.name;
    const listenerCount = getListenerCountForCountry(countryName);
    
    return {
        fillColor: getColorByCount(listenerCount),
        weight: listenerCount > 0 ? 2 : 1,        // Fronteras más gruesas para países con oyentes
        opacity: 1,                               // Fronteras completamente opacas
        color: listenerCount > 0 ? '#ffffff' : '#cccccc',  // Fronteras blancas para países activos, grises para inactivos
        fillOpacity: listenerCount > 0 ? 0.8 : 0.2,        // Relleno más opaco para países activos
        dashArray: listenerCount > 0 ? null : '3, 3'       // Líneas punteadas para países sin oyentes
    };
}

// Obtener número de oyentes para un país específico
function getListenerCountForCountry(countryName) {
    // Mapeo de nombres de países entre GeoJSON y datos de oyentes
    const countryMapping = {
        'United States of America': 'Estados Unidos',
        'United States': 'Estados Unidos',
        'Mexico': 'México',
        'Spain': 'España',
        'Argentina': 'Argentina',
        'Colombia': 'Colombia',
        'Chile': 'Chile',
        'Peru': 'Perú',
        'Venezuela': 'Venezuela',
        'United Kingdom': 'Reino Unido',
        'Canada': 'Canadá',
        'France': 'Francia',
        'Brazil': 'Brasil',
        'Germany': 'Alemania',
        'Italy': 'Italia',
        'Japan': 'Japón'
    };
    
    // Buscar en el mapeo primero
    const mappedName = countryMapping[countryName];
    if (mappedName && listenersData[mappedName]) {
        return listenersData[mappedName].count;
    }
    
    // Buscar directamente en los datos
    if (listenersData[countryName]) {
        return listenersData[countryName].count;
    }
    
    return 0; // No hay oyentes registrados para este país
}

// Obtener datos completos de un país por nombre
function getCountryDataByName(countryName) {
    const countryMapping = {
        'United States of America': 'Estados Unidos',
        'United States': 'Estados Unidos',
        'Mexico': 'México',
        'Spain': 'España',
        'Argentina': 'Argentina',
        'Colombia': 'Colombia',
        'Chile': 'Chile',
        'Peru': 'Perú',
        'Venezuela': 'Venezuela',
        'United Kingdom': 'Reino Unido',
        'Canada': 'Canadá',
        'France': 'Francia',
        'Brazil': 'Brasil',
        'Germany': 'Alemania',
        'Italy': 'Italia',
        'Japan': 'Japón'
    };
    
    const mappedName = countryMapping[countryName];
    if (mappedName && listenersData[mappedName]) {
        return listenersData[mappedName];
    }
    
    if (listenersData[countryName]) {
        return listenersData[countryName];
    }
    
    return null;
}

// Función unificada para actualizar la visualización del mapa
function updateMapVisualization() {
    // FORZAR uso de marcadores circulares rojos
    console.log('🔴 Actualizando visualización con círculos rojos...');
    updateMapMarkers();
}

// Inicializar gráfico de actividad
function initializeChart() {
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    // Generar datos iniciales (últimas 24 horas)
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - (i * 60 * 60 * 1000));
        activityData.labels.push(hour.getHours().toString().padStart(2, '0') + ':00');
        activityData.data.push(Math.floor(Math.random() * 200) + 50);
    }
    
    activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: activityData.labels,
            datasets: [{
                label: 'Oyentes',
                data: activityData.data,
                borderColor: '#0066cc',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

// Actualizar estadísticas principales
function updateStatistics() {
    // Usar datos reales cuando estén disponibles
    const totalListeners = radioData.listeners || Object.values(listenersData).reduce((sum, country) => sum + country.count, 0);
    
    // Simular variaciones en los datos de ubicación
    simulateDataChanges();
    
    // Contar TODOS los países (con y sin oyentes)
    const totalCountries = Object.keys(listenersData).length;
    const activeCountries = Object.values(listenersData).filter(country => country.count > 0).length;
    const peakToday = radioData.peakToday || Math.max(...Object.values(listenersData).map(country => country.count)) + Math.floor(Math.random() * 50);
    const avgSession = Math.floor(Math.random() * 30) + 15; // Entre 15-45 minutos
    
    // Actualizar contadores con animación
    animateCounter('total-listeners', totalListeners);
    animateCounter('total-countries', totalCountries); // Muestra TODOS los países
    animateCounter('peak-today', peakToday);
    document.getElementById('avg-session').textContent = `${avgSession} min`;
    
    console.log(`📊 Estadísticas: ${totalListeners} oyentes, ${totalCountries} países total (${activeCountries} activos)`);
}

// Simular cambios en los datos de ubicación
function simulateDataChanges() {
    // Ajustar distribución basada en oyentes totales reales
    const totalReal = radioData.listeners || 100;
    const scaleFactor = totalReal / 100;
    
    Object.keys(listenersData).forEach(country => {
        const baseCount = Math.floor(listenersData[country].count * scaleFactor);
        const change = Math.floor(Math.random() * 6) - 3; // Cambio entre -3 y +3
        listenersData[country].count = Math.max(0, baseCount + change);
    });
}

// Animar contadores
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    const increment = (targetValue - currentValue) / 20;
    let current = currentValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

// Actualizar ranking de países
function updateCountriesRanking() {
    // Ordenar todos los países: primero los que tienen oyentes, luego los que no
    const countriesWithListeners = Object.entries(listenersData)
        .filter(([country, data]) => data.count > 0)
        .sort(([,a], [,b]) => b.count - a.count);
    
    const countriesWithoutListeners = Object.entries(listenersData)
        .filter(([country, data]) => data.count === 0)
        .sort(([a], [b]) => a.localeCompare(b)) // Orden alfabético
        .slice(0, 4); // Solo mostrar 4 países sin oyentes para no saturar
    
    // Combinar: top países con oyentes + algunos países sin oyentes
    const topCountries = countriesWithListeners.slice(0, 6);
    const allToShow = [...topCountries, ...countriesWithoutListeners];
    
    const rankingHTML = allToShow.map(([country, data]) => {
        const hasListeners = data.count > 0;
        return `
            <div class="country-item" style="opacity: ${hasListeners ? '1' : '0.6'};">
                <div class="country-info">
                    <span class="country-flag">${data.flag}</span>
                    <span class="country-name">${country}</span>
                </div>
                <span class="listener-count" style="color: ${hasListeners ? 'inherit' : '#999'};">
                    ${hasListeners ? data.count : '0'}
                </span>
            </div>
        `;
    }).join('');
    
    document.getElementById('countries-ranking').innerHTML = rankingHTML;
}

// Actualizar gráfico de actividad
function updateChart() {
    // Agregar nuevo punto y remover el más antiguo
    const newValue = Math.floor(Math.random() * 200) + 50;
    const now = new Date();
    const newLabel = now.getHours().toString().padStart(2, '0') + ':' + 
                    now.getMinutes().toString().padStart(2, '0');
    
    activityData.labels.push(newLabel);
    activityData.data.push(newValue);
    
    if (activityData.labels.length > 24) {
        activityData.labels.shift();
        activityData.data.shift();
    }
    
    activityChart.update('none');
}

// Función de respaldo para "ahora sonando"
function updateNowPlaying() {
    if (!isConnected && !simulationTimer) {
        checkAndStartSimulation();
    }
}

// Actualizar última actualización
function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('last-update').textContent = timeString;
}

// Actualizar datos periódicamente
setInterval(() => {
    updateCountriesRanking();
}, CONFIG.updateInterval);

// Limpiar conexiones al cerrar la página
window.addEventListener('beforeunload', function() {
    if (eventSource) {
        eventSource.close();
    }
    if (simulationTimer) {
        clearInterval(simulationTimer);
    }
});

// Detectar cambios de visibilidad para reconectar si es necesario
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && !isConnected) {
        console.log('🔄 Página visible, reconectando...');
        connectToZenoFM();
    }
});

// Agregar efectos de hover y interactividad
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de parallax sutil en las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
