import {supabaseClient} from "@/api/utils";
import React, {useState} from "react";
import {useAuth} from "@clerk/nextjs";

export const AddTodoForm = () => {
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
    if (!userId) {
      return
    }
    const {data} = await supabase
    .from("post")
    .insert({title: newTodo, testField: "", user_id: userId})
    .select()

    setNewTodo("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <input className={"text-black"} onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
        &nbsp;
        <button>Add Todo</button>
      </form>
  );
};
