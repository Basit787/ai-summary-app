import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UploadTextFileDialog from "./new"
import { useDocuments } from "./api/hook"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  const { data = [], isLoading } = useDocuments()
  console.log("data",data)
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>

          <p className="text-muted-foreground">
            Upload and manage your text documents.
          </p>
        </div>

        <UploadTextFileDialog />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading documents...
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              data.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    {document.filename}
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
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {document.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
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
