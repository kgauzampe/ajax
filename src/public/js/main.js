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

	let tdvisitorid = document.createElement('td');
	tdvisitorid.innerHTML = visitor.visitorid;
	row.appendChild(tdvisitorid);

	
	let tdvisitorName = document.createElement('td');
	tdvisitorName.innerHTML = visitor.visitorname;
	row.appendChild(tdvisitorName)


	let tdvisitorAge = document.createElement('td');
	tdvisitorAge.innerHTML = visitor.visitorage;
	row.appendChild(tdvisitorAge);

	let tdDateOfVisit = document.createElement('td');
	tdDateOfVisit.innerHTML = new Date(visitor.dateofvisit).toLocaleDateString();
	row.appendChild(tdDateOfVisit);

	let tdTimeOfVisit = document.createElement('td');
	tdTimeOfVisit.innerHTML = visitor.timeofvisit;
	row.appendChild(tdTimeOfVisit);

	let tdAssistant = document.createElement('td');
	tdAssistant.innerHTML = visitor.nameofassistant;
	row.appendChild(tdAssistant);

	let tdComments = document.createElement('td');
	tdComments.innerHTML = visitor.comments;
	row.appendChild(tdComments);
	

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
	const res = await fetch(`/deleteContent/${id}`, {
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
