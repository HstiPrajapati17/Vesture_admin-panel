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
				borderColor: '#604652',
				backgroundColor: gradient,
				tension: 0.5,
				fill: true,
				pointRadius: 6,
				pointHoverRadius: 10,
				pointBackgroundColor: '#604652',
				pointBorderColor: '#fff',
				pointBorderWidth: 2,
				borderWidth: 3,
				shadowOffsetX: 0,
				shadowOffsetY: 4,
				shadowBlur: 10,
				shadowColor: '#604652',
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: '#604652',
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
						color: '#604652',
						font: { weight: '500' }
					},
					grid: { color: 'rgba(96,114,116,0.1)' }
				},
				x: {
					grid: { display: false },
					ticks: { color: '#604652', font: { weight: '500' } }
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
				backgroundColor: ['#604652', '#EBD9D1', '#B2A59B', '#A0A0A0', '#896C6C']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { position: 'bottom', labels: { boxWidth: 15, padding: 10 } } }
		}
	});
};
