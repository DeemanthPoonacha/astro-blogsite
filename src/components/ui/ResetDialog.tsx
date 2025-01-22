import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

export function ResetDialog({
  handleReset,
  setShowResetDialog,
  showResetDialog,
}: {
  showResetDialog: boolean;
  setShowResetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
}) {
  return (
    <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Changes</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reset all changes? This will revert
            everything back to the last saved state.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
