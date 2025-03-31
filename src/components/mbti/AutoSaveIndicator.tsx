
import { Save } from "lucide-react";

const AutoSaveIndicator = () => {
  return (
    <div className="flex justify-center mt-4">
      <div className="text-xs text-muted-foreground flex items-center">
        <Save className="h-3 w-3 mr-1" />
        Progress auto-saved. You can continue later.
      </div>
    </div>
  );
};

export default AutoSaveIndicator;
