"use client";
import React, {useEffect, useState} from "react";
import {useSession} from "@clerk/nextjs";
import {supabaseClient} from "@/api/utils";
import {AddTodoForm} from "@/components/AddTodoForm";

export default function Test() {
  const {session} = useSession();
  const [loading, setLoading] = useState(true);
  const [todosResults, setTodos] = useState<{
    created_at: string | null
    id: number
    title: string | null
    user_id: string | null
  }[]>();
  useEffect(() => {
    const loadTodos = async () => {
      debugger;

      try {
        setLoading(true);
        const supabaseAccessToken = await session?.getToken({
          template: "supabase",
        });

        const supabase = await supabaseClient(supabaseAccessToken || "");
        const {data: todos} = await supabase.from("todos").select("*");
        console.log(todos)
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
  }, [session]);
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <AddTodoForm todos={todosResults} setTodos={setTodos}/>
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
};