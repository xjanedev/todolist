import { useState, useMemo, useContext } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { TodoStateContext } from "../TodoContext";

export default function TodoList() {
  const todos = useContext(TodoStateContext);

  const [search, setSearch] = useState("");

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const filterTodos = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter(todo =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // 다시 수행시키고 싶지 않은 연산

    // 새로고침하거나 액션이 변경될때마다 호출이 감
    const totalCount = todos.length;
    const doneCount = todos.filter(todo => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className='TodoList'>
      <h4>Todos</h4>
      <div>
        <div>전체 Todo : {totalCount}</div>
        <div>완료 Todo : {doneCount}</div>
        <div>미완 Todo : {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요'
      />
      <div className='todos_wrapper'>
        {filterTodos().map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
}
