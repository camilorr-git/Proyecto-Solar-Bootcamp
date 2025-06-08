// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {

	// js/graficas.js

	const basePath = './json/'; // Ruta base donde se encuentran los archivos de datos JSON

	// ============================================================
	// 1. Gráfico de Barras: Producción de energía renovable por fuente
	// ============================================================
	fetch(basePath + '02-consumo-de-energia-renovable-moderna.json')
	.then(res => res.json())
	.then(data => {
		const labels = data.map(d => d.year); // Eje X: años

		// Datos por tipo de fuente
		const wind = data.map(d => parseFloat(d['WindGeneration']));
		const solar = data.map(d => parseFloat(d['SolarGeneration']));
		const hydro = data.map(d => parseFloat(d['HydroGeneration']));
		const bio = data.map(d => parseFloat(d['GeoBiomass']));

		new Chart(document.getElementById('graficoBarras'), {
			type: 'bar', // Tipo de gráfico: barras
			data: {
				labels: labels, // Etiquetas del eje X (años)
				datasets: [
					{ label: 'Eólica', data: wind, backgroundColor: 'skyblue' },
					{ label: 'Solar', data: solar, backgroundColor: 'orange' },
					{ label: 'Hidráulica', data: hydro, backgroundColor: 'lightgreen' },
					{ label: 'Bioenergía', data: bio, backgroundColor: 'brown' }
				]
			},
			options: {
				responsive: true, // El gráfico se adapta al tamaño del contenedor
				plugins: {
					title: {
						display: true, // Muestra el título del gráfico
						text: 'Producción de Energía Renovable por Fuente (TWh)' // Texto del título
					}
				},
				scales: {
					y: {
						beginAtZero: true, // El eje Y inicia en 0
						title: {
							display: true,
							text: 'Teravatios hora (TWh)' // Etiqueta del eje Y
						}
					},
					x: {
						title: {
							display: true,
							text: 'Año' // Etiqueta del eje X
						}
					}
				}
			}
		});
	});

	// ============================================================
	// 2. Gráfico de Torta: Participación porcentual de fuentes renovables
	// ============================================================
	fetch(basePath + '03-Electricidad-eolica-Electricidad-hidroelectrica-Electricidad-solar-Otras-renovables.json')
	.then(res => res.json())
	.then(data => {
		const ultimo = data[data.length - 1]; // Toma el último año del conjunto de datos

		const labels = ['Solar', 'Eólica', 'Hidráulica', 'Otras Renovables'];

		const valores = [
			parseFloat(ultimo['solar']),
			parseFloat(ultimo['wind'] || 0),
			parseFloat(ultimo['hydro'] || 0),
			parseFloat(ultimo['otherRenewables'] || 0)
		];

		new Chart(document.getElementById('graficoTorta'), {
			type: 'pie', // Tipo de gráfico: torta/pie
			data: {
				labels: labels, // Etiquetas de categorías
				datasets: [{
					data: valores, // Valores de cada categoría
					backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#00BCD4'] // Colores de cada segmento
				}]
			},
			options: {
				responsive: true, // Adaptable al contenedor
				plugins: {
					title: {
						display: true,
						text: 'Participación de Energías Renovables (%)'
					},
					legend: {
						position: 'bottom' // Posición de la leyenda
					}
				}
			}
		});
	});

	// ============================================================
	// 3. Gráfico de Líneas: Tendencia de capacidad instalada
	// ============================================================
	fetch(basePath + '03-Electricidad-eolica-Electricidad-hidroelectrica-Electricidad-solar-Otras-renovables.json')
	.then(res => res.json())
	.then(data => {
		const labels = data.map(d => d.year); // Eje X: años

		// Datos de capacidad instalada por tipo
		const wind = data.map(d => parseFloat(d['wind']));
		const solar = data.map(d => parseFloat(d['solar']));
		const geo = data.map(d => parseFloat(d['otherRenewables']));

		new Chart(document.getElementById('graficoLineas'), {
			type: 'line', // Tipo de gráfico: líneas
			data: {
				labels: labels,
				datasets: [
					{ label: 'Eólica', data: wind, borderColor: 'skyblue', fill: false },
					{ label: 'Solar', data: solar, borderColor: 'orange', fill: false },
					{ label: 'Geotérmica/Otras', data: geo, borderColor: 'gray', fill: false }
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Tendencia en la Capacidad Instalada (TWh)' // Título superior
					},
					tooltip: {
						mode: 'index',
						intersect: false // Muestra valores al pasar sobre cualquier punto
					},
					legend: {
						position: 'top' // Leyenda en la parte superior
					}
				},
				scales: {
					x: {
						title: {
							display: true,
							text: 'Año'
						}
					},
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Capacidad instalada (TWh)'
						}
					}
				}
			}
		});
	});

	// ============================================================
	// 4. Gráfico de Área: Comparación entre energías renovables y convencionales
	// ============================================================
	fetch(basePath + '02-consumo-de-energia-renovable-moderna.json')
	.then(res => res.json())
	.then(data => {
		const labels = data.map(d => d.year);

		const renovable = data.map(d => parseFloat(d['ModernRenewableEnergy'] || 0));
		const convencional = data.map(d => parseFloat(d['ConventionalEnergy'] || 0));

		new Chart(document.getElementById('graficoArea'), {
			type: 'line', // Se usa 'line' con fill para simular gráfico de área
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Energía Renovable',
						data: renovable,
						fill: true, // Rellena el área bajo la línea
						backgroundColor: 'rgba(76, 175, 80, 0.4)', // Color del área
						borderColor: 'green' // Color del borde
					},
					{
						label: 'Energía Convencional',
						data: convencional,
						fill: true,
						backgroundColor: 'rgba(244, 67, 54, 0.4)',
						borderColor: 'red'
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Comparación entre Consumo de Energía Renovable y Convencional (TWh)'
					},
					tooltip: {
						mode: 'index',
						intersect: false
					},
					legend: {
						position: 'top'
					}
				},
				scales: {
					x: {
						title: {
							display: true,
							text: 'Año'
						}
					},
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Consumo de Energía (TWh)'
						}
					}
				}
			}
		});
	});

}); // Fin del DOMContentLoaded
