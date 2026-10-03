import { Card } from "@/components/ui/Card";
import { PageBody, PageHeader, Skeleton } from "@/components/ui/Layout";

export default function Loading() {
  return (
    <>
      <PageHeader title="Transactions" description="Track every recharge, bill payment and loan application." icon="🧾" />
      <PageBody size="narrow" className="flex flex-col gap-5">
        <Skeleton className="h-36" />
        <Card padding="none" className="divide-y divide-slate-100">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="size-12 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </Card>
      </PageBody>
    </>
  );
}
