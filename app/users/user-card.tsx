"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Database } from "@/lib/schema";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function UserCard({ profile }: { profile: Profile }) {
  const initials = profile.display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{profile.display_name}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium">Biography</h4>
        <p className="text-muted-foreground">
          {profile.biography ?? "None"}
        </p>
      </div>
    </div>
  );
}
