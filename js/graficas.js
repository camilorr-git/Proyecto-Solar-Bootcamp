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
					{ label: 'Eólica', data: wind, backgroundColor: '#3498DB' },
					{ label: 'Solar', data: solar, backgroundColor: '#FFC72C' },
					{ label: 'Hidráulica', data: hydro, backgroundColor: '#1ABC9C' },
					{ label: 'Bioenergía', data: bio, backgroundColor: '#2ECC71' }
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
		}); // Cierre new Chart
	}); // Cierre .then(data)

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
					backgroundColor: ['#FFC72C', '#3498DB', '#1ABC9C', '#00BCD4'] // Colores de cada segmento
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
		});  // Cierre new Chart
	}); // Cierre .then(data)

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
					{ label: 'Eólica', data: wind, borderColor: '#3498DB', fill: false },
					{ label: 'Solar', data: solar, borderColor: '#FFC72C', fill: false },
					{ label: 'Geotérmica/Otras', data: geo, borderColor: '#2ECC71', fill: false }
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
		});  // Cierre new Chart
	}); // Cierre .then(data)

	// ============================================================
	// 4. Gráfico de Área: Comparación entre energías renovables y convencionales (1965–2023)
	// ============================================================
	fetch(basePath + '02-consumo-de-energia-renovable-moderna.json')
	.then(res => res.json())
	.then(data => {

		// Datos reales de consumo eléctrico (TWh) desde el año 2000
		const consumoReal = {
			2000: 42.18, 2001: 33.88, 2002: 34.73, 2003: 35.42, 2004: 37.44,
			2005: 37.79, 2006: 40.49, 2007: 42.21, 2008: 42.76, 2009: 46.39,
			2010: 46.69, 2011: 49.96, 2012: 52.11, 2013: 65.57, 2014: 62.41,
			2015: 70.43, 2016: 69.49, 2017: 72.99, 2018: 71.10, 2019: 73.38,
			2020: 73.25, 2021: 77.80, 2022: 80.94, 2023: 82.31
		};

		const labels = [];
		const renovable = [];
		const convencional = [];

		data.forEach(d => {
			const year = parseInt(d.year);

			// Sumamos las fuentes renovables disponibles
			const hydro = parseFloat(d['HydroGeneration'] || 0);
			const geo = parseFloat(d['GeoBiomass'] || 0);
			const solar = parseFloat(d['SolarGeneration'] || 0);
			const wind = parseFloat(d['WindGeneration'] || 0);
			const totalRenovable = hydro + geo + solar + wind;

			// Estimar el total si no hay dato real
			let total = 0;
			if (consumoReal[year]) {
				total = consumoReal[year];
			} else {
				// Estimación simple: lineal desde 15 TWh en 1965 aumentando 0.8 por año
				total = 15 + (year - 1965) * 0.8;
			}

			// Calcular energía convencional como Total - Renovable
			const convencionalValue = total - totalRenovable;

			labels.push(year);
			renovable.push(totalRenovable);
			convencional.push(convencionalValue > 0 ? convencionalValue : 0); // sin negativos
		}); //Cierre data.forEach

		// Crear gráfico de área
		new Chart(document.getElementById('graficoArea'), {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Energía Renovable',
						data: renovable,
						fill: true,
						backgroundColor: 'rgba(76, 175, 80, 0.4)',
						borderColor: 'green',
						tension: 0.3
					},
					{
						label: 'Energía Convencional',
						data: convencional,
						fill: true,
						backgroundColor: 'rgba(244, 67, 54, 0.4)',
						borderColor: 'red',
						tension: 0.3
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Comparación entre Energía Renovable y Convencional en Colombia (1965–2023)'
					},
					legend: {
						position: 'top'
					},
					tooltip: {
						mode: 'index',
						intersect: false
					}
				},
				interaction: {
					mode: 'index',
					intersect: false
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
		});  // Cierre new Chart
	}); // Cierre .then(data)



}); // Fin del DOMContentLoaded
