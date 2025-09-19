"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Database } from "@/lib/schema";
import SpeciesCard from "./species-card";

type Species = Database["public"]["Tables"]["species"]["Row"] & {
  profiles: Pick<Database["public"]["Tables"]["profiles"]["Row"], "display_name" | "email"> | null;
};

export default function SpeciesList({
  species,
  userId,
}: {
  species: Species[];
  userId: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecies = species.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.scientific_name.toLowerCase().includes(query) ||
      (s.common_name?.toLowerCase() ?? "").includes(query) ||
      (s.description?.toLowerCase() ?? "").includes(query)
    );
  });

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w"
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredSpecies.map((species) => (
          <SpeciesCard key={species.id} species={species} userId={userId} />
        ))}
      </div>

      {filteredSpecies.length === 0 && (
        <p className="text-center text-muted-foreground">No species found matching your search.</p>
      )}
    </div>
  );
}
