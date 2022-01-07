const plusBtn = document.querySelector("#plusBtn");
const addTask = document.querySelector("#addTask");

addTask.addEventListener("submit", async (e) => {
  e.preventDefault();

  const obj = {
    title: addTask.title.value,
    completed: addTask.isCompleted.value,
  };

  console.log(obj);

  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      obj
    );
    console.log(res);
    alert("Jo'natildi");
  } catch (error) {
    console.log(error);
  }
});
