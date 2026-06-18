const addTasksBtn = document.querySelector("#addTasksBtn");
const addTasksInput = document.querySelector("#addTasksInput");
const taskContainer = document.querySelector("#tasks__container");

// del tasks
const delTask = (delBtn, tasksEl) => {
  delBtn.addEventListener("click", () => {
    tasksEl.remove();
  });
};

// edit tasks
const editTask = (tasksP, editBtn) => {
  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    const saveBtn = document.createElement("button");

    editInput.value = tasksP.textContent;
    saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>`;

    tasksP.replaceWith(editInput);
    editBtn.replaceWith(saveBtn);

    editInput.focus();
    save(tasksP, editInput, saveBtn, editBtn);
  });
};

// save tasks
const save = (tasksP, editInput, saveBtn, editBtn, chekbox) => {
  saveBtn.addEventListener("click", () => {
    const newText = editInput.value.trim();
    if (newText.trim() === "") {
      alert("Error");
      return;
    }

    tasksP.textContent = newText;

    editInput.replaceWith(tasksP);
    saveBtn.replaceWith(editBtn);
  });
};

// chekbox tasks
const createCheckbox = (tasksP, editBtn, delBtn) => {
  const chekbox = document.createElement("input");

  chekbox.type = "checkbox";

  chekbox.addEventListener("change", () => {
    tasksP.classList.toggle("completed", chekbox.checked);
    editBtn.classList.toggle("hidden", chekbox.checked);
    delBtn.classList.toggle("hidden", chekbox.checked);
  });
  return chekbox;
};

// add tasks
const addTask = () => {
  addTasksBtn.addEventListener("click", () => {
    const user = addTasksInput.value;
    if (user.trim() === "") {
      alert("Error");
      return;
    }

    const tasksEl = document.createElement("div");
    const tasksP = document.createElement("p");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const buttonsBlock = document.createElement("div");

    // css
    tasksEl.classList.add("tasksEl");
    tasksP.classList.add("tasksP");
    buttonsBlock.classList.add("buttonsBlock");
    editBtn.classList.add("editBtn");
    delBtn.classList.add("delBtn");

    tasksP.textContent = user;

    const chekbox = createCheckbox(tasksP, editBtn, delBtn);

    taskContainer.append(tasksEl);
    buttonsBlock.append(editBtn, delBtn, chekbox);
    tasksEl.append(tasksP, buttonsBlock);

    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

    addTasksInput.value = "";
    delTask(delBtn, tasksEl);
    editTask(tasksP, editBtn);
  });
};
addTask();
