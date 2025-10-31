import { Button } from "@heroui/react";
import { FileChartColumnIcon } from "lucide-react";

import { useRecordStack } from "@/hooks/useRecordStack";
import { useTimeCount } from "@/hooks/useTimeCount";

import { FlameGraphContainer } from "./FlameGraphContainer";
import { FlameGraphSelect } from "./FlameGraphSelect";

const { startLoading, stopLoading, startProcessing, clearStack } = useRecordStack.getActions();

export const FlameGraphView = () => {
  const { loading, processing, state } = useRecordStack((s) => ({ loading: s.loading, processing: s.processing, state: s.state }));

  const { count, onStart, onStop } = useTimeCount();

  if (state.length === 0) {
    return (
      <div className="flameGraph-view h-full flex flex-col items-center justify-center">
        {!loading && <FileChartColumnIcon className="mb-2" />}
        {!loading && <p className="text-lg mb-2">No recorded data. Please start recording to see the flame graph.</p>}
        <Button
          onPress={() => {
            if (!loading) {
              startLoading();
              onStart();
            } else {
              clearStack();
              stopLoading();
              onStop();
              startProcessing();
            }
          }}
          size="sm"
          isLoading={processing}
        >
          {processing ? "Processing" : `${loading ? "Stop" : "Start"} Record ${loading ? `(${count}s)` : ""}`}
        </Button>
      </div>
    );
  }

  return (
    <div className="flameGraph-view h-full">
      <FlameGraphSelect />
      <FlameGraphContainer />
    </div>
  );
};
