import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";

type SheetContextType = {
  open: (content: ReactNode, snaps?: string[]) => void;
  close: () => void;
};

const SheetContext = createContext<SheetContextType | null>(null);

export const useSheet = () => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used within a SheetProvider");
  return ctx;
};

const DEFAULT_SNAP_POINTS: string[] = ["40%"];

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const [snapControl, setSnapControl] = useState<string[]>(DEFAULT_SNAP_POINTS);

  const open = useCallback((node: ReactNode, snap?: string[]) => {
    setContent(node);
    setSnapControl(snap || DEFAULT_SNAP_POINTS);
    requestAnimationFrame(() => bottomSheetRef.current?.present());
  }, []);

  const close = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        pressBehavior="close"
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <SheetContext.Provider value={value}>
      {children}
      <BottomSheetModal
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={snapControl}
        index={0}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          {content}
        </BottomSheetView>
      </BottomSheetModal>
    </SheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
  },
});
