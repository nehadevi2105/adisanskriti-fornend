import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirm Submission</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to submit the form?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onConfirm} color="primary" variant="contained">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
