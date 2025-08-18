
/***** Sidebar behaviour *****/
(function () {
	const body = document.body;
	const sidebar = document.getElementById('sidebar');
	const toggle = document.getElementById('sidebarToggle');       // desktop toggle (collapse)
	const toggleMobile = document.getElementById('sidebarToggleMobile'); // mobile open
	const backdrop = document.getElementById('sidebarBackdrop');
	const navLinks = document.querySelectorAll('#sidebar .nav-link');

	// Helper: is mobile width
	const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

	// Desktop collapse/expand toggle
	toggle.addEventListener('click', () => {
		body.classList.toggle('collapsed');
		// Update toggle icon
		const icon = toggle.querySelector('i');
		if (body.classList.contains('collapsed')) icon.className = 'bi bi-chevron-right';
		else icon.className = 'bi bi-chevron-left';
	});

	// On first load, if width <= 1024, make collapsed by default for compact UI
	const initAdaptive = () => {
		if (window.matchMedia('(max-width: 1024px)').matches) {
			body.classList.add('collapsed');
		} else {
			body.classList.remove('collapsed');
		}
	};
	initAdaptive();
	window.addEventListener('resize', initAdaptive);

	// Mobile: open sidebar as overlay
	toggleMobile.addEventListener('click', () => {
		body.classList.add('mobile-open'); // CSS shows sidebar and backdrop
		// ensure content is scrolled to top for clean overlay experience
		document.getElementById('content').scrollTop = 0;
	});

	// Clicking backdrop closes mobile sidebar
	backdrop.addEventListener('click', () => {
		body.classList.remove('mobile-open');
	});

	// Close mobile sidebar when a nav link is clicked (better UX)
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			const path = link.getAttribute('data-path');
			// if path exists, load page into container (keeps your loadPage logic)
			if (path) {
				loadPage(path); // uses the loadPage defined later
			}
			if (isMobile()) body.classList.remove('mobile-open');
			// update active class
			document.querySelectorAll('#sidebar .nav-link').forEach(n => n.classList.remove('active'));
			link.classList.add('active');
			e.preventDefault();
		});
	});

	// Allow closing mobile sidebar with Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') body.classList.remove('mobile-open');
	});
})();


/* JS to load pages into container (keeps your previous logic) */
const pageContainer = document.getElementById('dashboard-container');

function loadPage(path) {
	fetch(path)
		.then(response => {
			if (!response.ok) throw new Error('Network response was not ok');
			return response.text();
		})
		.then(html => {
			pageContainer.innerHTML = html;

			// Call initCharts after the content is loaded
			if (path.includes('Dashboard.html')) {
				setTimeout(initCharts, 100); // Add a slight delay to ensure DOM is ready
			}
		})
		.catch(err => console.error('Failed to load page:', err));
}

// wire up links that have data-path (some added in sidebar code too)
document.querySelectorAll('#sidebar .nav-link[data-path]').forEach(link => {
	link.addEventListener('click', (e) => e.preventDefault()); // actual click handled earlier in navLinks
});

// Initial load: Dashboard
loadPage('/pages/Dashboard/Dashboard.html');



// Chart initialization function (called after dashboard HTML is injected)
function initCharts() {
	if (typeof Chart === 'undefined') return;
	if (!document.getElementById('salesTrendChart')) return; // avoid errors if not present

	// Monthly Sales Trend Line Chart (with larger points)
	new Chart(document.getElementById('salesTrendChart'), {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			datasets: [{
				label: 'Sales (CA$)',
				data: [45000, 52000, 48000, 61000, 58000, 67000, 71000, 75430],
				borderColor: '#607274',
				backgroundColor: 'rgba(96,114,116,0.08)',
				tension: 0.4,
				fill: true,
				pointRadius: 8,       // bigger points
				pointHoverRadius: 11,  // bigger on hover
				pointBackgroundColor: '#607274',
				pointBorderColor: '#fff',
				pointBorderWidth: 2
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: { y: { beginAtZero: true, ticks: { callback: v => 'CA$' + v.toLocaleString() } } }
		}
	});

	// Category Distribution Donut Chart
	new Chart(document.getElementById('categoryDonutChart'), {
		type: 'doughnut',
		data: {
			labels: ['T-Shirts', 'Jackets', 'Dresses', 'Hoodies', 'Shirts'],
			datasets: [{
				data: [350, 200, 85, 120, 180],
				backgroundColor: ['#607274', '#8B9DC3', '#A6B28B', '#A0A0A0', '#D1A980']
			}]
		},
		options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
	});

	// Production vs Sales Bar Chart
	new Chart(document.getElementById('productionSalesChart'), {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [{
				label: 'Production',
				data: [1200, 1350, 1100, 1450, 1300, 1500],
				backgroundColor: '#607274'
			}, {
				label: 'Sales',
				data: [1150, 1300, 1050, 1420, 1280, 1480],
				backgroundColor: '#A0A0A0'
			}]
		},
		options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
	});

	// Top Selling Products Pie Chart
	new Chart(document.getElementById('topProductsChart'), {
		type: 'pie',
		data: {
			labels: ['Denim Jacket', 'Cotton T-Shirt', 'Formal Shirt', 'Kids Hoodie', 'Summer Dress'],
			datasets: [{ data: [25, 30, 20, 15, 10], backgroundColor: ['#607274', '#8B9DC3', '#A6B28B', '#A0A0A0', '#D1A980'] }]
		},
		options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
	});

	// Small gauge-like doughnuts
	const gaugeOptions = { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } };

	new Chart(document.getElementById('productionRateChart'), {
		type: 'doughnut',
		data: { datasets: [{ data: [85, 15], backgroundColor: ['#607274', '#e0e0e0'], borderWidth: 0 }] },
		options: gaugeOptions
	});

	new Chart(document.getElementById('qualityChart'), {
		type: 'doughnut',
		data: { datasets: [{ data: [92, 8], backgroundColor: ['#D1A980', '#e0e0e0'], borderWidth: 0 }] },
		options: gaugeOptions
	});

	new Chart(document.getElementById('materialChart'), {
		type: 'doughnut',
		data: { datasets: [{ data: [68, 32], backgroundColor: ['#a0a0a0', '#e0e0e0'], borderWidth: 0 }] },
		options: gaugeOptions
	});
}

// Load dashboard.html and initialize charts
function loadDashboard() {
	fetch('/pages/Dashboard/Dashboard.html')
		.then(response => {
			if (!response.ok) throw new Error('Dashboard load failed');
			return response.text();
		})
		.then(html => {
			document.getElementById('dashboard-container').innerHTML = html;
			// a tiny delay so canvases are laid out, then init charts
			setTimeout(initCharts, 120);
		})
		.catch(err => {
			console.error(err);
			document.getElementById('dashboard-container').innerHTML = '<div class="p-4 text-danger">Failed to load dashboard.</div>';
		});
}


// searchbar active when screen size is maximum-540px
const mobileSearchBtn = document.getElementById("mobileSearchBtn");
const mobileSearchBar = document.getElementById("mobileSearchBar");

mobileSearchBtn.addEventListener("click", () => {
	mobileSearchBar.classList.toggle("d-none");
});

window.addEventListener('load', loadDashboard);