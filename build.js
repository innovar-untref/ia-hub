const fs = require('fs');
const path = require('path');

console.log('Iniciando proceso de Build para IA HUB...');

const contentDir = path.join(__dirname, 'content');
const publicContentDir = path.join(__dirname, 'public', 'content');

// 1. Copiar todo el contenido de 'content' a 'public/content'
// Esto permite que Vercel sirva los archivos JSON y MD localmente sin usar la API de GitHub
if (fs.existsSync(contentDir)) {
    fs.cpSync(contentDir, publicContentDir, { recursive: true });
    console.log('✅ Carpeta content copiada a public/content');
} else {
    console.log('⚠️ No se encontró la carpeta content');
}

// 2. Generar el índice de proyectos para evitar el límite de peticiones de la API de GitHub
const proyectosDir = path.join(publicContentDir, 'proyectos');
const proyectosIndex = [];

if (fs.existsSync(proyectosDir)) {
    const files = fs.readdirSync(proyectosDir);
    files.forEach(file => {
        if (file.endsWith('.md')) {
            proyectosIndex.push({ name: file });
        }
    });
    
    fs.writeFileSync(
        path.join(publicContentDir, 'proyectos_index.json'), 
        JSON.stringify(proyectosIndex)
    );
    console.log(`✅ Índice de proyectos generado con ${proyectosIndex.length} proyectos.`);
} else {
    console.log('⚠️ No se encontró la carpeta de proyectos');
}

console.log('Build completado con éxito. El sitio es ahora 100% estático e inmune a los límites de API.');
