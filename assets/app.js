
/* L'objet mobileMenu regroupe toutes les fonctionnalités liées au menu pour 
   mobile*/
const mobileMenu = {
    mobileMenuBtn: document.querySelector('#mobile-btn-mobile'),
    closeIcon: `<svg class="hide" width="14" height="15" 
                xmlns="http://www.w3.org/2000/svg">
                <g fill="#FFF" fill-rule="evenodd">
                <path d="M2.404.782l11.314 11.314-2.122 2.122L.282 2.904z"/>
                <path d="M.282 12.096L11.596.782l2.122 2.122L2.404 14.218z"/>
                </g></svg>`,
    openIcon: `<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
               <g fill="#FFF" fill-rule="evenodd">
               <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"/></g></svg>`,
    menuMobile: document.querySelector('.header__mobile-links'),
    overlay: document.querySelector('.overlay'),
    body: document.querySelector('body'),

    /**
     * Affiche une icone indiquant l'état du menu mobile (ouvert ou fermé)
     * @param {String} state indique l'état du menu (open ou close)
     */
    changeIcon(state) {
        let a = (a, b) => {
            this.mobileMenuBtn.innerHTML = a;
            this.mobileMenuBtn.setAttribute('data-mobile-menu-state', b);
        }

        if (('open').localeCompare(state) === 0) {
            a(this.closeIcon, 'open');
        } else {
            if (('close').localeCompare(state) === 0) {
                a(this.openIcon, 'close');
            }
        }
    },

    /**
     * Ajoute une animation en fonction de l'état state lorsque
     * le menu change d'état.
     * @param {String} state indique l'état du menu (open ou close)
     */
    menuAnimation(state) {
        if (("close").localeCompare(state) === 0) {
            this.menuMobile.classList
                .add(
                    'animate__animated',
                    'animate__faster',
                    'animate__fadeInUp'
                );
        } else {
            if (('open').localeCompare(state) === 0) {
                this.menuMobile.classList
                    .replace(
                        'animate__fadeInUp',
                        'animate__fadeOutDown'
                    );
            }
        }
    },
    /**
     * Permet d'afficher ou de cacher 
     * l'overlay, le menu mobile et au body 
     * de scroller ou de ne pas scroller.
     */
    displayMenu() {
        this.overlay.classList.toggle('show-for-mobile');
        this.menuMobile.classList.toggle('show-for-mobile');
        this.body.classList.toggle('no-scroll');
    },

    /**
     * Cache le menu mobile après que l'animation 
     * liée à la fermeture de ce dernier soit terminée 
     */
    state() {
        this.menuMobile.addEventListener('animationend', () => {
            if (this.mobileMenuBtn.getAttribute('data-mobile-menu-state')
                .localeCompare("close") === 0) {
                this.displayMenu();
                this.menuMobile.classList
                    .remove(
                        'animate__animated',
                        'animate__faster',
                        'animate__fadeOutDown'
                    );
            }

        });
    },

    openCloseMenu() {
        if (this.mobileMenuBtn.getAttribute('data-mobile-menu-state')
            .localeCompare("close") === 0) {
            this.changeIcon("open");
            this.menuAnimation('close');
            this.displayMenu();
        } else {
            if (this.mobileMenuBtn.getAttribute('data-mobile-menu-state')
                .localeCompare("open") === 0) {
                this.changeIcon("close");
                this.menuAnimation('open');

            }
        }
    },

    main() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.openCloseMenu()
        });
    }
}


/*Manipulations liées à la gestion du composant card et modal*/

const CLASS_NAME_FORM = 'form';
const ID_NAME_BUTTON = 'back-project';
const CLASS_NAME_ABOUT_MODAL = 'modal';
const CLASS_NAME_CLOSE_MODAL = 'modal__close-icon';
const MODAL_BTN = "#modal-btn-close";
let p;
let anim2 = false;

/**
 * Cette fonction permet d'afficher le formulaire
 * en bas du module card lorsque l'on active le bouton
 * radio lié à ce modue
 * @param {HTMLElement} p 
 */
function showCardForm(p) {
    let forms = document.getElementsByClassName(CLASS_NAME_FORM);
    if (p !== undefined) {
        let parent = p.parentElement.parentElement.parentElement;
        let children = parent.children;
        for (let i = 0; i < forms.length; i++) {
            const el = forms[i];
            el.style.display = 'none';
            for (let a = 0; a < children.length; a++) {
                const element = children[a];
                if (el.isSameNode(element)) {
                    el.style.display = "block";
                }
            }
        }

    }
}

function closeModal() {
    let btn = document.querySelector(MODAL_BTN);
    if (btn !== null) {
        btn.addEventListener('click', function (e) {
            document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[1]
                .style.display = "none";
            document.querySelector('.overlay').style.display = "none";
        })
    }
}

function send() {
    let forms = document.getElementsByClassName(CLASS_NAME_FORM);
    for (let i = 0; i < forms.length; i++) {
        const el = forms[i];
        el.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[1]
                .style.display = "block";

            anim2 = true;
            document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
                .classList.replace('animate__fadeInUp', 'animate__fadeOutDown');
            document.querySelector('nav').style.zIndex = 4;
        })
    }

}

//open modal
document.getElementById(ID_NAME_BUTTON).addEventListener('click', function () {
    document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
        .style.display = "block";
    document.querySelector('nav').style.zIndex = 2;
    document.querySelector('.overlay').style.display = "block";
    document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
        .classList.add(
            'animate__animated',
            'animate__faster',
            'animate__fadeInUp'
        );
});

//close modal
document.querySelector('.' + CLASS_NAME_CLOSE_MODAL)
    .addEventListener('click', function () {
        anim2 = true;
        document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
            .classList.replace('animate__fadeInUp', 'animate__fadeOutDown');
        document.querySelector('nav').style.zIndex = 4;
        document.querySelector('.overlay').style.display = "none";
    });

document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
    .addEventListener('animationend', () => {
        if (anim2) {
            anim2 = false
            document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
                .classList.remove(
                    'animate__animated',
                    'animate__faster',
                    'animate__fadeOutDown'
                );
            document.getElementsByClassName(CLASS_NAME_ABOUT_MODAL)[0]
                .style.display = "none";
        }
    })


//radio

const CLASS_NAME_INPUT_RADIO = 'radio__input';
const CLASS_NAME_WRAPPER_INPUT_RADIO = 'radio';

/**
 * Désactive tous les inputs de type radio
 */
function initRadio() {
    let radios = document.getElementsByClassName(CLASS_NAME_INPUT_RADIO);

    for (let e = 0; e < radios.length; e++) {
        const el = radios[e];
        el.checked = false
    }
}

/**
 * active un input de type radio lors du click 
 * sur son élément conteneur
 */
function activateInputRadio() {
    let array = document.getElementsByClassName(CLASS_NAME_WRAPPER_INPUT_RADIO);

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let parent = element.parentElement.parentElement;

        element.addEventListener('click', function () {
            let children = element.children;
            let active = document.querySelector('.card--active');

            if (active !== null) {
                active.classList.remove('card--active');
            }

            parent.classList.add('card--active');
            for (let i = 0; i < children.length; i++) {
                const el = children[i];

                if (el.classList.contains('radio__input') &&
                    el.getAttribute('type') === 'radio') {
                    el.checked = true;
                    p = el;
                }

            }
            showCardForm(p);
        })
    }
}

mobileMenu.state();
mobileMenu.main();
send();
closeModal();
activateInputRadio();
initRadio();
