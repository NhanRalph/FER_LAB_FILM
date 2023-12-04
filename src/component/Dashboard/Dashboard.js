import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  tableCellClasses,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
//import API
import contactGetAPI from "../../api/Contact/contactGetAPI";
import contactDeleteAPI from "../../api/Contact/contactDeleteAPI";
import filmNowPlayingAPI from "../../api/filmNowPlayingAPI";
import { Link } from "react-router-dom";

//các biến của table

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    width: '20px',

  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function Dashboard() {
  const [films, setFilms] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Define deleteDialogOpen state here
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    // Fetch now playing movies when the component mounts
    filmNowPlayingAPI
      .getMovies()
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, [isDelete]);

  async function deleteData(id) {
    try {
      await filmNowPlayingAPI.remove(id);
      setIsDelete(true);
    } catch (error) {
      console.log(error);
    }
  }
  

  const openDeleteDialog = (id) => {
    setSelectedContactId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedContactId(null);
    setDeleteDialogOpen(false);
  };

  function createData(id, title, overview, vote_average,  ) {
    return { id, title, overview, vote_average,   };
  }

  const rows = [];

  films.forEach(element => {
    rows.push(createData(element.name, element.email, element.phone, element.message, element.id));
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">Dashboard</div>
      <div className="dashboard-wrapper">
        <div className="dashboard-table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone</StyledTableCell>
                  <StyledTableCell align="left">Message</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" style={{ width: '10px', whiteSpace: 'pre-wrap' }}>
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.phone}</StyledTableCell>
                    <StyledTableCell align="left" style={{ width: '200px', whiteSpace: 'pre-wrap' }}>{row.message}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Link to={`/dashboard/update/${row.id}`}>
                        <EditNoteIcon />
                      </Link>
                      <div style={{ display: 'inline-block' }} onClick={() => openDeleteDialog(row.id)}>
                        <DeleteIcon sx={{ color: 'rgba(196, 36, 36, 0.842)', cursor: 'pointer' }} />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this contact?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteData(selectedContactId);
              closeDeleteDialog();
            }}
            color="secondary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
