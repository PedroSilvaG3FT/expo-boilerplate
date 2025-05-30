import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { FormContainer } from "@/_shared/design/components/form";
import AppFormCheckbox from "@/_shared/design/components/form/form-checkbox";
import AppFormInput from "@/_shared/design/components/form/form-input";
import AppFormRadioGroup from "@/_shared/design/components/form/form-radio-group";
import AppFormSelect from "@/_shared/design/components/form/form-select";
import AppFormSwitch from "@/_shared/design/components/form/form-switch";
import AppFormTextarea from "@/_shared/design/components/form/form-textarea";
import { Button } from "@/_shared/design/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_shared/design/ui/dialog";
import { IFormOption } from "@/_shared/interface/_form-option.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  check: z.boolean(),
  switch: z.boolean(),
  text: z.string().min(1, "Required field"),
  radio: z.string().min(1, "Required field"),
  select: z.string().min(1, "Required field"),
  textArea: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
});

interface IFormState extends z.infer<typeof formSchema> {}

export default function FormExample() {
  const [value, setValue] = useState("");

  const options: IFormOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      radio: "",
      select: "",
      textArea: "",
      password: "",
      check: false,
      switch: false,
    },
  });

  function onSubmit(values: IFormState) {
    setValue(JSON.stringify(values, null, 2));
  }

  return (
    <FormContainer {...form}>
      <AppView className="flex flex-col gap-8">
        <AppText type="subtitle" className="font-semibold">
          Form
        </AppText>

        <AppFormInput
          label="Text"
          name="text"
          control={form.control}
          placeholder="Text input"
        />

        <AppFormInput
          name="password"
          label="Password"
          control={form.control}
          placeholder="**********"
        />

        <AppFormTextarea
          name="textArea"
          label="Textarea"
          control={form.control}
          placeholder="Textarea"
        />

        <AppFormSelect
          name="select"
          label="Select"
          options={options}
          control={form.control}
          placeholder="Select option"
        />

        <AppFormRadioGroup
          name="radio"
          label="Radio"
          options={options}
          control={form.control}
        />

        <AppFormSwitch name="switch" label="Switch" control={form.control} />
        <AppFormCheckbox name="check" label="Checkbox" control={form.control} />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4" onPress={form.handleSubmit(onSubmit)}>
              <AppText>Submit</AppText>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form submited</DialogTitle>
              <DialogDescription className="text-left">
                Values inserted in the form
              </DialogDescription>
            </DialogHeader>

            <AppView className="w-[400px] max-w-[80vw]">
              <AppText>{value}</AppText>
            </AppView>

            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <AppText>Back</AppText>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AppView>
    </FormContainer>
  );
}
