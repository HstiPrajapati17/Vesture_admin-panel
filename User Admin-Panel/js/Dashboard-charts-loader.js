window.initCharts = function initCharts() {
	if (typeof Chart === 'undefined') return;

	// User Monthly Spending (Bar Chart)
	new Chart(document.getElementById('userSpendingChart'), {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
			datasets: [{
				label: 'My Spending (CAD)',
				data: [220, 340, 180, 420, 300, 500, 380],
				backgroundColor: '#604652',
				borderRadius: 4
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: ctx => 'CAD $' + ctx.raw
					}
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: { callback: v => 'CAD $' + v }
				}
			}
		}
	});

	// Favorite Categories (Doughnut Chart)
	new Chart(document.getElementById('userCategoryChart'), {
		type: 'doughnut',
		data: {
			labels: ['T-Shirts', 'Jackets', 'Dresses', 'Hoodies', 'Shirts'],
			datasets: [{
				data: [5, 3, 2, 4, 6], // Example counts
				backgroundColor: ['#604652', '#EBD9D1', '#B2A59B', '#896C6C', '#e6e1dc']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: 'bottom',
					labels: { boxWidth: 15, padding: 10 }
				}
			}
		}
	});
};