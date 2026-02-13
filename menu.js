// Menu page functionality
document.addEventListener('DOMContentLoaded', function() {
	
	// Menu tab switching
	const menuTabs = document.querySelectorAll('.menu-tab');
	const menuCategories = document.querySelectorAll('.menu-category');
	
	menuTabs.forEach(tab => {
		tab.addEventListener('click', function() {
			// Remove active class from all tabs
			menuTabs.forEach(t => t.classList.remove('active'));
			
			// Add active class to clicked tab
			this.classList.add('active');
			
			// Get the category to show
			const category = this.getAttribute('data-category');
			
			// Hide all categories
			menuCategories.forEach(cat => cat.classList.remove('active'));
			
			// Show selected category
			const selectedCategory = document.getElementById(category);
			if (selectedCategory) {
				selectedCategory.classList.add('active');
				
				// Trigger animations for menu items
				setTimeout(() => {
					animateMenuItems(selectedCategory);
				}, 100);
				
				// Smooth scroll to category header
				const categoryHeader = selectedCategory.querySelector('.category-header');
				if (categoryHeader) {
					const offset = 150; // Espacio desde el top
					const elementPosition = categoryHeader.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - offset;
					
					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}
			}
		});
	});
	
	// Animate menu items when they come into view
	function animateMenuItems(category) {
		const items = category.querySelectorAll('.menu-item');
		items.forEach((item, index) => {
			setTimeout(() => {
				item.style.opacity = '1';
				item.style.transform = 'translateX(0)';
			}, index * 100);
		});
	}
	
	// Initial animation for the first category
	const firstCategory = document.querySelector('.menu-category.active');
	if (firstCategory) {
		animateMenuItems(firstCategory);
	}
	
	// Scroll reveal animations
	if (typeof ScrollReveal !== 'undefined') {
		const sr = ScrollReveal({
			origin: 'bottom',
			distance: '50px',
			duration: 800,
			delay: 200,
			reset: false
		});
		
		sr.reveal('.category-header', {
			origin: 'top'
		});
		
		sr.reveal('.menu-item', {
			interval: 100
		});
		
		sr.reveal('.menu-cta', {
			origin: 'bottom',
			distance: '100px'
		});
	}
	
	// Smooth scrolling for back to top button
	const backToTop = document.querySelector('.back-to-top a');
	if (backToTop) {
		backToTop.addEventListener('click', function(e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
	
	// Show/hide back to top button based on scroll
	window.addEventListener('scroll', function() {
		const backToTopButton = document.querySelector('.back-to-top');
		if (backToTopButton) {
			if (window.pageYOffset > 300) {
				backToTopButton.style.opacity = '1';
				backToTopButton.style.visibility = 'visible';
			} else {
				backToTopButton.style.opacity = '0';
				backToTopButton.style.visibility = 'hidden';
			}
		}
	});
	
	// Highlight current section in navigation on scroll
	window.addEventListener('scroll', function() {
		let current = '';
		const sections = document.querySelectorAll('.menu-category');
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= (sectionTop - 200)) {
				current = section.getAttribute('id');
			}
		});
		
		menuTabs.forEach(tab => {
			tab.classList.remove('active');
			if (tab.getAttribute('data-category') === current) {
				tab.classList.add('active');
			}
		});
	});
});