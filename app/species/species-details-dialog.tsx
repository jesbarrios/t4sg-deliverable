"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

type Species = Database["public"]["Tables"]["species"]["Row"] & {
  profiles: Pick<Database["public"]["Tables"]["profiles"]["Row"], "display_name" | "email"> | null;
};

export default function SpeciesDetailsDialog({
  species,
  trigger,
}: {
  species: Species;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {species.scientific_name}
            {species.common_name && (
              <span className="block text-lg font-light italic text-muted-foreground">
                {species.common_name}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {species.image && (
          <div className="relative h-60 w-full overflow-hidden rounded-lg">
            <Image
              src={species.image}
              alt={species.scientific_name}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform"
            />
          </div>
        )}

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-semibold">Description</h4>
            <p className="text-muted-foreground">{species.description ?? "No description available."}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Kingdom</h4>
              <p className="text-muted-foreground capitalize">{species.kingdom.toLowerCase()}</p>
            </div>
            <div>
              <h4 className="font-semibold">Population</h4>
              <p className="text-muted-foreground">
                {species.total_population?.toLocaleString() ?? "Unknown"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Conservation Status</h4>
              <div className="mt-1 flex items-center">
                <span
                  className={`inline-flex h-2 w-2 rounded-full ml-1 ${
                    species.endangered ? "outline outline-2 outline-red-600" : "outline outline-2 outline-gray-300"
                  }`}
                />
                <span className={`ml-2 ${species.endangered ? "text-red-600" : "text-gray-300"}`}>
                  {species.endangered ? "Endangered" : "Not Endangered"}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Added by</h4>
              <p className="text-muted-foreground">
                {species.profiles?.display_name ?? "Unknown"} ({species.profiles?.email})
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
