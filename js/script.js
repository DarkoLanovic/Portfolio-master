const pageHeader = document.querySelector('.page-header');
// const logo = document.querySelector('.navbar-brand');
const homeSection = document.getElementById('home');
const closeHamburgerBtn = document.querySelector('#nav-icon');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.querySelector('#toggle-icon');
const form = document.getElementById('contact-form');

AOS.init();

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    toggleDarkLightMode(localStorage.getItem('theme'));
  }
})

let i = 0;
let txt = 'Hi, my name is Darko'; /* The text */
let speed = 100; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
	if (i < txt.length) {
		document.getElementById('profile-h1').innerHTML += txt.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	}
}

typeWriter();
let options = {
	root: null,
	threshold: 0,
	rootMargin: '-5px',
};


let sectionObserver = new IntersectionObserver(function (entries, observer) {
	entries.forEach(entry => {
		function swapIntersectionDesigns(link, color) {
			pageHeader.classList.toggle('intersected');
			logo.src = link;
			toggleIcon.children[0].style.color = color;
		}
		if (!entry.isIntersecting) {
			// pageHeader.classList.add('intersected');
			// logo.src = './img/MJ-Logo-Design-01.svg';
			// toggleIcon.children[0].style.color = '#000'
			swapIntersectionDesigns('./img/MJ-Logo-Design-01.svg', '#000');
		} else {
			pageHeader.classList.remove('intersected');
			logo.src = './img/MJ-Logo-Design-01-White-BG.png';
			toggleIcon.children[0].style.color = '#fff';

			// swapIntersectionDesigns('./img/MJ-Logo-Design-01-White-BG.svg', '#fff')
		}
	});
}, options);

sectionObserver.observe(homeSection);

const navbarNav = document.querySelector('#navbar-nav');
const navbarNavItems = document.querySelectorAll('.nav-item');

// closeHamburgerBtn.addEventListener('click', () =>
// 	closeHamburgerBtn.classList.toggle('open')
// );

const navbarSupportedContent = document.querySelector(
	'#navbarSupportedContent'
);

//Event Handler to close Bootstrap dropdown menu
document.body.addEventListener('click', () => {
	if (!navbarSupportedContent.classList.contains('show')) return;

	let collapseElementList = [].slice.call(
		document.querySelectorAll('.collapse')
	);
	let collapseList = collapseElementList.map(
		collapseEl => new bootstrap.Collapse(collapseEl)
	);
	closeHamburgerBtn.classList.remove('open');
});

// Formspree function
async function handleSubmit(e) {
	e.preventDefault();
	let status = document.getElementById('my-form-status');
	let data = new FormData(e.target);
	fetch(e.target.action, {
		method: form.method,
		body: data,
		headers: {
			Accept: 'application/json',
		},
	})
		.then(res => {
			status.innerText = 'Thanks for your submission!';
			status.classList.add('success');
			form.reset();
		})
		.catch(err => {
			status.innerText = 'There was a problem submitting your form';
			status.classList.add('error');
		});
}
form.addEventListener('submit', handleSubmit);

function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		toggleDarkLightMode('dark');
	} else {
		document.documentElement.removeAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'light');
		toggleDarkLightMode('light');
	}
}

function toggleDarkLightMode(input) {
	function capitalize(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	toggleIcon.children[0].innerText = `${capitalize(input)} Mode`;
	homeSection.style.backgroundImage =
		input === 'dark'
			? 'url(../img/wickedbackground-dark_mode.svg)'
			: 'url(../img/wickedbackground.svg)';
}

toggleSwitch.addEventListener('change', switchTheme);

const projectList = document.querySelectorAll('.project');

projectList.forEach(project => {
	project.addEventListener('click', () => {
		removeActiveClass();
		project.classList.add('active');
	});
});

function removeActiveClass() {
	projectList.forEach(project => project.classList.remove('active'));
}
