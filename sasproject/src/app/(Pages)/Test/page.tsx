"use client";

import { supabase } from "@/Lib/Supabase";

export default function TestPage() {

  const testConnection = async () => {

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);


    console.log("DATA:", data);
    console.log("ERROR:", error);

  };


  return (
    <div className="p-10">
      <button
        onClick={testConnection}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Test Supabase
      </button>
    </div>
  );
}