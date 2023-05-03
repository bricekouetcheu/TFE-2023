CREATE TABLE role(
    role_id serial PRIMARY KEY,
    description VARCHAR(50)

);
INSERT INTO role (role_id, description) values (DEFAULT ,'LECTURE');
INSERT INTO role(role_id, description) values (DEFAULT ,' LECTURE ET ECRITURE');


CREATE TABLE User( 
 user_id serial PRIMARY KEY,
 user_name VARCHAR(30) NOT NULL,
 user_surname VARCHAR(20) NOT NULL, 
 user_email VARCHAR(40) NOT NULL, 
 user_password VARCHAR(200) NOT NULL, 
 role_id INTEGER NOT NULL,
  CONSTRAINT fk_role
     FOREIGN KEY(role_id) 
        REFERENCES role(role_id)
        
);

CREATE TABLE Project(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255),
    project_address VARCHAR(255),
    project_date DATE DEFAULT CURRENT_DATE,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY (user_id)
            REFERENCES users(user_id)
)