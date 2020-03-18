//"use strict"

require("dotenv").config(); 

const { Client } = require("pg");

let client = new Client()
client.connect()


console.log(process.env.PGUSER);

//creating database

const createdb = async () =>{ 
	
	try {
		const query = await client.query(
			`CREATE DATABASE visitorlog;`
        )
		console.log(query)
	
	} catch(e) {
		console.log(e);
	
	}
}
// createdb();

//creating the table

const createTable = async () =>{ 
	
	try {
		const query = await client.query(
			`CREATE TABLE   
				visitors(
                    visitorID SERIAL NOT NULL,
                    visitorName varchar(50),
                    visitorAge int,
                    dateOfVisit date,
                    timeOfVisit time,
                    nameOfAssistant varchar(50),
                    comments varchar,
                    PRIMARY KEY(visitorID));`
        )
		console.log(query)
	
	} catch(e) {
		console.log(e);

	}
}

//createTable()

//display content of table
const displayAll  = async() =>{
	let text, values, query;
	text = `select * From visitors`
	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		
	} catch(e) {
		console.log(e);
	
	}
}
//displayAll();
// Insert the content
const addContent  = async() =>{
	let text, query;
	//data = [visitorName,visitorAge,dateOfVisit,timeOfVisit,nameOfAssistant,comments];
	let values = ['Kgaugelo', 27, '02/02/2020', '10:38', 'Portia', 'No comment']
	text = `INSERT INTO 
				visitors(
                    visitorName,
                    visitorAge,
                    dateOfVisit,
                    timeOfVisit,
                    nameOfAssistant,
                    comments) 
					VALUES($1,$2,$3, $4, $5, $6) 
				RETURNING *`
	

	try {
		query = await client.query(text,values)
		return query.rows;

	} catch(e) {
		console.log("ERROR",e);
	}
	finally{
		
		
	}
}
addContent();

// delete visitor from list
const deleteContent  = async() =>{
	let text, values, query;
	text = `DELETE FROM visitors WHERE visitorID = 3`

	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		
	} catch(e) {
		console.log(e);
		
	}
}
//deleteContent();

// update visitor log

const updateContent  = async() =>{
	let text, values, query;
	text = ` Update visitors
   			 SET nameOfAssistant = 'Mpumelelo', comments = 'It is a nice building'
    		 WHERE visitorID = 1 `

	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
	
	} catch(e) {
		console.log(e);
	
	}
}

//updateContent();

//display content of a single visitor
const displayOneContent  = async() =>{
	let text, values, query;
	text = `select * From visitors WHERE visitorID = 01`
	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		
	} catch(e) {
		console.log(e);
		
	}
}
//displayOneContent();

//delete all visitors
const deleteall  = async() =>{
	let text, values, query;
	text = `delete From visitors`
	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		
	} catch(e) {
		console.log(e);
	
	}
}

deleteall();

module.exports = {
	createdb,
	addContent,
	createTable,
	displayAll,
	updateContent,
	displayOneContent,
	deleteall

}