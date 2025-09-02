window.initCharts = function initCharts() {
	if (typeof Chart === 'undefined') {
		console.warn('Chart.js not loaded yet.');
		return;
	}
	if (!document.getElementById('salesTrendChart')) {
		console.warn('Chart canvases not found in DOM.');
		return;
	}

	// Monthly Sales Trend (Line Chart)
	new Chart(document.getElementById('salesTrendChart'), {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			datasets: [{
				label: 'Sales Revenue (CAD)',
				data: [45000, 52000, 48000, 61000, 58000, 67000, 71000, 75430],
				borderColor: '#607274',
				backgroundColor: 'rgba(96, 114, 116, 0.15)',
				tension: 0.4,
				fill: true,
				pointRadius: 6,
				pointHoverRadius: 10,
				pointBackgroundColor: '#607274',
				pointBorderColor: '#fff',
				pointBorderWidth: 2
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: {
				y: {
					beginAtZero: true,
					ticks: { callback: v => 'CAD $' + v.toLocaleString() }
				},
				x: { grid: { display: false } }
			}
		}
	});

	// Category Distribution (Doughnut Chart)
	new Chart(document.getElementById('categoryDonutChart'), {
		type: 'doughnut',
		data: {
			labels: ['T-Shirts', 'Jackets', 'Dresses', 'Hoodies', 'Shirts'],
			datasets: [{
				data: [350, 200, 85, 120, 180],
				backgroundColor: ['#607274', '#8B9DC3', '#A6B28B', '#A0A0A0', '#D1A980']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { position: 'bottom', labels: { boxWidth: 15, padding: 10 } } }
		}
	});

	// Production vs Sales (Bar Chart)
	new Chart(document.getElementById('productionSalesChart'), {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [
				{
					label: 'Production',
					data: [1200, 1350, 1100, 1450, 1300, 1500],
					backgroundColor: '#607274'
				},
				{
					label: 'Sales',
					data: [1150, 1300, 1050, 1420, 1280, 1480],
					backgroundColor: '#8B9DC3'
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					ticks: { stepSize: 200 }
				}
			},
			plugins: { legend: { position: 'top' } }
		}
	});

	// Top Selling Products (Pie Chart)
	new Chart(document.getElementById('topProductsChart'), {
		type: 'pie',
		data: {
			labels: ['Denim Jacket', 'Cotton T-Shirt', 'Formal Shirt', 'Kids Hoodie', 'Summer Dress'],
			datasets: [{
				data: [25, 30, 20, 15, 10],
				backgroundColor: ['#607274', '#8B9DC3', '#A6B28B', '#A0A0A0', '#D1A980']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { position: 'right', labels: { boxWidth: 15, padding: 10 } }
			}
		}
	});
};
