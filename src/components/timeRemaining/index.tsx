import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { colors } from "../../common";

type Props = {
  time: number;
};

const CircleMain = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  [theme.breakpoints.up("xs")]: {
    width: "300px",
    height: "300px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "350px",
    height: "350px",
  },
}));

const CircleGradient = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${colors.teal} 2%, ${colors.tealLight} 96%)`,
  width: "85%",
  height: "85%",
}));

const CircleCounter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: "85%",
  height: "85%",
}));

const TimeRemaining = (props: Props) => {
  const [endTime, setEndTime] = useState("00:00:00:00");
  const { time } = props;
  setTimeout(() => {
    Time();
  }, 1000);

  const Time = () => {
    var currentTime = new Date().valueOf();
    if (time > currentTime) {
      var realTime = time - currentTime;
      var date = new Date(realTime);
      var day = Math.floor(realTime / 86400000).toString();
      var hour = date.getHours().toString();
      var minute = date.getMinutes().toString();
      var second = date.getSeconds().toString();
      if (date.getDate() < 10)
        day = "0" + day;
      if (date.getHours() < 10)
        hour = "0" + date.getHours().toString();
      if (date.getMinutes() < 10)
        minute = "0" + date.getMinutes().toString();
      if (date.getSeconds() < 10)
        second = "0" + date.getSeconds().toString();
      var totalTime = day + ":" + hour + ":" + minute + ":" + second;
      setEndTime(totalTime);
    } else {
      setEndTime("00:00:00:00");
    }
  }
  return (
    <Box>
      <Box className="items-center">
        <CircleMain className="mx-auto rounded-full grid items-center">
          <CircleGradient className="mx-auto rounded-full grid items-center">
            <CircleCounter className="mx-auto rounded-full flex flex-col justify-center items-center">
              <Typography variant="h6" className="!font-bold">
                {endTime}
              </Typography>
              <Typography>Time Remaining</Typography>
            </CircleCounter>
          </CircleGradient>
        </CircleMain>
      </Box>
    </Box>
  )
};

export { TimeRemaining };
