"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, EmptyState } from "@/components/ui/Layout";

export default function SiteError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <Container className="py-16">
      <Card className="mx-auto max-w-lg">
        <EmptyState
          icon="⚠️"
          title="Something went wrong"
          description="Please try again. If the problem continues, contact support."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => retry()}>Try again</Button>
              <ButtonLink href="/support" variant="outline">
                Get Help
              </ButtonLink>
            </div>
          }
        />
      </Card>
    </Container>
  );
}
