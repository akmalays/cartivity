import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { RootState } from '../../app/store';
import { openConfirmationModal } from '../../store/modal/modalStore';
import { deleteTask, toggleTaskDone } from '../../store/task/taskStore';
import { ITask } from '../../types/dummy';
import ConfirmationModal from '../modals/ConfirmationModal';
import { LayoutStyles } from './LayoutStyles';

function Task() {
  const [showAllTasks, setShowAllTasks] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.taskStore.tasks);

  function deleteTaskAction(taskId: number, title: string) {
    dispatch(
      openConfirmationModal({
        type: "delete",
        title: `Are you sure to delete " ${title} " task?`,
        description: "Warning, deleted task cant be recover anymore",
        onConfirm: () => {
          dispatch(deleteTask(taskId));
        },
      })
    );
  }
  function editTaskAction(task: ITask) {
    dispatch(
      openConfirmationModal({
        type: "edit",
        title: `Edit " ${task.title} " remaining task?`,
        description: "Fill the input field below to edit your task",
        initialData: task,
      })
    );
  }

  function finishTaskAction(taskId: number, title: string) {
    dispatch(
      openConfirmationModal({
        type: "finish",
        title: `Finish " ${title} " task?`,
        description: "Finished task will setup as underlined words",
        onConfirm: () => {
          dispatch(toggleTaskDone(taskId));
        },
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
            <Button onClick={() => setShowAllTasks(!showAllTasks)} sx={LayoutStyles.actionButtonNoHover}>
              {showAllTasks ? "Show less" : "See all"}
            </Button>
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
          {tasks.slice(0, showAllTasks ? tasks.length : 1).map((task, index) => {
            return (
              <Grid sx={{p: 2}} key={index}>
                <Grid display="flex" justifyContent="space-between">
                  <Typography sx={{textDecoration: task.done ? "line-through" : "none"}} fontWeight={"bold"} fontSize={18}>
                    {task.title}
                  </Typography>
                  <Tooltip title="Delete Task" placement="top">
                    <CloseOutlinedIcon
                      onClick={() => deleteTaskAction(task?.id, task?.title)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          color: "#ed3419",
                        },
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Typography sx={{textDecoration: task.done ? "line-through" : "none"}} fontWeight={"bold"} fontSize={14}>
                  Duration : {task.duration} hrs
                </Typography>
                <Typography sx={{textDecoration: task.done ? "line-through" : "none"}} fontSize={14} mt={2}>
                  {task.desc}
                </Typography>
                <Grid container display="flex" justifyContent="flex-end" gap={2} mt={2} mb={4}>
                  <Tooltip title="Edit Task" placement="top">
                    <DriveFileRenameOutlineOutlinedIcon
                      onClick={() => editTaskAction(task)}
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
                      onClick={() => finishTaskAction(task?.id, task?.title)}
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
            );
          })}
        </Grid>
      </Grid>
      <ConfirmationModal />
    </div>
  );
}

export default Task;
