import {supabaseClient} from "@/api/utils";
import {useState} from "react";
import {useAuth} from "@clerk/nextjs";

export const AddTodoForm = ({todos, setTodos}) => {
  const {getToken, userId} = useAuth();
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo === "") {
      return;
    }

    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const {data} = await supabase
    .from("todos")
    .insert({title: newTodo, user_id: userId})
    .select()

    setTodos([...todos, data[0]]);
    setNewTodo("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
        &nbsp;
        <button>Add Todo</button>
      </form>
  );
};
