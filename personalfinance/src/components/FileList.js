import React, { useState } from "react";
import { useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, styled } from "@mui/material";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TablePagination,
    Paper,
    Typography,
    Stack,
    IconButton,
    Tooltip,
    Box
} from "@mui/material";

const initialFiles = [
    { id: 1, name: "Manual website", type: "Sketch", date: "21.03.2019 14:30", category: "Design", mode: "Online", bill: "12345", amount: "$250", balance: "$500" },
    { id: 2, name: "Gymnastic", type: "Photoshop", date: "20.03.2019 10:15", category: "Sports", mode: "Offline", bill: "12346", amount: "$300", balance: "$200" },
    { id: 3, name: "Neverout", type: "Illustrator", date: "20.03.2019 08:50", category: "Art", mode: "Online", bill: "12347", amount: "$150", balance: "$350" },
    { id: 4, name: "Manual app", type: "Sketch", date: "12.01.2019 16:20", category: "Development", mode: "Offline", bill: "12348", amount: "$400", balance: "$600" },
    { id: 5, name: "Website UI", type: "Figma", date: "10.02.2019 12:00", category: "UI/UX", mode: "Online", bill: "12349", amount: "$500", balance: "$700" },
];


const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        borderRadius: 12,  // Rounded corners
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",  // Subtle shadow
        padding: theme.spacing(2),
        maxHeight: "80vh",  // Prevents overflow
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 8,  // Rounded corners for input
        "& fieldset": {
            borderColor: "#ccc",  // Lighter border
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.main, // Hover effect
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
        },
    },
    marginBottom: theme.spacing(1.5),
}));

const ScrollableDialogContent = styled(DialogContent)({
    maxHeight: "60vh",  // Limit height
    overflowY: "auto",  // Enable scrolling
    "&::-webkit-scrollbar": {
        width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#8A2BE2",  // Violet color
        borderRadius: "6px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#9400D3",  // Darker violet on hover
    },
});


const itemsPerPage = 5;

export default function FileList() {
    const [files, setFiles] = useState(initialFiles);
    const [currentPage, setCurrentPage] = useState(0);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null);
    // const selectedFile = files.find(file => file.id === selectedFileId);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleChangePage = (_, newPage) => {
        setCurrentPage(newPage);
    };

    const handleDeleteClick = (id) => {
        setSelectedFileId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setFiles(files.filter(file => file.id !== selectedFileId));
        setDeleteDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setDeleteDialogOpen(false);
    };
    const handleEditClick = (file) => {
        setSelectedFile({ ...file });
        setEditDialogOpen(true);
    };

    const handleEditChange = (e) => {
        setSelectedFile({ ...selectedFile, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = () => {
        setFiles(files.map(file => (file.id === selectedFile.id ? selectedFile : file)));
        setEditDialogOpen(false);
    };
    const paginatedFiles = files.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <Paper
            sx={{
                padding: 3,
                borderRadius: 3,
                boxShadow: 4,
                background: "linear-gradient(135deg, #eceff1, #ffffff)",
                width: "100%",
                overflowX: "auto",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    marginBottom: 2,
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                    color: "#333",
                    textAlign: "center",
                }}
            >
                Last Transactions
            </Typography>

            <TableContainer sx={{ borderRadius: 2, background: "rgba(255,255,255,0.8)", boxShadow: 2 }}>
                <Table size={isMobile ? "small" : "medium"}>
                    <TableHead>
                        <TableRow sx={{ background: "linear-gradient(90deg, #6a11cb, #2575fc)", color: "white" }}>
                            {["Name", "Date & Time", "Details", "Category", "Mode", "Bill", "Amount", "Balance", "Actions"].map((header, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontFamily: "'Roboto', sans-serif",
                                        whiteSpace: isMobile ? "nowrap" : "normal",
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedFiles.map((file, index) => (
                            <TableRow
                                key={file.id}
                                hover
                                onMouseEnter={() => setHoveredRow(file.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                                    transition: "background-color 0.3s ease-in-out",
                                }}
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: "#1976d2",
                                            cursor: "pointer",
                                            fontWeight: 500,
                                            fontFamily: "'Poppins', sans-serif",
                                            "&:hover": { textDecoration: "underline" },
                                        }}
                                        onClick={() => alert(`Opening file: ${file.name}`)}
                                    >
                                        {file.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>{file.date}</TableCell>
                                <TableCell>{file.type}</TableCell>
                                <TableCell>{file.category}</TableCell>
                                <TableCell>{file.mode}</TableCell>
                                <TableCell>{file.bill}</TableCell>
                                <TableCell>{file.amount}</TableCell>
                                <TableCell>{file.balance}</TableCell>
                                <TableCell align="right">
                                    <Stack direction={isMobile ? "column" : "row"} spacing={1}>
                                        {hoveredRow === file.id && (
                                            <>
                                                <Tooltip title="Edit">
                                                    <IconButton color="primary" size="small" onClick={() => handleEditClick(file)}>
                                                        <MdEdit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error" size="small" onClick={() => handleDeleteClick(file.id)}>
                                                        <MdDelete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                        <Tooltip title="Download">
                                            <IconButton size="small">
                                                <FiDownload />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Share">
                                            <IconButton size="small">
                                                <FiShare2 />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "right", marginTop: 2 }}>
                <TablePagination
                    component="div"
                    count={files.length}
                    rowsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                />
            </Box>



            <StyledDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
                <DialogTitle>Edit File Details</DialogTitle>
                <ScrollableDialogContent>
                    <StyledTextField name="name" label="Name" fullWidth value={selectedFile?.name || ""} onChange={handleEditChange} />
                    <StyledTextField name="date" label="Date & Time" fullWidth value={selectedFile?.date || ""} onChange={handleEditChange} />
                    <StyledTextField name="type" label="Details" fullWidth value={selectedFile?.type || ""} onChange={handleEditChange} />
                    <StyledTextField name="category" label="Category" fullWidth value={selectedFile?.category || ""} onChange={handleEditChange} />
                    <StyledTextField name="mode" label="Mode" fullWidth value={selectedFile?.mode || ""} onChange={handleEditChange} />
                    <StyledTextField name="bill" label="Bill" fullWidth value={selectedFile?.bill || ""} onChange={handleEditChange} />
                    <StyledTextField name="amount" label="Amount" fullWidth value={selectedFile?.amount || ""} onChange={handleEditChange} />
                    <StyledTextField name="balance" label="Balance" fullWidth value={selectedFile?.balance || ""} onChange={handleEditChange} />
                </ScrollableDialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} sx={{ color: "#888" }}>Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </StyledDialog>



            {/* Delete Confirmation Dialog */}
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>Confirm Deletion</DialogTitle>
                <DialogContent>
                    {selectedFileId !== null && selectedFile ? (
                        <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>Name: {selectedFile.name}</Typography>
                            <Typography variant="body1">Bill No: {selectedFile.bill}</Typography>
                            <Typography variant="body1">Amount: {selectedFile.amount}</Typography>
                            <Typography variant="body1">Date: {selectedFile.date}</Typography>
                        </Box>
                    ) : (
                        <Typography>No file selected.</Typography>
                    )}

                    <Typography sx={{ marginTop: 2 }}>Are you sure you want to delete this record?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Paper>
    );
}
