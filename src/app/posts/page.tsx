"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { AddTodoForm } from "@/components/AddTodoForm";
import { getAllChatsForUser } from "@/api/utils";
import { useSupabaseClient } from "@/context/supabaseContext";

export default function Test() {
  const { session } = useSession();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [todosResults, setTodos] = useState<
    {
      created_at: string | null;
      id: number;
      title: string | null;
      user_id: string | null;
    }[]
  >();
  useEffect(() => {
    const loadTodos = async () => {
      console.log("vlad");
      try {
        setLoading(true);

        const { data: todos } = await supabase.from("post").select("*");
        //const chats = await getAllChatsForUser(supabase, session?.user.id);
        //console.log("chats", chats);
        if (todos) {
          setTodos(todos);
        }
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [session, supabase]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddTodoForm todos={todosResults} setTodos={setTodos} />
      {todosResults?.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.created_at}</p>
          <p>{todo.title}</p>
          <p>{todo.user_id}</p>
        </div>
      ))}
    </main>
  );
}
