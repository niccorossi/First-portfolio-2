// ===== PORTAFOGLIO WEB DEVELOPER - SCRIPT PRINCIPALE =====
// Tutti i commenti sono in italiano per facilitare la personalizzazione

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INIZIALIZZAZIONE PARTICLES.JS =====
    // Configura le particelle animate nello sfondo
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    }
                },
                color: { 
                    value: "#60a5fa" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.5, 
                    random: true 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#93c5fd",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // ===== NAVIGATION SCROLL EFFECT =====
    // Aggiunge effetto alla navbar quando si scorre
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ===== ANIMAZIONE NUMERI CHE AUMENTANO =====
    // Fa aumentare i numeri nelle statistiche quando diventano visibili
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function checkStatsVisibility() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
            
            if (isVisible && stat.textContent === '0') {
                const target = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            }
        });
    }

    // ===== ANIMAZIONE BARRE COMPETENZE =====
    // Animazione delle barre delle skills quando diventano visibili
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgresses.forEach(skill => {
            const rect = skill.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
            
            if (isVisible && skill.style.width === '0px') {
                const width = skill.getAttribute('data-width') + '%';
                skill.style.width = width;
            }
        });
    }

    // ===== OBSERVER PER ANIMAZIONI AL SCROLL =====
    // Rileva quando gli elementi entrano nella viewport e attiva le animazioni
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Controlla se è la sezione stats per animare i numeri
                if (entry.target.id === 'stats') {
                    checkStatsVisibility();
                }
                
                // Controlla se è la sezione about per animare le skills
                if (entry.target.id === 'about') {
                    animateSkills();
                }
            }
        });
    }, observerOptions);

    // Osserva tutti gli elementi che devono animarsi
    const elementsToObserve = document.querySelectorAll('.timeline-item, .about-text, .about-visual, #stats, #about');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });

    // ===== GESTIONE FORM DI CONTATTO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Qui puoi aggiungere la logica per inviare il form
            // Per ora mostriamo un alert di conferma
            alert('Grazie per il tuo messaggio! Ti ricontatterò al più presto.');
            contactForm.reset();
            
            // Animazione di conferma
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Messaggio Inviato!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // ===== ANIMAZIONE CARDS PROGETTI PER MOBILE =====
    // Su mobile, le cards si girano al tap invece che al hover
    if (window.innerWidth <= 768) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                this.querySelector('.card-inner').classList.toggle('flipped');
            });
        });
    }

    // ===== SMOOTH SCROLL PER LINK INTERNI =====
    // Animazione fluida per la navigazione tra sezioni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== EFFETTO PARALLAX =====
    // Aggiunge un effetto parallax leggero allo scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== ANIMAZIONE TITOLO HERO =====
    // Aggiunge un effetto di typing al titolo principale (opzionale)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Attiva l'effetto typing (decommenta se lo vuoi usare)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 100);
    // }

    // ===== PRELOADER (OPZIONALE) =====
    // Mostra un preloader durante il caricamento (decommenta se lo vuoi)
    /*
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    */

    // ===== CONTATORE VISITE (ESEMPIO) =====
    // Esempio di contatore visite - puoi integrarlo con un backend
    let visitCount = localStorage.getItem('portfolioVisits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('portfolioVisits', visitCount);
    
    console.log(`Visite al portfolio: ${visitCount}`);

    // ===== GESTIONE ERRORI =====
    // Gestisce gli errori in modo elegante
    window.addEventListener('error', function(e) {
        console.error('Errore JavaScript:', e.error);
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Ottimizza le performance su scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                // Le animazioni pesanti vanno qui
            }, 100);
        }
    });

});

// ===== FUNZIONI AGGIUNTIVE UTILI =====

// Funzione per il tema chiaro/scuro (opzionale)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    // Salva la preferenza nel localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
}

// Carica il tema salvato all'avvio
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

// Inizializza il tema al caricamento
loadSavedTheme();

// Funzione per il download del CV (esempio)
function downloadCV() {
    // Simula il download di un file
    const link = document.createElement('a');
    link.href = '/cv-marco-rossi.pdf'; // Inserisci il percorso corretto
    link.download = 'CV_Marco_Rossi.pdf';
    link.click();
}

// Funzione per copiare email negli appunti
function copyEmail() {
    const email = 'marco.rossi@email.com';
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiata negli appunti!');
    });
}

// ===== ANIMAZIONI AVANZATE =====

// Effetto di scintillio per elementi specifici
function addSparkleEffect(element) {
    element.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
}

// Applica l'effetto scintillio ai bottoni principali
document.querySelectorAll('.btn-primary').forEach(btn => {
    addSparkleEffect(btn);
});

// Effetto di tilt per le cards
function initTiltEffect() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Attiva l'effetto tilt (decommenta se lo vuoi)
// initTiltEffect();

console.log('Portfolio Web Developer - Script caricato correttamente!');