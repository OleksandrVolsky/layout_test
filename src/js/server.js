const addTasksBtn = document.querySelector("#addTasksBtn");
const addTasksInput = document.querySelector("#addTasksInput");
const taskContainer = document.querySelector("#tasks__container");

const API_URL = "http://localhost:3000/api/tasks";

const EDIT_ICON = "✏️";
const DELETE_ICON = "🗑️";
const SAVE_ICON = "💾";

// отримати всі задачі з сервера
const getTasksFromServer = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    alert("Помилка при отриманні задач");
    return [];
  }

  return await res.json();
};

// додати задачу на сервер
const addTaskToServer = async (title) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    alert("Помилка при додаванні задачі");
    return null;
  }

  return await res.json();
};

// видалити задачу з сервера
const deleteTaskFromServer = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("Помилка при видаленні задачі");
    return false;
  }

  return true;
};

// оновити задачу на сервері
const updateTaskOnServer = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    alert("Помилка при оновленні задачі");
    return null;
  }

  return await res.json();
};

// стилі для виконаної задачі
const setCompletedStyle = (tasksP, editBtn, delBtn, isCompleted) => {
  tasksP.classList.toggle("completed", isCompleted);
  editBtn.classList.toggle("hidden", isCompleted);
  delBtn.classList.toggle("hidden", isCompleted);
};

// checkbox tasks
const createCheckbox = (task, tasksP, editBtn, delBtn) => {
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.checked = task.done;

  setCompletedStyle(tasksP, editBtn, delBtn, task.done);

  checkbox.addEventListener("change", async () => {
    const updatedTask = await updateTaskOnServer(task.id, {
      done: checkbox.checked,
    });

    if (!updatedTask) {
      checkbox.checked = !checkbox.checked;
      return;
    }

    setCompletedStyle(tasksP, editBtn, delBtn, updatedTask.done);
  });

  return checkbox;
};

// del tasks
const delTask = (delBtn, taskId) => {
  delBtn.addEventListener("click", async () => {
    const isDeleted = await deleteTaskFromServer(taskId);

    if (isDeleted) {
      renderTasks();
    }
  });
};

// save tasks
const save = (taskId, tasksP, editInput, saveBtn, editBtn) => {
  saveBtn.addEventListener("click", async () => {
    const newText = editInput.value.trim();

    if (newText === "") {
      alert("Error");
      return;
    }

    const updatedTask = await updateTaskOnServer(taskId, {
      title: newText,
    });

    if (!updatedTask) return;

    renderTasks();
  });
};

// edit tasks
const editTask = (taskId, tasksP, editBtn) => {
  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    const saveBtn = document.createElement("button");

    editInput.value = tasksP.textContent;
    saveBtn.textContent = SAVE_ICON;

    tasksP.replaceWith(editInput);
    editBtn.replaceWith(saveBtn);

    editInput.focus();

    save(taskId, tasksP, editInput, saveBtn, editBtn);
  });
};

// створення однієї задачі в DOM
const createTaskElement = (task) => {
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

  tasksP.textContent = task.title;

  editBtn.textContent = EDIT_ICON;
  delBtn.textContent = DELETE_ICON;

  const checkbox = createCheckbox(task, tasksP, editBtn, delBtn);

  buttonsBlock.append(editBtn, delBtn, checkbox);
  tasksEl.append(tasksP, buttonsBlock);

  delTask(delBtn, task.id);
  editTask(task.id, tasksP, editBtn);

  return tasksEl;
};

// показати всі задачі з сервера
const renderTasks = async () => {
  const tasks = await getTasksFromServer();

  taskContainer.replaceChildren();

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskContainer.append(taskElement);
  });
};

// add tasks
const addTask = () => {
  addTasksBtn.addEventListener("click", async () => {
    const user = addTasksInput.value.trim();

    if (user === "") {
      alert("Error");
      return;
    }

    const newTask = await addTaskToServer(user);

    if (!newTask) return;

    addTasksInput.value = "";

    renderTasks();
  });
};

addTask();
renderTasks();
