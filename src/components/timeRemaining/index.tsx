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
    var myday, myhour, myminute, mysecond = "";
    if (time > currentTime) {
      var realTime = time - currentTime;
      var day = Math.floor(realTime / 86400000);
      myday = day.toString();
      realTime -= 86400000 * day;
      var hour = Math.floor(realTime / 3600000);
      myhour = hour.toString();
      realTime -= 3600000 * hour;
      var minute = Math.floor(realTime / 60000);
      myminute = minute.toString();
      realTime -= 60000 * minute;
      var second = Math.floor(realTime / 1000);
      mysecond = second.toString();
      if (day < 10)
        myday = "0" + day;
      if (hour < 10)
        myhour = "0" + hour;
      if (minute < 10)
        myminute = "0" + minute;
      if (second < 10)
        mysecond = "0" + second;
      var totalTime = myday + ":" + myhour + ":" + myminute + ":" + mysecond;
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
