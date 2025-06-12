import pandas as pd
import json

# Lista de configuraciones para cada archivo
archivos = [
    {
        "csv": "01-energia-renovable-compartida.csv",
        "columnas": ["Entity", "Code", "Year", "Renewables (% equivalent primary energy)"],
        "nombres": ["Code", "year", "renewables"],
        "salida": "01-energia-renovable-compartida.json"
    },
    {
        "csv": "02-consumo-de-energia-renovable-moderna.csv", 
		"columnas": ["Entity", "Code", "Year", "Geo Biomass Other - TWh", "Solar Generation - TWh", "Wind Generation - TWh", "Hydro Generation - TWh"],
		"nombres": ["Code", "year", "GeoBiomass", "SolarGeneration", "WindGeneration", "HydroGeneration"],
        "salida": "02-consumo-de-energia-renovable-moderna.json"
    },
    {
        "csv": "03-Electricidad-eolica-Electricidad-hidroelectrica-Electricidad-solar-Otras-renovables.csv",
        "columnas": ["Entity", "Code", "Year", "Electricity from wind (TWh)", "Electricity from hydro (TWh)", "Electricity from solar (TWh)", "Other renewables including bioenergy (TWh)"],
		"nombres": ["Code", "year", "wind", "hydro", "solar", "otherRenewables"],
        "salida": "03-Electricidad-eolica-Electricidad-hidroelectrica-Electricidad-solar-Otras-renovables.json"
    },
    {
        "csv": "04-Compartir-electricidad-renovable.csv",       
        "columnas": ["Entity", "Code", "Year", "Renewables (% electricity)"],
		"nombres": ["Code", "year", "RenewablesElectricity"],
        "salida": "04-Compartir-electricidad-renovable.json"
    },
    {
        "csv": "05-consumo-de-energia-solar.csv",
        "columnas": ["Entity", "Code",  "Year", "Electricity from solar (TWh)"],
		"nombres": ["Code",  "Year", "ElectricitySolar"],
        "salida": "05-consumo-de-energia-solar.json"
    },
    {
        "csv": "06-energia-solar-compartida.csv",
        
        "columnas": ["Entity", "Code", "Year", "Solar (% equivalent primary energy)"],
		"nombres": ["Code", "Year", "SolarEquivalentPrimaryEnergy"],
        "salida": "06-energia-solar-compartida.json"
    },
    {
        "csv": "07-acciones-electricidad-solar.csv",
        "columnas": ["Entity", "Code", "Year", "Solar (% electricity)"],
        "nombres": ["Code", "year", "solarElectricity"],
        "salida": "07-acciones-electricidad-solar.json"
    }
]

# Procesar cada archivo
for archivo in archivos:
    try:
        df = pd.read_csv(archivo["csv"])
        df = df[df["Entity"] == "Colombia"]  # Filtrar solo Colombia
        df = df[archivo["columnas"]]
        df.columns = ["Entity"] + archivo["nombres"] if "Entity" in archivo["columnas"] else archivo["nombres"]
        df = df.drop(columns=["Entity"], errors="ignore")
        data_json = df.to_dict(orient="records")

        with open(archivo["salida"], "w", encoding="utf-8") as f:
            json.dump(data_json, f, ensure_ascii=False, indent=2)

        print(f"✅ Convertido: {archivo['salida']}")
    except Exception as e:
        print(f"❌ Error al convertir {archivo['csv']}: {e}")
