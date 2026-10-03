"use client";

import { Button } from "@/components/ui/Button";

/** Opens the browser print dialog; the print stylesheet hides site chrome so it saves as a clean PDF. */
export function PrintReceiptButton() {
  return (
    <Button variant="outline" size="lg" fullWidth onClick={() => window.print()}>
      ⬇ Download Receipt
    </Button>
  );
}
