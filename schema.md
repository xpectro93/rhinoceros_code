# Possible Schema
# Schema
## species
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | varchar   | not null, unique

## rhinoceros
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | varchar   | not null
species_id      | varchar   | references species(id)


# Possible SQL Queries

## getAll
    SELECT * 
    FROM rhinoceros 
    LIMIT 20 
    OFFSET x ROWS

## rhinocerosByID
    SELECT * 
    FROM rhinoceros 
    WHERE id = x

## getRhinocerosByName 
    SELECT * 
    FROM rhinoceros 
    WHERE name = x

## getRhinocerosBySpecies
    SELECT * 
    FROM rhinoceros 
    WHERE species_id = x 
    LIMIT y 
    OFFSET z ROWS

## getEndangered
    SELECT * 
    FROM rhinoceros
    JOIN (SELECT species_id, COUNT (species_id)
         FROM rhinoceros
         GROUP BY species_id) as count_table
         ON count_table.species_id = rhinoceros.species_id
    WHERE count < x
    
## newRhinoceros
    INSERT INTO rhinoceos (name,species_id) 
    VALUES (x, y)

## updateRhinoceros
    UPDATE rhinoceros
    SET name = x, species = y 
    WHERE id = z
## deleteByID
    DELETE FROM rhinoceros 
    WHERE id = x

