import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  Home,
  Building2,
  Warehouse,
  FileText,
  Mail,
  Star,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";
import { grey, cyan } from "@mui/material/colors";

// defaultStats remains unchanged
const defaultStats = {
  properties: [
    { title: "Lands", value: 0, icon: Warehouse, link: "/dashboard/lands" },
    { title: "Flats", value: 0, icon: Building2, link: "/dashboard/flats" },
    { title: "Houses", value: 0, icon: Home, link: "/dashboard/houses" },
    { title: "Drafts", value: 0, icon: FileText, link: "/dashboard/drafts" },
  ],
  engagement: [
    { title: "Contact Forms", value: 0, icon: Mail, link: "/dashboard/messages" },
    { title: "Featured", value: 0, icon: Star, link: "/dashboard/featured" },
    { title: "Chats", value: 0, icon: MessageSquare, link: "/dashboard/chats" },
  ],
};

const Section = ({ title, items }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h5" color={cyan[500]} sx={{ mb: 2, fontWeight: 600 }}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {items.map(({ title, value, icon: Icon, link }, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Link to={link} style={{ textDecoration: "none" }}>
            <Card
              sx={{
                borderRadius: 3,
                background: `linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)`,
                boxShadow: 7,
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: 14, borderColor: cyan[400] },
                border: `2px solid ${cyan[100]}`,
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle1" color={grey[800]} sx={{ fontWeight: 500 }}>
                    {title}
                  </Typography>
                  <IconButton aria-label={title} size="small" sx={{ color: cyan[400] }}>
                    <Icon size={24} />
                  </IconButton>
                </Box>
                <Typography variant="h3" sx={{ color: cyan[600], mt: 2, fontWeight: "bold" }}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const DashboardStats = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [landsRes, flatsRes, housesRes, draftsRes, chatsRes, messagesRes] =
          await Promise.all([
            axios.get("https://backend.rajproperty.site/api/lands"),
            axios.get("https://backend.rajproperty.site/api/flats"),
            axios.get("https://backend.rajproperty.site/api/houses"),
            axios.get("https://backend.rajproperty.site/api/drafts"),
            axios.get("https://backend.rajproperty.site/api/chat"),
            axios.get("https://backend.rajproperty.site/api/messages"),
          ]);
        setStats((prev) => ({
          ...prev,
          properties: [
            { ...prev.properties[0], value: landsRes.data.length },
            { ...prev.properties[1], value: flatsRes.data.length },
            { ...prev.properties[2], value: housesRes.data.length },
            { ...prev.properties[3], value: draftsRes.data.length },
          ],
          engagement: [
            { ...prev.engagement[0], value: messagesRes.data.length },
            { ...prev.engagement[1], value: 0 },
            { ...prev.engagement[2], value: chatsRes.data.length },
          ],
        }));
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <Section title="Properties" items={stats.properties} />
      <Section title="Engagement" items={stats.engagement} />
    </Box>
  );
};

export default DashboardStats;
