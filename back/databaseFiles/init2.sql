



CREATE TABLE roles(
    role_id serial PRIMARY KEY,
    role_description VARCHAR(50)
);


CREATE TABLE users(
  user_id serial PRIMARY KEY,
  user_name VARCHAR(30) NOT NULL,
  user_surname VARCHAR(20) NOT NULL,
  user_email VARCHAR(40) NOT NULL,
  access_token VARCHAR(500),
  refresh_token VARCHAR(500),
  role_id INTEGER NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255),
    project_address VARCHAR(255),
    project_date DATE DEFAULT CURRENT_DATE,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY (user_id)
            REFERENCES users(user_id)
);


CREATE TABLE ifc_files (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    file_name VARCHAR(255) NOT NULL,
     CONSTRAINT fk_project
        FOREIGN KEY (project_id)
            REFERENCES projects(project_id)
    
);

CREATE TABLE casting_templates (
  template_id SERIAL PRIMARY KEY,
  template_type VARCHAR(255) NOT NULL,
  template_data JSONB
);



CREATE TABLE statuses (
  status_id SERIAL PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);

INSERT INTO statuses (status_name) VALUES
  ('created'),
  ('ordered'),
  ('delivered'),
  ('ongoing'),
  ('completed');

CREATE TABLE castings (
  casting_id SERIAL PRIMARY KEY,
  casting_description TEXT ,
  casting_volume_beton INTEGER,
  casting_volume_starting_date DATE, 
  casting_volume_end_date DATE,
  template_id INT,
  project_id INT NOT NULL, 
  status_id INT NOT NULL
);

ALTER TABLE castings
  ADD CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES projects(project_id);

ALTER TABLE castings
  ADD CONSTRAINT fk_statuses
    FOREIGN KEY (status_id)
    REFERENCES statuses(status_id);

ALTER TABLE castings
  ADD CONSTRAINT fk_template
    FOREIGN KEY (template_id)
    REFERENCES casting_templates(template_id);



CREATE TABLE Orders (
  order_id SERIAL primary key,
  order_data JSONB,
  casting_id INT,
  CONSTRAINT fk_casting
    FOREIGN KEY (casting_id)
            REFERENCES castings(casting_id)
 
);

INSERT INTO roles (role_id, role_description) values (DEFAULT ,'ADMIN');
INSERT INTO roles (role_id, role_description) values (DEFAULT ,' SIMPLE USER');


INSERT INTO casting_templates ( template_type , template_data)
VALUES ('voile', '[
  { "id": "1", "question": "type_element", "value": "voile" },
  { "id": "2", "question": "type_voile", "value": "autres_voiles" },
  { "id": "3", "question": "beton_apparent", "value": true },
  { "id": "4", "question": "environnement", "value": "interieur" },
  { "id": "5", "question": "environnement_interieur", "value": "humidite_faible" },
  { "id": "6", "question": "agressivite", "value": "moyen" },
  { "id": "7", "question": "sulfates", "value": true },
  { "id": "8", "question": "application", "value": "inconnu" },
  { "id": "9", "question": "type_beton", "value": "classique" },
  { "id": "10", "question": "resistance_calculee", "value": true },
  { "id": "11", "question": "resistance", "value": "C35/45" },
  { "id": "12", "question": "epaisseur_element", "value": "40" },
  { "id": "13", "question": "diametre_armature", "value": "0.7" },
  { "id": "14", "question": "enrobage", "value": "20" },
  { "id": "15", "question": "armatures_serrees", "value": true },
  { "id": "16", "question": "mode_dechargement", "value": "pompe_lt_50m" },
  { "id": "17", "question": "city_pompe", "value": true },
  { "id": "18", "question": "duree_dechargement", "value": "30" },
  { "id": "19", "question": "chantier_accessible_camion", "value": "oui" },
  { "id": "20", "question": "information_complementaire" }
]');

INSERT INTO casting_templates (template_type, template_data)
VALUES ('sols', '[
  { "id": "1", "question": "type_element", "value": "sols" },
  { "id": "2", "question": "type_sol", "value": "terrasses" },
  { "id": "3", "question": "environnement", "value": "interieur" },
  { "id": "4", "question": "environnement_interieur", "value": "humidite_faible" },
  { "id": "5", "question": "agressivite", "value": "nul" },
  { "id": "6", "question": "type_beton", "value": "classique" },
  { "id": "7", "question": "resistance_calculee", "value": true },
  { "id": "8", "question": "resistance", "value": "C40/50" },
  { "id": "9", "question": "beton_armee_fibres", "value": true },
  { "id": "10", "question": "epaisseur_element", "value": "40.2" },
  { "id": "11", "question": "granulats_recycles", "value": "oui" },
  { "id": "12", "question": "mode_dechargement", "value": "pompe_lt_50m" },
  { "id": "13", "question": "city_pompe", "value": true },
  { "id": "14", "question": "duree_dechargement", "value": "30" },
  { "id": "15", "question": "chantier_accessible_camion", "value": "oui" },
  { "id": "16", "question": "information_complementaire" }
]');

