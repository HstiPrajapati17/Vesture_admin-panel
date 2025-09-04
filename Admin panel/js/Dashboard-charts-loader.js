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
	const ctx = document.getElementById('salesTrendChart').getContext('2d');

	// Create gradient
	const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(96, 114, 116, 0.4)');
	gradient.addColorStop(1, 'rgba(96, 114, 116, 0.05)');

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			datasets: [{
				label: 'Sales Revenue (CAD)',
				data: [45000, 52000, 48000, 61000, 58000, 67000, 71000, 75430],
				borderColor: '#607274',
				backgroundColor: gradient,
				tension: 0.5,
				fill: true,
				pointRadius: 6,
				pointHoverRadius: 10,
				pointBackgroundColor: '#607274',
				pointBorderColor: '#fff',
				pointBorderWidth: 2,
				borderWidth: 3, // thicker line
				shadowOffsetX: 0,
				shadowOffsetY: 4,
				shadowBlur: 10,
				shadowColor: 'rgba(0,0,0,0.1)'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: '#607274',
					titleColor: '#fff',
					bodyColor: '#fff',
					padding: 10,
					displayColors: false,
					callbacks: {
						label: context => 'CAD $' + context.raw.toLocaleString()
					}
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						callback: v => 'CAD $' + v.toLocaleString(),
						color: '#607274',
						font: { weight: '500' }
					},
					grid: { color: 'rgba(96,114,116,0.1)' }
				},
				x: {
					grid: { display: false },
					ticks: { color: '#607274', font: { weight: '500' } }
				}
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
				backgroundColor: ['#607274', '#8B9DC3', '#A9907E', '#A0A0A0', '#D1A980']
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
					backgroundColor: '#A9907E'
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
};
