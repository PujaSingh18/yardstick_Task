import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField, Typography, Box, MenuItem
} from "@mui/material";

export default function CashEntryDialog({ open, handleClose, title, onSubmit, balance }) {
    const initialFormState = {
        date: "",
        time: "",
        amount: "",
        remarks: "",
        category: "",
        paymentMode: "",
        file: null,
        filePreview: null,
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = () => {
        console.log("Form Data Submitted:", formData);
        onSubmit(formData);
        setFormData(initialFormState); // Clear form after submission
        handleClose();
    };

    const handleCloseUpdated = () => {
        setFormData(initialFormState); // Clear form when cancel is clicked
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (formData.filePreview) {
                URL.revokeObjectURL(formData.filePreview); // Clean up previous preview
            }
            const previewURL = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, file, filePreview: previewURL }));
        }
    };

    const isSaveDisabled = () => {
        return !(formData.date && formData.time && formData.amount && formData.category && formData.paymentMode);
    };

    const getColor = () => {
        if (title === "Cash In") return "#4CAF50";
        if (title === "Cash Out") return "#F44336";
        return "#1976D2";
    };

    return (
        <Dialog open={open} onClose={handleCloseUpdated} PaperProps={{ sx: { borderRadius: 3, minWidth: 450 } }}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: getColor() }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                    {title === "Balance" ? (
                        <Typography variant="h5" sx={{ color: getColor(), fontWeight: "bold" }}>
                            Current Balance: ₹{balance}
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                variant="outlined"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Time"
                                type="time"
                                fullWidth
                                variant="outlined"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Amount"
                                type="number"
                                fullWidth
                                variant="outlined"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                inputProps={{ min: "0" }}
                            />
                            <TextField
                                label="Remarks"
                                fullWidth
                                variant="outlined"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />
                            <TextField
                                select
                                label="Category"
                                fullWidth
                                variant="outlined"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <MenuItem value="Salary">Salary</MenuItem>
                                <MenuItem value="Business Expense">Business Expense</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Investment">Investment</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Payment Mode"
                                fullWidth
                                variant="outlined"
                                name="paymentMode"
                                value={formData.paymentMode}
                                onChange={handleChange}
                            >
                                <MenuItem value="Cash">Cash</MenuItem>
                                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                                <MenuItem value="UPI">UPI</MenuItem>
                                <MenuItem value="Cheque">Cheque</MenuItem>
                            </TextField>
                            <Button variant="outlined" component="label">
                                Attach Bill
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>

                            {/* File Preview Section */}
                            {formData.file && (
                                <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px", textAlign: "center" }}>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                        Attached File: {formData.file.name}
                                    </Typography>
                                    {formData.file.type.startsWith("image/") ? (
                                        <img
                                            src={formData.filePreview}
                                            alt="Preview"
                                            style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }}
                                        />
                                    ) : formData.file.type === "application/pdf" ? (
                                        <embed
                                            src={formData.filePreview}
                                            type="application/pdf"
                                            width="100%"
                                            height="200px"
                                        />
                                    ) : (
                                        <Typography variant="body2">No preview available</Typography>
                                    )}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                <Button onClick={handleCloseUpdated} color="secondary" variant="contained">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={title !== "Balance" && isSaveDisabled()}
                    sx={{ backgroundColor: getColor(), "&:hover": { backgroundColor: getColor() } }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
