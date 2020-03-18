CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    name varchar(60),
    age int,
    dateOfVisit date,
    timeOfVisit time,
    nameOfAssistant varchar(60),
    comments text
);