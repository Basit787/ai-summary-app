import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: string
  filename: string
  status: string
  summary: string | null
  created_at: string
}

interface ViewDocumentDialogProps {
  document: Document
}

const ViewDocument = ({ document }: ViewDocumentDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{document.filename}</DialogTitle>

          <DialogDescription>
            Document details and AI summary.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>

              <Badge>{document.status}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Uploaded At</p>

              <p>{new Date(document.created_at).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">AI Summary</h3>

            <div className="min-h-40 rounded-lg border p-4">
              {document.summary ? (
                <p className="whitespace-pre-wrap">{document.summary}</p>
              ) : (
                <p className="text-muted-foreground">
                  Summary not generated yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewDocument
