"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Terminal() {
  const [command, setCommand] = useState("");
  const router = useRouter();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase();
    
    // Map commands to app routes
    const routes: Record<string, string> = {
      "open editor": "/apps/editor",
      "open calculator": "/apps/calculator",
      "open browser": "/apps/browser",
    };

    if (routes[cmd]) {
      router.push(routes[cmd]);
    } else {
      alert("Unknown command");
    }
  };

  return (
    <div>
      <h1>Welcome to Lumon OS</h1>
      <form onSubmit={handleCommand}>
        <span>$ </span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button type="submit">Run</button>
      </form>
    </div>
  );
}