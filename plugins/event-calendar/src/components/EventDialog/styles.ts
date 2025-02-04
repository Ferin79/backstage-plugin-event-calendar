import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
      transition: 'color 0.2s',
      '&:hover': {
        color: theme.palette.grey[700],
      },
    },
    content: {
      minWidth: 380,
      padding: theme.spacing(2),
    },
    iconText: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    actionButton: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 8,
    },
    todayCard: {
      padding: theme.spacing(2),
    },
  }),
);
