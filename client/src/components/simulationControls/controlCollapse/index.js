import React, { useState } from 'react'
import {
    StyledContainer, 
    StyledInnerCollapseContainer
} from './styles'
import Collapse from 'components/simulationControls/collapse'
import FileInput from "components/simulationControls/fileInput/index";
import PopulationSlider from "components/simulationControls/sliders/PopulationSlider";
import BugSizeSlider from "components/simulationControls/sliders/BugSizeSlider";
import OffspringDistanceSlider from "components/simulationControls/sliders/OffspringDistanceSlider";
import GrowSpeedSlider from "components/simulationControls/sliders/GrowSpeedSlider";
import MaxMutationSlider from "components/simulationControls/sliders/MaxMutationSlider";
import PresetImageSelect from "components/simulationControls/presetImageSelect/index";
import CollapseBar from "components/simulationControls/collapse/collapseBar/CollapseBar"

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
                <StyledInnerCollapseContainer>
                    <PopulationSlider />
                    <BugSizeSlider />
                    <OffspringDistanceSlider />
                    <GrowSpeedSlider />
                    <MaxMutationSlider />
                    <PresetImageSelect />
                    <FileInput />                             
                </StyledInnerCollapseContainer>     
            </Collapse>
        </StyledContainer>
    )
}

export default ControlCollapse