// Construccions Rasquera - Funcions de JavaScript

// Configuració de contacte
const CONTACT_INFO = {
    phone: '676165524',
    email: 'construccionsrasquera@gmail.com',
    whatsapp: '676165524',
    facebook: 'https://www.facebook.com/profile.php?id=100005154678418',
    address: "Ulldecona, Terres de l'Ebre"
};

// Funcions per a xarxes socials i contacte
function callPhone() {
    window.open(`tel:+34${CONTACT_INFO.phone}`, '_self');
}

function sendEmail() {
    window.open(`mailto:${CONTACT_INFO.email}?subject=Consulta des del web&body=Hola, m'agradaria sol·licitar informació sobre els seus serveis.`, '_blank');
}

function openWhatsApp() {
    const message = encodeURIComponent("Hola! M'agradaria sol·licitar informació sobre els seus serveis de construcció.");
    window.open(`https://wa.me/34${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
}

function openFacebook() {
    window.open(CONTACT_INFO.facebook, '_blank');
}

// Funció per al botó de pressupost
function solicitarPresupuesto() {
    const emailSubject = encodeURIComponent('Sol·licitud de pressupost des del web');
    const emailBody = encodeURIComponent('Hola! Voldria demanar un pressupost sense compromís.');
    window.open(`mailto:${CONTACT_INFO.email}?subject=${emailSubject}&body=${emailBody}`, '_self');
}

// Funció per enviar el formulari de contacte
function enviarFormulario(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const servicio = formData.get('servicio');
    const mensaje = formData.get('mensaje');

    // Validació bàsica
    if (!nombre || !email || !mensaje) {
        alert("Si us plau, omple tots els camps obligatoris.");
        return;
    }

    // Crear missatge per a correu electrònic
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

    // Obrir el client de correu electrònic
    window.open(`mailto:${CONTACT_INFO.email}?subject=${emailSubject}&body=${emailBody}`, '_self');

    // Mostrar missatge de confirmació
    alert("Gràcies per la teva consulta! S'ha obert el teu client de correu electrònic.");
    form.reset();
}

// Funció per al desplaçament suau (smooth scroll)
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animacions en fer desplaçament (scroll)
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

// Alternar menú mòbil
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.menu-toggle');

    if (menu && toggle) {
        menu.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
    }
}

// Tancar el menú mòbil en fer clic a fora
document.addEventListener('click', function (event) {
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

// Efecte parallax suau per a la secció principal (hero)
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

// Inicialització unificada quan es carrega la pàgina
document.addEventListener('DOMContentLoaded', function () {
    // 1. Afegir escoltadors d'esdeveniments a les icones de xarxes socials i contacte
    document.querySelectorAll('.fa-square-phone').forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', callPhone);
    });

    document.querySelectorAll('.fa-at').forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', sendEmail);
    });

    document.querySelectorAll('.fa-square-whatsapp').forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', openWhatsApp);
    });

    document.querySelectorAll('.fa-square-facebook').forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', openFacebook);
    });

    // 2. Funcionalitat al botó de pressupost
    const presupuestoBtn = document.querySelector('.demana_pressupost button');
    if (presupuestoBtn) {
        presupuestoBtn.addEventListener('click', solicitarPresupuesto);
    }

    // 3. Inicialitzar animacions i parallax
    animateOnScroll();
    initParallax();

    // 4. Desplaçament suau i tancament automàtic del menú mòbil als enllaços de navegació
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href.substring(1));

                const menu = document.querySelector('.nav-menu');
                const toggle = document.querySelector('.menu-toggle');
                if (menu && toggle && menu.classList.contains('mobile-open')) {
                    menu.classList.remove('mobile-open');
                    toggle.classList.remove('active');
                }
            }
        });
    });

    // 5. Inicialitzar el formulari de contacte si existeix
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarFormulario);
    }
});

// Funció per mostrar més informació dels serveis
function mostrarMasInfo(servicio) {
    const info = {
        'obra-nova': "Construcció d'habitatges unifamiliars, locals comercials i edificis. Projectes clau en mà amb els millors materials.",
        'reformes': "Reformes integrals i parcials. Cuines, banys, distribució d'espais, millora de l'eficiència energètica.",
        'restauracions': "Especialistes en rehabilitació d'edificis antics, estructures històriques i millora de la seguretat.",
        'microciment': "Aplicació de microciment en terres, parets i sostres. Acabats moderns i duradors.",
        'lloguer': "Lloguer de maquinària especialitzada per a la construcció. Equips professionals i manteniment inclòs.",
        'projectes': "Projectes personalitzats des de la planificació fins a l'entrega. Assessorament tècnic complet."
    };

    alert(info[servicio] || 'Informació no disponible');
}