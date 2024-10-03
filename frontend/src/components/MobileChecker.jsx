import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    &:hover {
      background-color: #440080;
    }
  }
`;

const YourComponent = ({ actions, row }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the value on the first render

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <ActionMenu row={row} actions={actions} />
      ) : (
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </StyledSpeedDial>
      )}
    </>
  );
};

export default YourComponent;
