import { useState } from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Address from "./Address";
import { Typography } from "@mui/material";
import AddNewAddress from "./AddNewAddress";
import useCurrentUser from "../../../Hooks/useCurrentUser";

function ManageAddress() {
  const { currentUser } = useCurrentUser();

  const { address, default_address } = currentUser.data
  const [open, setOpen] = useState(false);

  return (
    <>
      <Grid container>
        {open && <AddNewAddress open={open} close={() => setOpen(false)} />}
        <Grid item xs={12} mb={2}>
          <Typography variant="h5" fontWeight={800} color="#333">
            Shipping Address
          </Typography>
        </Grid>
        {!open && (
          <Grid item xs={12} mb={2} ml={{ sm: 2 }}>
            <Button
              sx={{ justifyContent: "left", gap: 2 }}
              fullWidth
              size="large"
              onClick={() => setOpen(!open)}
            >
              <AddIcon />
              Add New Address
            </Button>
          </Grid>
        )}
        {address ? (
          address.map((data, index) => (
            <Address
              defaultAddress={data.id === default_address}
              // onClick={() => updateUser({ default_address: data.id })}
              key={index}
              data={data}
            />
          ))
        ) : (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            pb={1}
            ml={{ sm: 2 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "5px",
                boxShadow: "5px 5px 10px 0px var(--shadow)",
                padding: 2,
                borderRadius: 2,
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ManageAddress;
