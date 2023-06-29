import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "./Task/Task";
import Pages from "../Pages/Pages";
import styles from "./Tasks.module.scss";
import { nanoid } from "nanoid";
import SelectPostModal from "./../SelectPostModal/SelectPostModal";
import Filters from "./Filters/Filters";
import AddTask from "./addTask/addTask";
const Tasks = () => {
  const [todos, setTodos] = useState();
  // отметка чекбокса
  const [checking, setChecking] = useState(false);
  // Фильтры
  const [activeFilter, setActiveFilter] = useState("");
  // сколько страниц выводить
  const [pages, setPages] = useState(localStorage.getItem("pages-tasks"));
  // текст инпута в режиме добавления
  const [newTaskText, setNewTaskText] = useState("");
  // режим добавления таски
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    const API_URL = "https://jsonplaceholder.typicode.com/todos";
    if (pages === "Все") {
      axios.get(API_URL).then((response) => {
        const todos = response.data;
        const filterTodos = todos.sort((x, y) => {
          return x.completed - y.completed;
        });
        setTodos(filterTodos);
      });
    } else {
      axios
        .get(API_URL + `?_start=${0}&_limit=${pages}`)
        .then((response) => {
          const todos = response.data;
          const filterTodos = todos.sort((x, y) => {
            return x.completed - y.completed;
          });
          setTodos(filterTodos);
        })
        .catch((error) => console.log(error.request));
    }
  }, [pages]);
  const sortTodos = (e) => {
    const id = Number(e.target.id);
    // Копия массива
    const copyTodos = [...todos];
    // Ищем нужный todo по id
    const todo = copyTodos.find((todo) => todo.id === id);
    // Копия нужного объекта
    const copyTodo = { ...todo };
    // Присваиваем противоположное значение
    copyTodo.completed = !copyTodo.completed;
    const replaceObject = copyTodos.map((todo) => {
      if (todo.id === id) {
        return copyTodo;
      }
      return todo;
    });
    const sortTodos = replaceObject.sort((x, y) => {
      return x.completed - y.completed;
    });
    setTodos(sortTodos);
  };
  //  Удаление нескольких постов
  const deleteCheckedPosts = () => {
    const inputs = document.getElementsByName("check");
    const inputsArray = [...inputs];
    const inputsFilter = inputsArray.filter((input) => input.checked === true);
    let inputsIndex = [];
    inputsFilter.map((input) => inputsIndex.push(Number(input.id)));
    const filterPosts = todos.filter((todo) => !inputsIndex.includes(todo.id));
    setTodos(filterPosts);
  };
  // Функция фильтрации постов
  const filterFunction = (e) => {
    const id = e.target.id;
    if (activeFilter === id) {
      setActiveFilter("");
      const filterTodos = todos.sort((x, y) => {
        return x.completed - y.completed;
      });
      setTodos(filterTodos);
    } else {
      setActiveFilter(id);
      if (id === "title") {
        const sortTodos = todos.sort((x, y) => {
          if (x.title < y.title) return -1;
          if (x.title > y.title) return 1;
        });
        setTodos(sortTodos);
      }
      if (id === "completed") {
        const filterTodos = todos.sort((x, y) => {
          return y.completed - x.completed;
        });
        setTodos(filterTodos);
      }
    }
  };
  // Добавление новой задачи
  const addNewTask = () => {
    const id = todos.length + 1;
    if (newTaskText !== "") {
      const newTask = {
        userId: 11,
        id: id,
        title: newTaskText,
        completed: false,
      };
      setTodos([newTask, ...todos]);
      setAdding(false);
      axios.post(API_URL + `/todos`, newTask);
    }
  };
  return (
    <>
      <Filters
        filterFunction={filterFunction}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Pages pages={pages} setPages={setPages} item="tasks" />
      <AddTask
        newTaskText={newTaskText}
        setNewTaskText={setNewTaskText}
        addNewTask={addNewTask}
        adding={adding}
        setAdding={setAdding}
      />
      <div className={styles.tasks}>
        {todos &&
          todos.map((todo) => (
            <Task
              checking={checking}
              setChecking={setChecking}
              sortTodos={sortTodos}
              id={todo.id}
              key={nanoid()}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        <SelectPostModal
          deleteCheckedPosts={deleteCheckedPosts}
          checking={checking}
          setChecking={setChecking}
          task={true}
          text="Вы действительно хотите удалить выбранные задачи?"
        />
      </div>
    </>
  );
};

export default Tasks;
