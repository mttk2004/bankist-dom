'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector(".header");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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


// Scroll to
document.querySelector(".btn--scroll-to")
        .addEventListener('click', function() {
          const a = document.querySelector(".section__header")
                  .getBoundingClientRect();

          // window.scrollTo(0, a.y * 0.9);
          // window.scrollTo({top: a.y + window.pageYOffset,
          //                   left: 0 + window.pageXOffset,
          //                   behavior: 'smooth'});
          
          document.querySelector(".section__header")
                  .scrollIntoView({ behavior: 'smooth'} );
        });
