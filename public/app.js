const actionBtn = document.getElementById("action-button");

const makeNote = document.getElementById("make-new");

function getResults() {
    //clearTodos();
    fetch("/all")
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            response.json().then(function(data) {
                newWorkout(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error", err);
        });
}

function newWorkout(res) {
    for (var i = 0; i < res.length; i++) {
        let data_id = res[i]["_id"];
        let workoutType = res[i]["title"];
        let workoutList = document.getElementById("results");
        snippet = `
      <li class="data-entry">
      <span class="dataTitle" data-id=${data_id}>${workoutType}</span>
      </li>`;
        workoutList.insertAdjacentHTML("beforeend", snippet);
    }
}

function resetTitleAndNote() {
    //const note = document.getElementById("note");
    //note.value = "";
    const title = document.getElementById("title");
    title.value = "";
}

getResults();

actionBtn.addEventListener("click", function(e) {
    if (e.target.matches("#updater")) {
        updateBtnEl = e.target;
        data_id = updateBtnEl.getAttribute("data-id");
        const title = document.getElementById("title").value;
        //const note = document.getElementById("note").value;
        fetch("/update/" + data_id, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    //note
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                element.innerText = title
                resetTitleAndNote();
                let newButton = `<button id='make-new'>Submit</button>`;
                actionBtn.innerHTML = newButton;
                status.innerText = "Creating"
            })
            .catch(function(err) {
                console.log("Fetch Error", err);
            });
    } else if (e.target.matches("#make-new")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/submit", {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: document.getElementById("title").value,
                    //note: document.getElementById("note").value,
                    created: Date.now()
                })
            })
            .then(res => res.json())
            .then(res => newWorkout([res]));
        resetTitleAndNote();
    }
});