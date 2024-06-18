'use strict';

///////////////////////////////////////

const header = document.querySelector(".header");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const allSections = document.querySelectorAll('.section');
const allFeaturesImages = document.querySelectorAll('.features__img');


////////////////////////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Cookie message: create and insert
const cookieMessage = document.createElement("div");
cookieMessage.classList.add("cookie-message");
cookieMessage.innerHTML = 'We use cookie to improve your experiment.'
    + '<button class="btn btn--close-cookie">Got it!</button>';
header.append(cookieMessage);

// Remove()
document.querySelector(".btn--close-cookie")
        .addEventListener('click', function() {
          cookieMessage.remove();
        });

// Styles
cookieMessage.style.background = '#37383d';
// cookieMessage.style.width = '100vw';
cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height)
    + 20 + 'px';
cookieMessage.style.fontSize = '16px'


// Scrolling
document.querySelector(".btn--scroll-to")
        .addEventListener('click', function() {
          // const a = document.querySelector(".section__header")
          //         .getBoundingClientRect();

          // window.scrollTo(0, a.y * 0.9);
          // window.scrollTo({top: a.y + window.pageYOffset,
          //                   left: 0 + window.pageXOffset,
          //                   behavior: 'smooth'});
          
          document.querySelector(".section__header")
                  .scrollIntoView({ behavior: 'smooth'} );
        });


// Page navigation: event delegation
document.querySelector(".nav__links")
    .addEventListener('click', function(e) {
      e.preventDefault();
      
      // console.dir(e.target);
      const id = e.target.getAttribute('href');
      e.target.nodeName === 'A' && document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
                                                                             })
    });


// Tabbed components
tabsContainer.addEventListener('click', function(e) {
  const tab = e.target.closest(".operations__tab");
  if (!tab) return;
  
  const activeNum = tab.dataset.tab; // to know which tab is clicked
  
  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  
  // Activate tab
  tab.classList.add('operations__tab--active')
  document
      .querySelector(`.operations__content--${activeNum}`)
      .classList.add('operations__content--active');
  // tabsContent[activeNum-1].classList.add('operations__content--active')
})


// Menu fade animation
const handleHover = function(e) {
  if (!e.target.classList.contains('nav__link')) return;
  
  const links = e.target.closest('.nav')
                 .querySelectorAll('.nav__link')
  const logo = e.target.closest('.nav')
                .querySelector('img')
  
  links.forEach(l => { if (l !== e.target) l.style.opacity = `${this}` })
  logo.style.opacity = `${this}`;
}

nav.addEventListener('mouseover', handleHover.bind(.75));
nav.addEventListener('mouseout', handleHover.bind(1))


// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(([entry]) => {
  entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');
}, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);


// Reveal sections
const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
};

const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: .15
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionsObserver.observe(section);
});


// Lazy loading images
const lazyLoading = function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('src',
                                entry.target.dataset.src);
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target);
    }
  })
}

const featuresImgObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: .25
})

allFeaturesImages.forEach(img => featuresImgObserver.observe(img));
