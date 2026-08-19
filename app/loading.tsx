import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
      <Loader2 className="animate-spin mb-4 text-oja-teal dark:text-oja-seafoam" size={32} />
      <p className="text-sm">Loading...</p>
    </div>
  );
}
