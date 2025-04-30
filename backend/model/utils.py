import os
import django
from safety_report.models import ArrestData
import pandas as pd
import numpy as np

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')  # Replace 'server' with your project name
django.setup()


def get_crime_data():
    # Query the database and convert it to a Pandas DataFrame
    #queryset = ArrestData.objects.all().values()
    queryset = ArrestData.objects.all().values('arrest_date','ofns_desc' ,'law_cat_cd', 'latitude', 'longitude', 'boroname','ntaname','population',)
    df = pd.DataFrame(queryset)
    # Debug: Print the first 5 rows of the DataFrame
    print("First 5 rows of the DataFrame:")
    print(df.head())

    # Ensure the column names match your logic
    df['Date'] = pd.to_datetime(df['arrest_date'])
    df['crime_weight'] = df['law_cat_cd'].map({"F": 4, "D": 2, "V": 1})
    crime_data = df.groupby("NTAName").agg({
    "crime_weight": "sum",       
    "Population": "first"   
    }).reset_index()
    crime_weight_map = {
    # Highest Severity (Violent / Life Threatening)
    'MURDER & NON-NEGL. MANSLAUGHTE': 10, 'RAPE': 10, 'FELONY ASSAULT': 10, 'SEX CRIMES': 10, 
    'KIDNAPPING & RELATED OFFENSES': 10, 'ARSON': 10, 'HOMICIDE-NEGLIGENT,UNCLASSIFIE': 10, 'HOMICIDE-NEGLIGENT-VEHICLE': 10,
    
    # Very Dangerous
    'ROBBERY': 9, 'BURGLARY': 9, 'GRAND LARCENY OF MOTOR VEHICLE': 9,
    
    # Dangerous Weapons & Assault
    'DANGEROUS WEAPONS': 8, 'DANGEROUS DRUGS': 8, 'ASSAULT 3 & RELATED OFFENSES': 8, 'ESCAPE 3': 8,
    
    # High Impact Theft
    'GRAND LARCENY': 7, 'CRIMINAL MISCHIEF & RELATED OF': 7, 'CRIMINAL TRESPASS': 7, 'POSSESSION OF STOLEN PROPERTY': 7,
    
    # Fraud & Forgery Crimes
    'FRAUDS': 6, 'OFFENSES INVOLVING FRAUD': 6, 'FORGERY': 6, 'THEFT-FRAUD': 6,
    
    # Common Crimes
    'PETIT LARCENY': 5, 'OTHER OFFENSES RELATED TO THEFT': 5, 'DISORDERLY CONDUCT': 5,
    
    # Quality of Life Crimes
    'PROSTITUTION & RELATED OFFENSES': 4, 'GAMBLING': 4, 'INTOXICATED & IMPAIRED DRIVING': 4, 'INTOXICATED/IMPAIRED DRIVING': 4,
    
    # Traffic / Minor Drugs / Alcohol
    'VEHICLE AND TRAFFIC LAWS': 3, 'ALCOHOLIC BEVERAGE CONTROL LAW': 3, 'OTHER STATE LAWS': 3, 'OTHER STATE LAWS (NON PENAL LAW)': 3,
    
    # Very Minor Crimes
    'HARRASSMENT 2': 2, 'JOSTLING': 2, 'LOITERING': 2, 'LOITERING/GAMBLING (CARDS, DIC': 2, 
    
    # Admin / Health / Parking / Noise
    'ADMINISTRATIVE CODE': 1, 'ADMINISTRATIVE CODES': 1, 'MOVING INFRACTIONS': 1, 'PARKING OFFENSES': 1, 
    'FOR OTHER AUTHORITIES': 1, 'NEW YORK CITY HEALTH CODE': 1, 'FORTUNE TELLING': 1, 'DISRUPTION OF A RELIGIOUS SERV': 1,
    '(null)': 1, 'OFFENSES AGAINST PUBLIC ADMINI': 1, 'OFFENSES AGAINST PUBLIC SAFETY': 1, 
    'OFFENSES AGAINST THE PERSON': 1, 'OFF. AGNST PUB ORD SENSBLTY &': 1, 'ANTICIPATORY OFFENSES': 1, 
    'CHILD ABANDONMENT/NON SUPPORT 1': 1, 'OFFENSES RELATED TO CHILDREN': 1, 'BURGLAR\'S TOOLS': 1, 
    'CANNABIS RELATED OFFENSES': 1
    }
    df['crime_weight'] = df['ofns_desc'].map(crime_weight_map).fillna(1)
    df['crime_severity'] = df['crime_weight'].apply(lambda x: 'serious' if x >= 8 else 'unserious')
    df["arrest_date"] = pd.to_datetime(df["arrest_date"])
    df["days_since_crime"] = (pd.Timestamp.now() - df["arrest_date"]).dt.days
    decay_factor = 0.99
    df["adjusted_crime_weight"] = df["crime_weight"] * np.power(decay_factor, df["days_since_crime"])

    

    return df

def predict_safety(lat, lon, model, radius=0.4):
    df = get_crime_data()

    # Calculate distances
    df["distance"] = df.apply(lambda row: haversine(lat, lon, row["latitude"], row["longitude"]), axis=1)
    crimes_in_radius = df[df["distance"] <= radius]

    if crimes_in_radius.empty:
        return "Safe (No crimes found)"

    crime_weight = crimes_in_radius["crime_weight"].sum()
    population = crimes_in_radius["population"].mean()

    weighted_crime_rate = (crime_weight / population) * 100000 if population > 0 else 0

    features = pd.DataFrame({
        "crime_weight": [crime_weight],
        "Population": [population],
        "weighted_crime_rate": [weighted_crime_rate],
    })

    # Normalize and predict
    features["normalized_weighted_rate"] = (weighted_crime_rate - df["crime_weight"].min()) / (
        df["crime_weight"].max() - df["crime_weight"].min()
    )
    safety_index = model.predict(features)[0]

    threshold = 50  # Define your safety threshold
    if safety_index > threshold:
        return f"Safe (Safety Index: {safety_index:.2f})"
    else:
        return f"Not Safe (Safety Index: {safety_index:.2f})"
    

#Task 1
def get_top_crimes_in_neighborhood(neighborhood_name):
    df = get_crime_data()
    crimes_in_neighborhood = df[df['ntaname'] == neighborhood_name]
    top_crimes_neighborhood = crimes_in_neighborhood['ofns_desc'].value_counts().head(5)
    return top_crimes_neighborhood

#Task 2
def get_top_felony_crimes_in_neighborhood(neighborhood_name):
    df = get_crime_data()
    felony_crimes_neighborhood = df[(df['law_cat_cd'] == 'F') & (df['ntaname'] == neighborhood_name)]
    top_felony_crimes_neighborhood = felony_crimes_neighborhood['ofns_desc'].value_counts().head(5)
    return top_felony_crimes_neighborhood

#Task 3
def calculate_crime_rates(neighborhood_name):
    df = get_crime_data()
    nyc_total_crime_weight = df['adjusted_crime_weight'].sum()
    nyc_total_population = df['population'].sum()
    nyc_average_crime_rate = (nyc_total_crime_weight / nyc_total_population) * 1000

   
    neighborhood_data = df[df['ntaname'] == neighborhood_name]
    neighborhood_total_crime_weight = neighborhood_data['adjusted_crime_weight'].sum()
    neighborhood_total_population = neighborhood_data['population'].sum()
    neighborhood_average_crime_rate = (neighborhood_total_crime_weight / neighborhood_total_population) * 1000

    
    df_grouped = df.groupby('ntaname').agg({
        'adjusted_crime_weight': 'sum',
        'population': 'sum'
    }).reset_index()
    
    df_grouped = df_grouped[df_grouped['population'] > 0]  # avoid division by zero
    df_grouped['crime_rate'] = (df_grouped['adjusted_crime_weight'] / df_grouped['population']) * 1000

    min_rate = df_grouped['crime_rate'].min()
    max_rate = df_grouped['crime_rate'].max()

    
    def normalize(rate):
        return (rate - min_rate) / (max_rate - min_rate) if max_rate != min_rate else 0

    return {
        "NYC Average Crime Rate": nyc_average_crime_rate,
        f"{neighborhood_name} Average Crime Rate": neighborhood_average_crime_rate,
        f"{neighborhood_name} Normalized Crime Rate": normalize(neighborhood_average_crime_rate),
        "NYC Normalized Crime Rate": normalize(nyc_average_crime_rate)
    }

#Task 4
def get_crime_breakdown(neighborhood_name):
    df=get_crime_data()
    crimes_in_neighborhood = df[df['ntaname'] == neighborhood_name]
    crime_counts = crimes_in_neighborhood['ofns_desc'].value_counts()
    total_crimes = crime_counts.sum()
    crime_breakdown = (crime_counts / total_crimes * 100).round(2)
    return crime_breakdown.to_dict()


#Task 5
def calculate_borough_safety_index(boroname):
    df=get_crime_data()
    borough_data = df.groupby('boroname').agg({
        'adjusted_crime_weight': 'sum',
        'population': 'sum'
    }).reset_index()

   
    borough_data = borough_data[borough_data['population'] > 0]

    
    borough_data['crime_rate'] = (borough_data['adjusted_crime_weight'] / borough_data['population']) * 1000

    # Min-max normalization to derive safety index
    min_rate = borough_data['crime_rate'].min()
    max_rate = borough_data['crime_rate'].max()

    if max_rate == min_rate:
        borough_data['safety_index'] = 1  
    else:
        borough_data['safety_index'] = 1 - ((borough_data['crime_rate'] - min_rate) / (max_rate - min_rate))
    # Filter for the specific boroname
    borough_safety = borough_data[borough_data['boroname'] == boroname]

    if borough_safety.empty:
        return {"error": f"No data found for boroname: {boroname}"}

    # Return only the safety index for the specific boroname
    return borough_safety['safety_index'].iloc[0]

    #return borough_data[['boroname', 'crime_rate', 'safety_index']].sort_values(by='safety_index', ascending=False)
 
#Task 6
def calculate_ntaname_safety_index(ntaname):
    df=get_crime_data()
    crime_data = df.groupby("ntaname").agg({
        "adjusted_crime_weight": "sum",
        "population": "first"
    }).reset_index()

    # Drop neighborhoods with missing or zero population
    crime_data = crime_data.dropna(subset=["population"])
    crime_data = crime_data[crime_data["population"] > 0]

    # Calculate weighted crime rate per 1,000 residents
    crime_data["weighted_crime_rate"] = (crime_data["adjusted_crime_weight"] / crime_data["population"]) * 1000

    # Normalize the weighted crime rate
    min_rate = crime_data["weighted_crime_rate"].min()
    max_rate = crime_data["weighted_crime_rate"].max()

    if max_rate == min_rate:
        crime_data["normalized_weighted_rate"] = 0
    else:
        crime_data["normalized_weighted_rate"] = (crime_data["weighted_crime_rate"] - min_rate) / (max_rate - min_rate)

    # Invert normalized crime rate to compute safety index
    crime_data["safety_index"] = (1 - crime_data["normalized_weighted_rate"]) * 100

    # Filter for the specific ntaname
    neighborhood_safety = crime_data[crime_data['ntaname'] == ntaname]

    if neighborhood_safety.empty:
        return {"error": f"No data found for ntaname: {ntaname}"}

    # Return only the safety index for the specific ntaname
    return neighborhood_safety['safety_index'].iloc[0]
    #return crime_data[["ntaname","safety_index"]].sort_values(by='safety_index', ascending=False)