import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from "@mui/material";

export default function CashEntryDialog({ open, handleClose, title, onSubmit, balance }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = () => {
        onSubmit(value);
        handleClose();
    };

    // Set colors based on the dialog type
    const getColor = () => {
        if (title === "Cash In") return "#4CAF50"; // Green
        if (title === "Cash Out") return "#F44336"; // Red
        return "#1976D2"; // Blue (for Balance)
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 3, minWidth: 400 } }}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: getColor() }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
                    {title === "Balance" ? (
                        <Typography variant="h5" sx={{ color: getColor(), fontWeight: "bold" }}>
                            Current Balance: ₹{balance}
                        </Typography>
                    ) : (
                        <TextField
                            autoFocus
                            margin="dense"
                            label={title === "Cash In" ? "Enter Cash In Amount" : "Enter Cash Out Amount"}
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={value}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) setValue(e.target.value);
                            }}
                            inputProps={{ min: "0" }}
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                <Button onClick={handleClose} color="secondary" variant="contained">
                    Cancel
                </Button>
                {title !== "Balance" && (
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={!value}
                        sx={{ backgroundColor: getColor(), "&:hover": { backgroundColor: getColor() } }}
                    >
                        Submit
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
