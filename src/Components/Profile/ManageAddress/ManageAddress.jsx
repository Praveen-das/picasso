import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Address from "./Address";
import { Box, Typography, Button, Grid } from "@mui/material";
import AddNewAddress from "./AddNewAddress";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import EditForm from '../EditForm'

function ManageAddress() {
  const { currentUser } = useCurrentUser();
  const { address, default_address } = currentUser.data

  const [open, setOpen] = useState(null);

  return (
    <>
      <EditForm open={open} onClose={setOpen} />
      <Grid container>
        {/* {open && <AddNewAddress close={() => setOpen(false)} />} */}
        <Grid item xs={12} mb={2}>
          <Typography variant="tabTitle">
            Shipping Address
          </Typography>
        </Grid>
        <Grid item xs={12} mb={2} >
          <Button
            sx={{ justifyContent: "left", gap: 2 }}
            size="small"
            onClick={() => setOpen('address')}
          >
            <AddIcon />
            Add New Address
          </Button>
        </Grid>
        {address ? (
          address.map((data, index) => (
            <Address
              defaultAddress={default_address?.id === data.id}
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
          >
            <Box
              sx={{
                width: "100%",
                height: "5px",
                boxShadow: "5px 5px 10px 0px var(--shadow)",
                // padding: 2,
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
