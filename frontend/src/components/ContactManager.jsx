import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactForm from './ContactForm';

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editContact, setEditContact] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/contacts');
            const data = await response.json();
            if (data.sucess) {
                setContacts(data.data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (contact) => {
        setEditContact(contact);
        setOpenForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (data.sucess) {
                    fetchContacts();
                }
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        }
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setEditContact(null);
    };

    const handleFormSubmit = async (contactData) => {
        try {
            const url = editContact
                ? `http://localhost:3000/api/contacts/${editContact._id}`
                : 'http://localhost:3000/api/contacts';

            const method = editContact ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            const data = await response.json();
            if (data.sucess) {
                fetchContacts();
                handleFormClose();
            }
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    CONTACTS
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenForm(true)}
                >
                    ADD CONTACT
                </Button>
            </Box>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : contacts.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    NO CONTACTS AVAILABLE
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((contact) => (
                                    <TableRow key={contact._id}>
                                        <TableCell>{contact.firstName}</TableCell>
                                        <TableCell>{contact.lastName}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.phoneNumber}</TableCell>
                                        <TableCell>{contact.company}</TableCell>
                                        <TableCell>{contact.jobTitle}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(contact)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(contact._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={contacts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}

            <ContactForm
                open={openForm}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                contact={editContact}
            />
        </Container>
    );
};

export default ContactManager;

