import React from "react";
import { Box, CardContent, CardHeader, Typography, Button, Divider, Chip, Avatar, Grid, Stack } from "@mui/material";
import Card from "../Ui/Card";
import { CheckCircle, LocalShipping,  ArrowForward, Inventory2 } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Status from "../Ui/OrderStatus/Status";
import { green } from "@mui/material/colors";
import Title from "../Ui/Title";
import { gap } from "../../const";
import { Mail, Package, Truck } from "lucide-react";

const PurchaseSuccess = ({ order }) => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || order.orderId;
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = order.product.price * order.quantity;
  const discount = Math.ceil(order.product.price * order.quantity * (order.discount / 100));

  return (
    <Box maxWidth="lg" mx="auto" p={gap}>
      {/* Success Header */}
      <Box textAlign="center" mb={6}>
        <CheckCircle sx={{ fill: green[500], fontSize: 64, mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography color="text.secondary">
          Thank you for your purchase. Your order has been successfully placed.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            {/* Order Details */}
            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Title>Order Details</Title>
                <Status status={order.status} />
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {orderId}
              </Typography>
              <Box mt={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Estimated Delivery
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  3-5 business days
                </Typography>
              </Box>
            </Card>

            {/* Order Items */}
            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
              <Title>Items Ordered</Title>
              <Stack spacing={2} mt={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={order.product.images[0]?.url} variant="rounded" sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {order.product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qty: {order.quantity}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography fontWeight={600}>₹{order.price}</Typography>
                </Box>
                <Divider />
                <Box display="grid" gap={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2">₹{subtotal}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2" color="text.secondary">
                      Discount
                    </Typography>
                    <Typography variant="body2">-₹{discount}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between" fontWeight={700}>
                    <Typography>Total</Typography>
                    <Typography fontWeight={600}>₹{order.price}</Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={4} sx={{ position: { md: "sticky" }, top: { md: 32 }, height: "100%" }}>
            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, display: "grid", gap: 2 }}>
              <Typography variant="title.secondary" mb={2}>
                What's Next?
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Mail color="var(--brand)" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Order Confirmation
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Check your email for order details
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Package color="var(--brand)" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Processing
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    We'll prepare your items
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Truck color="var(--brand)" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Shipping Updates
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Track your package progress
                  </Typography>
                </Box>
              </Box>
            </Card>

            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, display: "grid", gap: 2 }}>
              <Typography variant="title.secondary" mb={2}>
                Quick Actions
              </Typography>
              <Button
                onClick={() => navigate("/profile", { state: { initialTab: 2 } })}
                variant="contained"
                size="large"
                fullWidth
                endIcon={<ArrowForward />}
              >
                View All Orders
              </Button>
              <Button component={Link} to="/shop" variant="outlined" size="large" fullWidth>
                Continue Shopping
              </Button>
            </Card>

          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PurchaseSuccess;
