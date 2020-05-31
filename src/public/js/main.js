async function  addNewVisitor() {
    let name = document.getElementById("name").value;
    let assistant = document.getElementById("assistant").value;
    let age = document.getElementById("age").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let comment = document.getElementById("comment").value;

    let userObject = {name, assistant, age, date, time, comment};
    let forward = await fetch('/addNewVisitor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    } )
    let response = await forward.json();
    console.log(response);
}

const createRows = visitors => {
	const tbody = document.getElementById('visitors');

	for (let i = 0; i < visitors.length; i++) {
		let row = createColumns(visitors[i]);

		
		row.setAttribute('id', `visitor-${visitors[i].visitorid}`);
		tbody.prepend(row);
	}
}

const createColumns = visitor => {

	
	let row = document.createElement('tr');

	let eltdvisitorid = document.createElement('td');
	eltdvisitorid.innerHTML = visitor.visitorid;
	row.appendChild(eltdvisitorid);

	
	let eltdvisitorName = document.createElement('td');
	eltdvisitorName.innerHTML = visitor.visitorname;
	row.appendChild(eltdvisitorName)


	let eltdvisitorAge = document.createElement('td');
	eltdvisitorAge.innerHTML = visitor.visitorage;
	row.appendChild(eltdvisitorAge);

	let eltdDateOfVisit = document.createElement('td');
	eltdDateOfVisit.innerHTML = new Date(visitor.dateofvisit).toLocaleDateString();
	row.appendChild(eltdDateOfVisit);

	let eltdTimeOfVisit = document.createElement('td');
	eltdTimeOfVisit.innerHTML = visitor.timeofvisit;
	row.appendChild(eltdTimeOfVisit);

	let eltdAssistant = document.createElement('td');
	eltdAssistant.innerHTML = visitor.nameofassistant;
	row.appendChild(eltdAssistant);

	let eltdComments = document.createElement('td');
	eltdComments.innerHTML = visitor.comments;
	row.appendChild(eltdComments);
	

	const button = DeleteButton(visitor.visitorid);
	row.appendChild(button);

	return row;
}



const DeleteButton = id => {
	let tdDelete = document.createElement('tdDelete');
	tdDelete.innerHTML = `<button onclick="deleteRow(${id})">X</button>`;

	return tdDelete;
}

const deleteRow = async(id) => {
	const tbody = document.getElementById('visitors');
	const row = document.getElementById(`visitor-${id}`);
	const res = await fetch(`/deleteVisitor/${id}`, {
		method: 'delete'
	});

	const data = await res.json();

	if (data.status == 'ok') {

		tbody.removeChild(row);
	}
}


const viewVisitors = async() => {
    const res = await fetch('/viewVisitors');
    const data = await res.json();

    createRows(data.visitors);
}
viewVisitors();
