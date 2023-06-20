psql -v ON_ERROR_STOP=1 --username "postgres" -d "TFE_2023"  <<-EOSQL

        CREATE TABLE roles(
            role_id serial PRIMARY KEY,
            role_description VARCHAR(50)

        );



        CREATE TABLE users( 
        user_id serial PRIMARY KEY,
        user_name VARCHAR(30) NOT NULL,
        user_surname VARCHAR(20) NOT NULL, 
        user_email VARCHAR(40) NOT NULL, 
        user_password VARCHAR(200) NOT NULL, 
        user_compagny VARCHAR(200) NOT NULL,
        role_id INTEGER NOT NULL,
        CONSTRAINT fk_role
            FOREIGN KEY(role_id) 
                REFERENCES roleS(role_id)
                
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

        CREATE TABLE castings (
        casting _id SERIAL PRIMARY KEY,
        casting_name VARCHAR NOT NULL,
        casting_description TEXT ,
        template_id INT NOT NULL,
        project_id INT NOT NULL, 
        CONSTRAINT fk_template
            FOREIGN KEY (template_id)
            REFERENCES templates (id)
        CONSTRAINT fk_project
            FOREIGN KEY ( project_id)
            REFERENCES projects ( project_id)
        );

        CREATE TABLE templates (
        template_id SERIAL PRIMARY KEY,
        template_category VARCHAR NOT NULL,
        template_subcategory VARCHAR NOT NULL,
        template_json_data JSON
        );


        INSERT INTO roles (role_id, role_description) values (DEFAULT ,'ADMIN');
        INSERT INTO roles (role_id, role_description) values (DEFAULT ,' SIMPLE USER');

EOSQL