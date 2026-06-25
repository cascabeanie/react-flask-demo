import sqlite3
from pathlib import Path


# Database connection helper function
def db(queries, params=(), keys=()):
    # Connect to SQLite database
    DB_PATH = Path(__file__).resolve().parent / "birds.db"
    conn = sqlite3.connect(DB_PATH)

    # conn = sqlite3.connect("birds.db")

    # Provide named column access
    conn.row_factory = sqlite3.Row
    # Create cursor
    cur = conn.cursor()

    # Create empty data dict
    data = {}

    # Loop through SQL query
    for i in range(len(queries)):
        print(keys[i])
        print(queries[i])

        rows = cur.execute(queries[i], params).fetchall()

        # key = keys[i] if keys else i

        # Append rows as dictionaries to data list
        data[keys[i]] = [dict(row) for row in rows]

    # Close db objects
    cur.close()
    conn.close()

    # Return query data
    return data


""" def db(query, params=()):
    # Connect to SQLite database
    conn = sqlite3.connect("birds.db")
    # Provide named column access
    conn.row_factory = sqlite3.Row
    # Create cursor
    cur = conn.cursor()
    # SQL query
    rows = cur.execute(query, params).fetchall()
    # Close db objects
    cur.close()
    conn.close()
    # Append rows as dictionaries to data list
    data = [dict(row) for row in rows]
    # Return query data
    return data """
