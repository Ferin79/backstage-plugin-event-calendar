import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import ClockIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOnOutlined';
import moment from 'moment';
import React from 'react';
import { Event } from '../../types/Event';
import { styles } from '../EventDialog/styles';

interface EventDialogProps {
  selectedEvent: Event | null;
  handleClose: () => void;
}

const EventDialog: React.FC<EventDialogProps> = ({
  selectedEvent,
  handleClose,
}) => {
  const classes = styles();
  return (
    <Dialog
      open={!!selectedEvent}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {selectedEvent?.title}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {selectedEvent?.allDay ? (
          <Typography className={classes.iconText} variant="body2">
            <ClockIcon fontSize="small" /> All Day
          </Typography>
        ) : (
          <>
            <Typography className={classes.iconText} variant="body2">
              <ClockIcon fontSize="small" /> Start Time:{' '}
              <strong>
                {moment(selectedEvent?.start).format('MMM Do YYYY, h:mm a')}
              </strong>
            </Typography>

            <Typography className={classes.iconText} variant="body2">
              <ClockIcon fontSize="small" /> End Time:{' '}
              <strong>
                {moment(selectedEvent?.end).format('MMM Do YYYY, h:mm a')}
              </strong>
            </Typography>
          </>
        )}

        {selectedEvent?.metadata?.location && (
          <Typography className={classes.iconText} variant="body2">
            <LocationOnIcon fontSize="small" /> Location:{' '}
            <strong>{selectedEvent.metadata.location}</strong>
          </Typography>
        )}
        {selectedEvent?.description && (
          <Typography variant="body2">{selectedEvent.description}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          className={classes.actionButton}
          onClick={handleClose}
        >
          Close
        </Button>
        {selectedEvent?.metadata?.meetingLink && (
          <Button
            color="primary"
            variant="contained"
            className={classes.actionButton}
            onClick={() =>
              window.open(selectedEvent.metadata!.meetingLink, '_blank')
            }
          >
            Join Meeting
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
