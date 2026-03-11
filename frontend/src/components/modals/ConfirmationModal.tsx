import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { Button, Dialog, Grid, MenuItem, TextField, Tooltip, Typography } from '@mui/material';

import { RootState } from '../../app/store';
import { closeConfirmationModal } from '../../store/modal/modalStore';
import { setIsLoading } from '../../store/task/taskStore';
import { LayoutStyles } from '../layouts/LayoutStyles';

type ModalType = "delete" | "edit" | "finish" | "create";
interface FormData {
  title: string;
  description: string;
  duration: number;
  done: string;
}

function ConfirmationModal() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    duration: 0,
    done: "undone",
  });
  const dispatch = useDispatch();
  const {isOpen, type, description, title, onConfirm, initialData} = useSelector((state: RootState) => state.modalStore);
  const {isLoading} = useSelector((state: RootState) => state.taskStore);

  const statusValue = [
    {
      label: "done",
      value: "done",
    },
    {
      label: "undone",
      value: "undone",
    },
  ];
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if (name === "isDone") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "done",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function closeModal() {
    dispatch(closeConfirmationModal());
  }

  function getToaster() {
    switch (type) {
      case "delete":
        return toast.success("delete task success");
      case "edit":
        return toast.success("edit task success");
      case "finish":
        return toast.success("finish task success");
      case "add":
        return toast.success("add task success");
    }
  }

  async function handleConfirm() {
    dispatch(setIsLoading(true));
    if (onConfirm) {
      onConfirm();
    }
    getToaster();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(setIsLoading(false));
    dispatch(closeConfirmationModal());
  }

  useEffect(() => {
    if (type === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.desc || "",
        duration: initialData.duration || 0,
        done: initialData.done ? "done" : "undone",
      });
    }
  }, [type, initialData]);

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
        <Grid container direction={"column"} justifyItems={"center"} px={4}>
          <Grid sx={{border: "1px solid #d3d3d3", borderRadius: "20px", backgroundColor: "white", p: 5}}>
            <Grid container display={"flex"} justifyContent={"center"} sx={{pb: 3}}>
              {iconMap[(type ?? "delete") as ModalType]}
            </Grid>
            <Typography fontWeight={"bold"}>{title}</Typography>
            <Typography>{description}</Typography>
            {(type === "edit" || type === "create") && (
              <Grid container direction={"column"} gap={1.5} pt={3}>
                <TextField fullWidth label="Title" id="standard-size-normal" value={formData.title} onChange={handleChange} variant="standard" />
                <TextField fullWidth label="Description" id="standard-size-normal" value={formData.description} onChange={handleChange} variant="standard" multiline rows={3} />
                <TextField fullWidth label="Duration" id="standard-size-normal" value={formData.duration} onChange={handleChange} variant="standard" />
                <TextField
                  select
                  label="Status"
                  fullWidth
                  defaultValue={"undone"}
                  variant="standard"
                  value={formData.done ? "done" : "undone"}
                  onChange={handleChange}
                  sx={{pt: 1}}>
                  {statusValue.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container sx={{display: "flex", justifyContent: "flex-end", gap: 1, pt: 2, pb: 2, px: 4}}>
          <Button onClick={closeModal} sx={{...LayoutStyles.EditButton, visibility: isLoading ? "hidden" : "visible"}}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} sx={LayoutStyles.actionButtonNoHover}>
            {isLoading ? "Processing ..." : buttonName[type as keyof typeof buttonName]}
          </Button>
        </Grid>
      </Dialog>
    </div>
  );
}

export default ConfirmationModal;
