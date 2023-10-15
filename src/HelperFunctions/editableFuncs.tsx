/* eslint-disable react/jsx-props-no-spreading */
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  ButtonGroup, Flex, IconButton, useEditableControls,
} from '@chakra-ui/react';

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup ml={2}>
      <IconButton size="sm" icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
      <IconButton size="sm" icon={<CloseIcon />} aria-label="Cancel" {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex ml={2}>
      <IconButton size="sm" icon={<EditIcon />} aria-label="Edit" {...getEditButtonProps()} />
    </Flex>
  );
}

export default EditableControls;
