import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <span className="font-bold text-foreground text-xl tracking-tight">
            Muxer
          </span>
        </div>
        <p className="animate-pulse text-muted-foreground text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
}
