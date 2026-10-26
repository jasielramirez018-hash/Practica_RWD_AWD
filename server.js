const path = require('node:path');
const express = require('express');

const products = [
    {
        name: 'Acer Nitro 5 i5 RTX',
        category: 'laptops',
        price: 12000,
        description: 'Intel Core i5, RTX 3050 - 16GB RAM',
        image: '/images/acer-nitro-5-i5-rtx.png',
        mobileImage: '/images/mobile/acer-nitro-5-i5-rtx.jpg',
        alt: 'Laptop gamer Acer Nitro 5 con gráficos NVIDIA GeForce RTX'
    },
    {
        name: 'Realme GT3 240W',
        category: 'smartphones',
        price: 16000,
        description: 'Pantalla AMOLED 144Hz, Carga Ultra Rápida',
        image: '/images/realme-gt3-240w.png',
        mobileImage: '/images/mobile/realme-gt3-240w.jpg',
        alt: 'Realme GT3 240W en colores blanco y negro'
    },
    {
        name: 'Pc Gamer Ryzen 5600g 32gb Ram 1tb Ssd',
        category: 'laptops',
        price: 25000,
        description: 'Procesador Ryzen 5600G, 32GB de RAM y SSD de 1TB',
        image: '/images/pc-gamer-ryzen-5600g.png',
        mobileImage: '/images/mobile/pc-gamer-ryzen-5600g.jpg',
        alt: 'PC Gamer con gabinete negro e iluminación RGB, teclado y ratón'
    },
    {
        name: 'Smartphone 5G Edition',
        category: 'smartphones',
        price: 14000,
        description: 'Cámara Dual 64MP, Batería 5000 mAh',
        image: '/images/smartphone-5g-edition.png',
        mobileImage: '/images/mobile/smartphone-5g-edition.jpg',
        alt: 'Smartphone 5G Edition blanco con cámara de 50 megapíxeles'
    },
    {
        name: 'Intel Xeon Scalable',
        category: 'components',
        price: 22000,
        description: '32 Núcleos dedicados para alto rendimiento',
        image: '/images/intel-xeon-scalable.png',
        mobileImage: '/images/mobile/intel-xeon-scalable.jpg',
        alt: 'Procesador Intel Xeon Scalable'
    },
    {
        name: 'Kingston Fury Beast Black 64GB Kit',
        category: 'components',
        price: 12000,
        description: 'Memoria con corrección de errores 3200MHz',
        image: '/images/kingston-fury-beast-64gb.png',
        mobileImage: '/images/mobile/kingston-fury-beast-64gb.jpg',
        alt: 'Memoria Kingston Fury Beast Black DDR4'
    },
    {
        name: 'SSD M.2 NVMe 2TB U.2',
        category: 'components',
        price: 15000,
        description: 'Alta velocidad de lectura para bases de datos',
        image: '/images/ssd-nvme-2tb.png',
        mobileImage: '/images/mobile/ssd-nvme-2tb.jpg',
        alt: 'Unidad SSD M.2 NVMe de 2 TB'
    },
    {
        name: 'NVIDIA A100 Tensor',
        category: 'components',
        price: 30000,
        description: 'Tarjeta dedicada para Inteligencia Artificial',
        image: '/images/nvidia-a100.png',
        mobileImage: '/images/mobile/nvidia-a100.jpg',
        alt: 'Tarjeta aceleradora NVIDIA A100'
    },
    {
        name: 'Ultrabook 14" Business',
        category: 'laptops',
        price: 28000,
        description: 'Diseño ligero de aluminio, Core i7',
        image: '/images/ultrabook-business.png',
        mobileImage: '/images/mobile/ultrabook-business.jpg',
        alt: 'Ultrabook 14 pulgadas Business de color rosa'
    },
    {
        name: 'Tablet Pro 5G',
        category: 'tablets',
        price: 16000,
        description: 'Pantalla táctil de alta resolución con conexión 5G',
        image: '/images/tablet-pro-5g.png',
        mobileImage: '/images/mobile/tablet-pro-5g.jpg',
        alt: 'Tablet Pro 5G colocada en un soporte'
    },
    {
        name: 'Fuente Redundante 1600W',
        category: 'components',
        price: 18000,
        description: 'Certificación 80 Plus Platinum industrial',
        image: '/images/fuente-redundante-1600w.png',
        mobileImage: '/images/mobile/fuente-redundante-1600w.jpg',
        alt: 'Fuente redundante de poder para servidor con ventiladores dobles'
    },
    {
        name: 'Tarjeta de Red 10GbE SFP+',
        category: 'components',
        price: 13000,
        description: 'Doble puerto de fibra óptica para servidores',
        image: '/images/tarjeta-red-10gbe-sfp.png',
        mobileImage: '/images/mobile/tarjeta-red-10gbe-sfp.jpg',
        alt: 'Tarjeta de red de servidor 10GbE con puertos SFP'
    }
];

const app = express();
const publicDirectory = path.join(__dirname, 'public');

// Corrección de la ruta de las vistas para que apunte localmente a la carpeta views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function detectMobileDevice(request, response, next) {
    const userAgent = request.get('user-agent') || '';
    response.vary('User-Agent');
    response.locals.isMobile = /android|iphone|ipod|mobile|windows phone/i.test(userAgent);
    next();
}

app.get('/', (request, response) => {
    response.redirect('/responsive');
});

app.get('/responsive', (request, response) => {
    // Renderiza la versión desktop o una vista responsiva unificada usando EJS
    response.render('desktop', { products, isMobile: false });
});

app.get('/adaptive', detectMobileDevice, (request, response) => {
    const template = response.locals.isMobile ? 'mobile' : 'desktop';
    response.render(template, { products, isMobile: response.locals.isMobile });
});

app.get('/styles.css', (request, response) => {
    response.sendFile(path.join(publicDirectory, 'styles.css'));
});

app.get('/script.js', (request, response) => {
    response.sendFile(path.join(publicDirectory, 'script.js'));
});

app.use('/images', express.static(path.join(publicDirectory, 'images'), { index: false }));

if (require.main === module) {
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
        console.log(`Catálogo disponible en http://localhost:${port}`);
    });
}

module.exports = app;