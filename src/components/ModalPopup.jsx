import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";

const style = {
    height: "70%",
    position: 'absolute',
    width: "50%",
    top: '50%',
    left: '50%',
    overflow: "scroll",
    overflowX: "hidden",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalPopup = (props) => {
    const { modalOpen, handleCloseModal, onSubmit, handleSubmit, modalTitle, modalData, modalButtonName, modalButton, errors, register } = props
    return <>
        <Modal
            open={modalOpen}
            onClose={() => handleCloseModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Typography className='mb-4' id="modal-modal-title" variant="h6" component="h2">{modalTitle}</Typography>
                <Grid container spacing={2}>
                    {
                        modalData.map((item, index) => (
                            !item.hidden &&
                            <Grid item xs={12} md={item.column} key={index}>
                                <TextField
                                    name={item.key}
                                    {...register(item.key, item.validation)}
                                    error={errors[item.key]?.message != null}
                                    helperText={errors[item.key]?.message}
                                    fullWidth
                                    label={item.label}
                                    disabled={!item.canEdit}
                                    multiline={item.multiline}
                                    rows={item.rows}
                                />
                            </Grid>
                        ))
                    }
                    <Grid item md={12}>
                        <Button type='submit' fullWidth name={modalButtonName} hidden={modalButton} variant='contained'>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal >
    </>;
}

export default ModalPopup;