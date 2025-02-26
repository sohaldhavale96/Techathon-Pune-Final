// import React from "react";
import Donatecard from "../utils/Donatecard";
import "./Home.css";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Marqueeanimation from "../utils/Marqueeanimation";
import {Link} from "react-router-dom"

function Home() {
  return (
    <div className="home-wrapper" style={{ position: 'relative', zIndex: 1 }}>
      <div className="p-10" style={{ position: 'relative' }}>
        <div className="h-[110vh] grid grid-rows-[40%_1fr]">
          <div className="col-1 grid grid-cols-[1fr_35%] gap-1">
            <div className="grid-box grid-slogan-box">
              <p className="slogan-text">
                &quot;Food is not just eating energy. It's an experience.&quot;
              </p>
              <p className="italic font-medium">
                - Join us in sharing this experience
              </p>
            </div>
            <div className="grid-box grid-donate-box font-bold flex items-center justify-center">
              <Donatecard />
            </div>
          </div>
          <div className="col-2 grid grid-cols-[1fr_35%] gap-1">
            <div className="grid-box grid-image-box">
              <div className="image-box"></div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                size="sm"
                variant="plain"
                orientation="horizontal"
                className="shadow-xl"
                sx={{
                  textAlign: "center",
                  maxWidth: "100%",
                  width: "100%",
                  padding: "1em",
                }}
              >
                <CardOverflow
                  variant="solid"
                  color="primary"
                  sx={{
                    flex: "0 0 150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    px: "var(--Card-padding)",
                  }}
                >
                  <Typography
                    textColor="#fff"
                    sx={{ fontSize: "lg", fontWeight: "lg" }}
                  >
                    129
                  </Typography>
                  <Typography textColor="primary.200" sx={{ fontSize: "sm" }}>
                    Today's Impact
                  </Typography>
                </CardOverflow>
                <CardContent sx={{ gap: 1, minWidth: 150 }}>
                  <CardContent>
                    <Typography level="body2">Daily Distribution</Typography>
                    <Typography sx={{ fontSize: "xs", mt: 0.2 }}>
                      Meals served to families today
                    </Typography>
                  </CardContent>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      "--variant-borderWidth": "1px",
                      borderRadius: 20,
                      borderColor: "primary.500",
                      mx: "auto",
                      fontSize: "xs",
                    }}
                  >
                    <Link to="/about">See Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card
                size="sm"
                variant="plain"
                orientation="horizontal"
                className="shadow-xl"
                sx={{
                  textAlign: "center",
                  maxWidth: "100%",
                  width: "100%",
                  padding: "1em",
                }}
              >
                <CardOverflow
                  variant="solid"
                  color="primary"
                  sx={{
                    flex: "0 0 150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    px: "var(--Card-padding)",
                  }}
                >
                  <Typography
                    textColor="#fff"
                    sx={{ fontSize: "lg", fontWeight: "lg" }}
                  >
                    467
                  </Typography>
                  <Typography textColor="primary.200" sx={{ fontSize: "sm" }}>
                    Monthly Progress
                  </Typography>
                </CardOverflow>
                <CardContent sx={{ gap: 1, minWidth: 150 }}>
                  <CardContent>
                    <Typography level="body2">This Month's Reach</Typography>
                    <Typography sx={{ fontSize: "xs", mt: 0.2 }}>
                      Families supported this month
                    </Typography>
                  </CardContent>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      "--variant-borderWidth": "1px",
                      borderRadius: 20,
                      borderColor: "primary.500",
                      mx: "auto",
                      fontSize: "xs",
                    }}
                  >
                    <Link to="/about">See Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Marqueeanimation />
      </div>
    </div>
  );
}

export default Home;