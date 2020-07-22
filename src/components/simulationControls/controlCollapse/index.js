import React, { useState } from 'react'
import {
    StyledContainer, 
} from './styles'
import Collapse from 'components/simulationControls/collapse'
import FileInput from "components/simulationControls/fileInput/index";
import PopulationSlider from "components/simulationControls/populationSlider/index";
import BugSizeSlider from "components/simulationControls/bugSizeSlider/index";
import OffspringDistanceSlider from "components/simulationControls/offspringDistanceSlider/index";
import GrowSpeedSlider from "components/simulationControls/growSpeedSlider/index";
import MaxMutationSlider from "components/simulationControls/maxMutationSlider/index";
import PresetImageSelect from "components/simulationControls/presetImageSelect/index";
import CollapseBar from "components/simulationControls/collapse/collapseBar"

function ControlCollapse() {
    // local state
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <StyledContainer>
            <CollapseBar 
                label="Simulation Controls"
                onClick={() => setIsCollapsed(prev => !prev)}
            />
            <Collapse
                isCollapsed={isCollapsed}
            >
                <div
                    style={{padding:'15px'}}
                >
                    <PopulationSlider />
                    <BugSizeSlider />
                    <OffspringDistanceSlider />
                    <GrowSpeedSlider />
                    <MaxMutationSlider />
                    <PresetImageSelect />
                    <FileInput />                             
                </div>      
            </Collapse>
        </StyledContainer>
    )
}

export default ControlCollapse