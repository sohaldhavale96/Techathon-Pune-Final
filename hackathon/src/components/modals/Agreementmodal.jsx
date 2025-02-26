import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import donationimg from "../../assets/donation/WhatsApp Image 2025-02-22 at 20.10.04_1b0847ed.jpg";

export default function AgreementModal() {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleContinue = () => {
    if (agreed) {
      setOpen(false);
      alert("Agreement Accepted!");
      navigate("/donate/form");
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Proceed to donation
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="agreement-modal-title"
          aria-describedby="agreement-modal-description"
          sx={{
            width: "90vw",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Typography id="agreement-modal-title" level="h2">
            Agreement Policy
          </Typography>
          
          <Grid container spacing={2} sx={{ maxHeight: "60vh", overflow: "hidden" }}>
            <Grid item xs={12} md={6} sx={{ position: "sticky", top: 0, background: "white", zIndex: 10 }}>
              <Box
                component="img"
                src={donationimg}
                alt="Agreement Image"
                sx={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ maxHeight: "60vh", overflowY: "auto" }}>
              <Typography id="agreement-modal-description" textColor="text.tertiary">
                By proceeding with your donation, you agree to our policies regarding
                the collection, storage, and distribution of donated food. We ensure that
                all donations are handled responsibly and reach those in need.
                <br /><br />
                Note: Once a donation is made, it cannot be reversed. Please ensure that
                all details entered are correct before proceeding.
                By proceeding with your donation, you agree to our policies regarding
                the collection, storage, and distribution of donated food. We ensure that
                all donations are handled responsibly and reach those in need.
                <br /><br />
                Note: Once a donation is made, it cannot be reversed. Please ensure that
                all details entered are correct before proceeding.
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={handleAgreeChange} />}
              label="I agree to the terms and conditions."
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              pt: 2,
              borderTop: "1px solid #ddd",
            }}
          >
            <Button variant="outlined" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="primary" onClick={handleContinue}>
              Continue
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
