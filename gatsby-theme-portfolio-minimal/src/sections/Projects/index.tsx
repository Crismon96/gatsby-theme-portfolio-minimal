import React from 'react';
import { Section } from '../../components/Section';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { Project } from '../../components/Project';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function ProjectsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allProjectsJson.sections[0];

    return (
        <Section anchor={props.sectionId} heading={props.heading}>
            <Slider additionalClasses={[classes.Projects]}>
                {data.projects.map((project, key) => {
                    return project.visible ? <Project key={key} index={key} data={project} /> : null;
                })}
            </Slider>
            {data.button !== undefined && data.button.visible !== false && (
                <Button type={ButtonType.LINK} externalLink={true} url={data.button.url} label={data.button.label} />
            )}
        </Section>
    );
}
