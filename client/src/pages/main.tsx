import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UploadTextFileDialog from "./components/new"
import { useDocuments } from "./api/hook"
import ViewDocument from "./components/view"
import { ModeToggle } from "@/components/mode-toggle"
import DeleteDocumentDialog from "./components/delete";

const HomePage = () => {
  const { data = [], isLoading } = useDocuments()
  console.log("data", data)
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Upload and manage your text documents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UploadTextFileDialog />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[280px]">File Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading documents...
                </TableCell>
              </TableRow>
            ) : data.length ? (
              data.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{document.filename}</span>
                      <span className="text-xs text-muted-foreground">
                        {document.id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        document.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : document.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-700"
                            : document.status === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {document.status}
                    </span>
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <p className="truncate text-muted-foreground">
                      {document.summary ?? "Summary not generated"}
                    </p>
                  </TableCell>

                  <TableCell>
                    {new Date(document.created_at).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(document.updated_at).toLocaleString()}
                  </TableCell>

                  <TableCell className="flex gap-2 items-center justify-end">
                    <ViewDocument document={document} />
                    <DeleteDocumentDialog id={document.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default HomePage
