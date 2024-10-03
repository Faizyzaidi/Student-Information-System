import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <div className="relative">
            <SpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<TuneIcon className="text-white" />}
                direction="left"
                className="bg-[#032803] hover:bg-green-600"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                        classes={{
                            fab: "bg-[#032803] hover:bg-green-600 text-white",
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

export default SpeedDialTemplate;
