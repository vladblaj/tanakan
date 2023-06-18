import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useSupabaseClient } from "@/context/supabaseContext";

export const AddTodoForm = () => {
  const { getToken, userId } = useAuth();
  const supabaseClient = useSupabaseClient();
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo === "") {
      return;
    }
    if (!userId) {
      return;
    }
    const { data } = await supabaseClient
      .from("post")
      .insert({ title: newTodo, testField: "", user_id: userId })
      .select();

    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={"text-black"}
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      &nbsp;
      <button>Add Todo</button>
    </form>
  );
};
