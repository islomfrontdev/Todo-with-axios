const createElement = (tagName, className, innerHTML) => {
  const element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  element.className = className;

  return element;
};
const getTodos = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return res.data;
  } catch (error) {
    return [];
  }
};

const completed = document.querySelector("#completed");
const unCompleted = document.querySelector("#unCompleted");
const form = document.querySelector("#form");
const body = document.querySelector("body");
const input = document.querySelector("#inputTask");
const renderTodos = async () => {
  const data = await getTodos();
  data.map((item) => {
    input.focus();
    const li = createElement(
      "li",
      " d-flex align-items-center justify-content-between mb-1  m-0 px-2",
      ""
    );

    const left = createElement("div", "d-flex align-items-center", "");
    li.append(left);

    const check = createElement(
      "button",
      "btn check  d-none ",
      `    <i class="fa fa-check"></i>`
    );
    const circle = createElement(
      "button",
      "btn circle",
      `<i class="fa fa-circle-notch"></i>`
    );
    left.append(circle);
    left.append(check);
    if (!item.completed) {
      circle.onmouseover = () => {
        circle.classList.add("d-none");
        check.classList.remove("d-none");
      };
      check.onmouseleave = () => {
        circle.classList.remove("d-none");
        check.classList.add("d-none");
      };
    }

    check.onclick = () => {
      alert("Task done!" + " Task id : " + item.id);
    };
    const task = createElement("input", "", item.title);
    task.readOnly = true;
    task.value = item.title;
    left.append(task);
    const rigth = createElement("div", "d-flex align-items-center gap-2", "");
    li.append(rigth);
    const del = createElement(
      "button",
      "btn ",
      `<i class="fa fa-trash-alt"></i>`
    );
    del.style.color = "#DC3545";
    const edit = createElement(
      "button",
      "btn fs-5",
      `  <i class="fa fa-pencil"></i>`
    );
    edit.style.color = "#FFC11E";
    const ref = createElement(
      "button",
      "btn d-none",
      `<i class="fas fa-redo-alt"></i>`
    );
    const checkTask = createElement(
      "button",
      "btn d-none",
      `<i class="fas fa-check"></i>`
    );

    rigth.append(checkTask);
    rigth.append(ref);
    rigth.append(edit);
    rigth.append(del);
    edit.onclick = () => {
      task.readOnly = false;
      edit.classList.add("d-none");
      ref.classList.remove("d-none");
      checkTask.classList.remove("d-none");
      task.focus();
    };
    ref.onclick = () => {
      edit.classList.remove("d-none");
      ref.classList.add("d-none");
      checkTask.classList.add("d-none");
    };
    checkTask.onclick = () => {
      axios
        .put("https://jsonplaceholder.typicode.com/todos/" + item.id, {
          title: item.title,
          completed: item.completed,
        })
        .then((response) => {
          edit.classList.remove("d-none");
          ref.classList.add("d-none");
          checkTask.classList.add("d-none");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    del.onclick = () => {
      axios
        .delete("https://jsonplaceholder.typicode.com/todos/" + item.id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (item.completed) {
      li.style.textDecoration = "line-through";
      completed.append(li);
      circle.classList.add("d-none");
      check.classList.remove("d-none");
    } else {
      unCompleted.append(li);
    }
  });
};
renderTodos();
const menu = document.querySelector("#menu");
const menuList = document.querySelector(".menuList");
menu.onclick = () => {
  menuList.classList.toggle("d-none");
};
