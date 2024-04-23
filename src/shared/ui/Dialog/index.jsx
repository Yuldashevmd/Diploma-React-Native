import { Dialog, Portal } from "react-native-paper";

export const SweetDialog = (props) => {
  const { open, close, title, content, footer } = props;

  return (
    <Portal>
      <Dialog visible={open} onDismiss={close}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{content}</Dialog.Content>
        <Dialog.Actions>{footer}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
