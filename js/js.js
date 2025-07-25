// Construccions Rasquera - JavaScript Functions

// Configuración de contacto
const CONTACT_INFO = {
    phone: '676165524',
    email: 'construccionsrasquera@gmail.com',
    whatsapp: '676165524',
    facebook: 'https://www.facebook.com/profile.php?id=100005154678418',
    address: 'Ulldecona, Terres de l\'Ebre'
};

// Funciones para redes sociales y contacto
function callPhone() {
    window.open(`tel:+34${CONTACT_INFO.phone}`, '_self');
}

function sendEmail() {
    window.open(`mailto:${CONTACT_INFO.email}?subject=Consulta desde la web&body=Hola, me gustaría solicitar información sobre sus servicios.`, '_blank');
}

function openWhatsApp() {
    const message = encodeURIComponent('Hola! Me gustaría solicitar información sobre sus servicios de construcción.');
    window.open(`https://wa.me/34${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
}

function openFacebook() {
    window.open(CONTACT_INFO.facebook, '_blank');
}

// Función para el botón de presupuesto
function solicitarPresupuesto() {
    const message = encodeURIComponent('Hola! Me gustaría solicitar un presupuesto sin compromiso.');
    window.open(`https://wa.me/34${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
}

// Función para enviar formulario de contacto
function enviarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const servicio = formData.get('servicio');
    const mensaje = formData.get('mensaje');
    
    // Validación básica
    if (!nombre || !email || !mensaje) {
        alert('Si us plau, omple tots els camps obligatoris.');
        return;
    }
    
    // Crear mensaje para email
    const emailSubject = encodeURIComponent(`Nova consulta des del web - ${servicio}`);
    const emailBody = encodeURIComponent(`
Hola,

He rebut una nova consulta des del vostre lloc web:

Nom: ${nombre}
Email: ${email}
Telèfon: ${telefono || 'No proporcionat'}
Servei d'interès: ${servicio}

Missatge:
${mensaje}

Salutacions,
${nombre}
    `.trim());
    
    // Abrir cliente de email
    window.open(`mailto:${CONTACT_INFO.email}?subject=${emailSubject}&body=${emailBody}`, '_self');
    
    // Mostrar mensaje de confirmación
    alert('Gràcies per la teva consulta! S\'ha obert el teu client de correu electrònic.');
    form.reset();
}

// Función para smooth scroll
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animaciones al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.servei-item, .obres, .reformes, .restauracions_rehabilitacions, .microciment, .lloguerMaquinaria, .projectesMida');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Menu móvil toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.menu-toggle');
    
    if (menu && toggle) {
        menu.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
        
        // Cerrar menú cuando se hace clic en un enlace
        if (menu.classList.contains('mobile-open')) {
            const links = menu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('mobile-open');
                    toggle.classList.remove('active');
                }, { once: true });
            });
        }
    }
}

// Cerrar menú móvil al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.menu-toggle');
    const divMenu = document.querySelector('.divMenu');
    
    if (menu && toggle && menu.classList.contains('mobile-open')) {
        if (!divMenu.contains(event.target)) {
            menu.classList.remove('mobile-open');
            toggle.classList.remove('active');
        }
    }
});

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Añadir event listeners a los iconos de redes sociales
    const phoneIcons = document.querySelectorAll('.fa-square-phone');
    const emailIcons = document.querySelectorAll('.fa-at');
    const whatsappIcons = document.querySelectorAll('.fa-square-whatsapp');
    const facebookIcons = document.querySelectorAll('.fa-square-facebook');
    
    phoneIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', callPhone);
    });
    
    emailIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', sendEmail);
    });
    
    whatsappIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', openWhatsApp);
    });
    
    facebookIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', openFacebook);
    });
    
    // Añadir funcionalidad al botón de presupuesto
    const presupuestoBtn = document.querySelector('.demana_pressupost button');
    if (presupuestoBtn) {
        presupuestoBtn.addEventListener('click', solicitarPresupuesto);
    }
    
    // Inicializar animaciones
    animateOnScroll();
    
    // Añadir smooth scroll a los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href.substring(1));
                
                // Cerrar menú móvil después de hacer clic en un enlace
                const menu = document.querySelector('.nav-menu');
                const toggle = document.querySelector('.menu-toggle');
                if (menu && toggle && menu.classList.contains('mobile-open')) {
                    menu.classList.remove('mobile-open');
                    toggle.classList.remove('active');
                }
            }
        });
    });
    
    // Inicializar formulario de contacto si existe
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarFormulario);
    }
});

// Función para mostrar más información de servicios
function mostrarMasInfo(servicio) {
    const info = {
        'obra-nova': 'Construcción de viviendas unifamiliares, locales comerciales y edificios. Proyectos llave en mano con los mejores materiales.',
        'reformes': 'Reformas integrales y parciales. Cocinas, baños, distribución de espacios, mejora de eficiencia energética.',
        'restauracions': 'Especialistas en rehabilitación de edificios antiguos, estructuras históricas y mejora de seguridad.',
        'microciment': 'Aplicación de microcemento en suelos, paredes y techos. Acabados modernos y duraderos.',
        'lloguer': 'Alquiler de maquinaria especializada para construcción. Equipos profesionales y mantenimiento incluido.',
        'projectes': 'Proyectos personalizados desde la planificación hasta la entrega. Asesoramiento técnico completo.'
    };
    
    alert(info[servicio] || 'Información no disponible');
}

// Efecto parallax suave para el hero
function initParallax() {
    const hero = document.querySelector('.divSlogan img');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Llamar a initParallax después de cargar la página
document.addEventListener('DOMContentLoaded', initParallax);