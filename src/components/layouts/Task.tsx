import { useDispatch } from 'react-redux';

import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { openConfirmationModal } from '../../store/modal/modalStore';
import ConfirmationModal from '../modals/ConfirmationModal';
import { LayoutStyles } from './LayoutStyles';

function Task() {
  const dispatch = useDispatch();

  function deleteTask() {
    dispatch(
      openConfirmationModal({
        type: "delete",
        title: "Are you sure to delete the task?",
        description: "Warning, deleted task cant be recover anymore",
      })
    );
  }
  function editTask() {
    dispatch(
      openConfirmationModal({
        type: "edit",
        title: "Edit remaining task?",
        description: "Fill the input field below to edit your task",
      })
    );
  }
  function finishTask() {
    dispatch(
      openConfirmationModal({
        type: "finish",
        title: "Finish your task?",
        description: "Finished task will setup as underlined words",
      })
    );
  }

  return (
    <div>
      <Grid container direction="column" sx={{border: "solid 1px #d3d3d3", borderRadius: "20px", px: 4, py: 2, marginTop: 5, gap: 4}}>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          mt={1}
          sx={{borderBottom: "solid 1px #d3d3d3", backgroundColor: "#f0f0f0", px: 4, py: 2, mx: "-32px", mt: "-16px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}>
          <Grid display="flex" gap={1} pt={1}>
            <DescriptionOutlinedIcon />
            <Typography fontWeight="bold" fontSize={18}>
              All Task Today
            </Typography>
          </Grid>
          <Grid>
            <Button sx={LayoutStyles.actionButton}>See all</Button>
          </Grid>
        </Grid>

        {/* task content */}
        <Grid
          container
          direction="column"
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            display: "block",
          }}>
          <Grid display="flex" justifyContent="space-between">
            <Typography fontWeight={"bold"} fontSize={18}>
              Title
            </Typography>
            <Tooltip title="Delete Task" placement="top">
              <CloseOutlinedIcon
                onClick={deleteTask}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#ed3419",
                  },
                }}
              />
            </Tooltip>
          </Grid>
          <Typography fontWeight={"bold"} fontSize={14}>
            Duration : 20 Hours
          </Typography>
          <Typography fontSize={14} mt={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laboriosam iusto blanditiis corrupti eum voluptatem sapiente sunt culpa cumque quod.
          </Typography>
          <Grid container display="flex" justifyContent="flex-end" gap={2} mt={2} mb={4}>
            <Tooltip title="Edit Task" placement="top">
              <DriveFileRenameOutlineOutlinedIcon
                onClick={editTask}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#f57c00",
                  },
                }}
              />
            </Tooltip>
            <Tooltip title="Finish Task" placement="top">
              <ChecklistOutlinedIcon
                onClick={finishTask}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#388e3c",
                  },
                }}
              />
            </Tooltip>
          </Grid>
          <Divider />
        </Grid>
      </Grid>
      <ConfirmationModal />
    </div>
  );
}

export default Task;
