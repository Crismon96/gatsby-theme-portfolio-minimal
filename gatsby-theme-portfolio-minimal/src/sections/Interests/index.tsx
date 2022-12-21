import React from 'react';
import { Section } from '../../components/Section';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Button, ButtonType } from '../../components/Button';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function InterestsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allInterestsJson.sections[0];
    const shouldShowButton = data.button.visible !== false;
    const initiallyShownInterests = data.button.initiallyShownInterests ?? 5;
    const [shownInterests, setShownInterests] = React.useState<number>(
        shouldShowButton ? initiallyShownInterests : data.interests.length,
    );

    function loadMoreHandler() {
        setShownInterests(data.interests.length);
    }

    return (
        <Section anchor={props.sectionId} heading={props.heading}>
            <div className={classes.Interests}>
                {data.interests.slice(0, shownInterests).map((interest, key) => {
                    return (
                        <>
                            {interest.image.src && (
                                <GatsbyImage
                                    key={key}
                                    image={interest.image.src.childImageSharp.gatsbyImageData}
                                    className={classes.Icon}
                                    alt={interest.image.alt || `Interest ${interest.label}`}
                                />
                            )}{' '}
                            {interest.label}
                        </>
                    );
                })}
                {shouldShowButton && shownInterests < data.interests.length && (
                    <Button type={ButtonType.BUTTON} onClickHandler={loadMoreHandler} label={data.button.label} />
                )}
            </div>
        </Section>
    );
}
