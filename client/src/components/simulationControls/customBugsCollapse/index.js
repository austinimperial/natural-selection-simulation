import React, { useState } from 'react'
import {
    StyledContainer, 
} from './styles'
import Collapse from 'components/simulationControls/collapse'
import CustomInitialBugs from "components/simulationControls/customInitialBugs/index";
import CollapseBar from "components/simulationControls/collapse/collapseBar/CollapseBar"

function CustomBugCollapse() {
    // local state
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
        <StyledContainer>
            <CollapseBar 
                label="Custom Initial Bugs"
                onClick={() => setIsCollapsed(prev => !prev)}
            />
            <Collapse
                isCollapsed={isCollapsed}
            >
                <CustomInitialBugs />
            </Collapse>
        </StyledContainer>
    )
}

export default CustomBugCollapse