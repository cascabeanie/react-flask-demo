from flask import Flask, jsonify, request
from db import db

# from helpers.append_tolist import append_to_list

# Configure application
app = Flask(__name__)


@app.route("/api/")
def index():

    # Query database for data
    data = db(
        ["""
            SELECT counties.id, counties.flag_title, counties.flag_url, counties.flag_source, counties.flag_license, COUNT(sightings.county_id) AS sightings_in_county
            FROM sightings
            FULL JOIN counties ON sightings.county_id = counties.id
            GROUP BY
            counties.id
        """],
        (),
        ("counties",),
    )

    # Convert data to JSON and return to frontend
    return jsonify(data)


@app.route("/api/counties/<county>")
def all_counties(county):

    # Query database for data
    data = db(
        [
            """
                SELECT counties.county_name, counties.info, counties.info_url, counties.info_source, counties.info_license, counties.info_license_adaptation, counties.image_title, counties.image_url, counties.image_source, counties.image_url, counties.image_license
                FROM counties
                WHERE counties.county_code = ?;
            """,
            """
                SELECT DISTINCT species.common_name, species.species_group, species.iucn_conservation_status 
                FROM species
                JOIN sightings ON species.id = sightings.species_id
                JOIN counties ON sightings.county_id = counties.id
                WHERE counties.county_code = ?
            """,
        ],
        (county,),
        ("county", "species"),
    )

    # Convert data to JSON and return to frontend
    return jsonify(data)


@app.route("/api/counties")
def single_county():

    # Query database for data
    data = db(
        [
            """
                SELECT counties.id, counties.county_name, counties.flag_title, counties.flag_url, counties.flag_source, counties.flag_license, countries.country_name AS country
                FROM countries
                JOIN counties ON countries.id = counties.country_id
            """,
        ],
        (),
        ("counties",),
    )

    # Convert data to JSON and return to frontend
    return jsonify(data)


@app.route("/api/species/")
def all_species():
    # Query database for data
    data = db(
        [
            "SELECT common_name, species_group, taxon_code, iucn_conservation_status FROM species"
        ],
        (),
        ("species",),
    )

    # Convert data to JSON and return to frontend
    return jsonify(data)


@app.route("/api/species/<taxon_code>")
def single_species(taxon_code):
    # Query database for data
    data = db(
        ["SELECT * FROM species WHERE taxon_code = ?"],
        (taxon_code,),
        ("species",),
    )

    # Convert data to JSON and return to frontend
    return jsonify(data)


# Test route - not for prod
@app.route("/api/species/images")
def images():
    # Query database for data
    data = db(
        ["SELECT id, common_name, taxon_code, image_url, image_source FROM species"],
        (),
        ("images"),
    )

    # Convert data to JSON and return to frontend
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
