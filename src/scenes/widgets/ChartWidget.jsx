import React from "react";
import { useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartWidget = ({ userId }) => {
  const { palette } = useTheme();
  
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch(
      `https://social-media-application-capstone-backend.onrender.com/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const { viewedProfile, impressions } = user;
  const barChartData = {
    labels: ["Viewed Profile", "Impressions"],
    datasets: [
      {
        label: "Metrics",
        data: [viewedProfile, impressions],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Bar options={options} data={barChartData} />;
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChartWidget;
