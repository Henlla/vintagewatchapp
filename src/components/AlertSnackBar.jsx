import { Alert, Snackbar } from "@mui/material";
const AlertSnackBar = (props) => {
    const { openSnackBar, handleSnackBarClose, snackBarMessage, snackBarType } = props
    return (
        <Snackbar
            open={openSnackBar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}>
            <Alert
                severity={snackBarType}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackBarMessage}
            </Alert>
        </Snackbar>)
}
export default AlertSnackBar;