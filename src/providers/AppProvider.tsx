
import { CustomQueryProvider } from "@providers/QueryProvider";
import { ICommons } from "@utils/utils";

export default async function AppProvider({ children }: ICommons) {
  return (
    <CustomQueryProvider>
      {children}
    </CustomQueryProvider>
  );
}
