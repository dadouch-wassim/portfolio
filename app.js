// Gestion du mode jour/nuit
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    const icon = dayNight.querySelector('i');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Appliquer le thème sauvegardé au chargement
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = dayNight.querySelector('i');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        icon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark');
        icon.classList.add('fa-moon');
    }
}

// Animation de texte
const initTyped = () => {
    new Typed('.typing', {
        strings: ["étudiant en Informatique", "être humain", "passionné de développement Web"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
};

// Gestion de la navigation
const setupNavigation = () => {
    const nav = document.querySelector('.nav');
    const navItems = nav.querySelectorAll('li');
    const sections = document.querySelectorAll('.section');

    function showSection(element) {
        sections.forEach(section => section.classList.remove('active'));
        const target = element.getAttribute('href').split('#')[1];
        document.querySelector(`#${target}`).classList.add('active');
    }

    navItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens
            navItems.forEach(navItem => {
                navItem.querySelector('a').classList.remove('active');
            });
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            showSection(this);
            
            if (window.innerWidth < 1200) {
                toggleAside();
            }
        });
    });

    // Activer la section selon l'URL au chargement
    if (window.location.hash) {
        const targetLink = document.querySelector(`.nav a[href="${window.location.hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
};

// Menu mobile
const setupMobileMenu = () => {
    const navToggler = document.querySelector('.nav-toggler');
    const aside = document.querySelector('.aside');

    function toggleAside() {
        aside.classList.toggle('open');
        navToggler.classList.toggle('open');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('open');
        });
    }

    navToggler.addEventListener('click', toggleAside);
};

// Compétences interactives
const setupCompetences = () => {
    const competenceItems = document.querySelectorAll('.competence-item-inner');

    competenceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Ne pas traiter le clic si c'est sur le bouton DELE
            if (e.target.closest('.btn-diplome')) {
                return;
            }

            const details = this.querySelector('.competence-details');
            const wasActive = details.classList.contains('active');

            // Fermer toutes les autres cartes
            document.querySelectorAll('.competence-details').forEach(d => {
                d.classList.remove('active');
            });

            // Ouvrir la carte cliquée si elle était fermée
            if (!wasActive) {
                details.classList.add('active');
            }
        });
    });
};

// Gestion du diplôme DELE
const setupDiplome = () => {
    const diplomeCard = document.getElementById('diplome-cervantes');
    const diplomeBtn = document.querySelector('.btn-diplome');

    function toggleDiplome(e) {
        e.preventDefault();
        e.stopPropagation();
        diplomeCard.style.display = diplomeCard.style.display === 'block' ? 'none' : 'block';
        
        // Fermer automatiquement après 5 secondes
        if (diplomeCard.style.display === 'block') {
            setTimeout(() => {
                diplomeCard.style.display = 'none';
            }, 5000);
        }
    }

    if (diplomeBtn) {
        diplomeBtn.addEventListener('click', toggleDiplome);
    }

    // Fermer en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-diplome') && !e.target.closest('#diplome-cervantes') && diplomeCard) {
            diplomeCard.style.display = 'none';
        }
    });
};

// Ajustement de l'image d'accueil
const adjustHomeImage = () => {
    const homeImgContainer = document.querySelector('.home-img .img-container');
    if (homeImgContainer) {
        homeImgContainer.style.display = 'flex';
        homeImgContainer.style.alignItems = 'center';
        homeImgContainer.style.justifyContent = 'center';
        homeImgContainer.style.height = '100%';
        homeImgContainer.style.width = '100%';
        
        const img = homeImgContainer.querySelector('img');
        if (img) {
            img.style.maxHeight = '100%';
            img.style.maxWidth = '100%';
            img.style.objectFit = 'contain';
        }
    }
};

// Ajustement des images de projets
const adjustProjectImages = () => {
    const projetImgContainers = document.querySelectorAll('.projet-img-container');
    
    projetImgContainers.forEach(container => {
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.height = '200px'; // Hauteur fixe pour toutes les images
        container.style.overflow = 'hidden';
        
        const img = container.querySelector('img');
        if (img) {
            img.style.width = 'auto';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
        }
    });
};

// Animation des cartes projets
const setupProjetCards = () => {
    const projetItems = document.querySelectorAll('.projet-item');

    projetItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const inner = item.querySelector('.projet-item-inner');
            if (inner) inner.style.transform = 'rotateY(180deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            const inner = item.querySelector('.projet-item-inner');
            if (inner) inner.style.transform = 'rotateY(0deg)';
        });
    });
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    initTyped();
    setupNavigation();
    setupMobileMenu();
    setupCompetences();
    setupDiplome();
    adjustHomeImage();
    adjustProjectImages();
    setupProjetCards();
});
