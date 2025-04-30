import { useDispatch, useSelector } from 'react-redux';

import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { Button, Dialog, Grid, TextField, Tooltip, Typography } from '@mui/material';

import { RootState } from '../../app/store';
import { closeConfirmationModal } from '../../store/modal/modalStore';
import { LayoutStyles } from '../layouts/LayoutStyles';

type ModalType = "delete" | "edit" | "finish" | "create";

function ConfirmationModal() {
  const dispatch = useDispatch();
  const {isOpen, type, description, title} = useSelector((state: RootState) => state.modalStore);

  const iconMap = {
    delete: <AutoDeleteOutlinedIcon sx={{fontSize: 56}} />,
    edit: <DriveFileRenameOutlineOutlinedIcon sx={{fontSize: 56}} />,
    finish: <ChecklistOutlinedIcon sx={{fontSize: 56}} />,
    create: <EditCalendarOutlinedIcon sx={{fontSize: 56}} />,
  };
  const buttonName = {
    delete: "Delete",
    edit: "Edit",
    finish: "Finish",
    create: "Create",
  };

  function closeModal() {
    dispatch(closeConfirmationModal());
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {borderRadius: "20px"},
        }}>
        <Grid sx={{display: "flex", justifyContent: "flex-end", p: 3}}>
          <Tooltip title="Close Modal" placement="bottom">
            <CloseOutlinedIcon
              onClick={closeModal}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#ed3419",
                },
              }}
            />
          </Tooltip>
        </Grid>
        <Grid direction={"column"} justifyItems={"center"} px={4}>
          <Grid sx={{border: "1px solid #d3d3d3", borderRadius: "20px", backgroundColor: "white", p: 5}}>
            <Grid container display={"flex"} justifyContent={"center"} sx={{pb: 3}}>
              {iconMap[(type ?? "delete") as ModalType]}
            </Grid>
            <Typography fontWeight={"bold"}>{title}</Typography>
            <Typography>{description}</Typography>
            {(type === "edit" || type === "create") && (
              <Grid container direction={"column"} gap={1.5} pt={1}>
                <TextField fullWidth label="Title" id="standard-size-normal" variant="standard" />
                <TextField fullWidth label="Description" id="standard-size-normal" variant="standard" />
                <TextField fullWidth label="Duration" id="standard-size-normal" variant="standard" />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container sx={{display: "flex", justifyContent: "flex-end", gap: 1, pt: 2, pb: 2, px: 4}}>
          <Button onClick={closeModal} sx={LayoutStyles.EditButton}>
            Cancel
          </Button>
          <Button sx={LayoutStyles.actionButton}>{buttonName[type as keyof typeof buttonName]}</Button>
        </Grid>
      </Dialog>
    </div>
  );
}

export default ConfirmationModal;
