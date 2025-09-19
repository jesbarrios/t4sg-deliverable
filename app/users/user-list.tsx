"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Database } from "@/lib/schema";
import UserCard from "./user-card";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function UserList({
  profiles,
}: {
  profiles: Profile[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = profiles.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.display_name.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query) ||
      (p.biography?.toLowerCase() || "").includes(query)
    );
  });

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredProfiles.map((profile) => (
          <UserCard key={profile.id} profile={profile} />
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <p className="text-center text-muted-foreground">No users found matching your search.</p>
      )}
    </div>
  );
}
