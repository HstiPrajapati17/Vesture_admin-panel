



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
	fetch('/pages/Dashboard/dashboard.html')
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