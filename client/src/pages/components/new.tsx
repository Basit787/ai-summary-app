import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useUploadDocument } from "../api/hook";

const MAX_FILE_SIZE = 5 * 1024 * 1024

const schema = z.object({
  file: z
    .instanceof(File, {
      message: "Please select a file.",
    })
    .refine((file) => file.name.endsWith(".txt"), {
      message: "Only .txt files are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Maximum file size is 5MB.",
    }),
})

type FormValues = z.infer<typeof schema>

export default function UploadTextFileDialog() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const { mutate: uploadMutation, isPending: isUploadPending } =
    useUploadDocument()

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      file: undefined,
    },
  })

  const file = watch("file")

  const onSubmit = (values: FormValues) => {
    uploadMutation(values.file, {
      onSuccess: () => {
        reset()
        setOpenDialog(false)
      },
    })
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button onClick={() => setOpenDialog(true)}>Add File</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Text File</DialogTitle>

          <DialogDescription>
            Upload a .txt document for processing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Document</FieldLegend>

              <FieldDescription>
                Only plain text (.txt) files are supported.
              </FieldDescription>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="file">Text File</FieldLabel>

                  <Input
                    id="file"
                    type="file"
                    accept=".txt"
                    onChange={(e) => {
                      const selected = e.target.files?.[0]

                      setValue("file", selected as File, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }}
                  />

                  <FieldDescription>Maximum file size: 5 MB</FieldDescription>

                  {file && (
                    <p className="text-sm text-muted-foreground">
                      Selected: <strong>{file.name}</strong>
                    </p>
                  )}

                  {errors.file && (
                    <p className="text-sm text-destructive">
                      {errors.file.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal">
              <Button type="submit" disabled={!isValid || isUploadPending}>
                {isUploadPending ? "Uploading..." : "Upload"}
              </Button>

              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
