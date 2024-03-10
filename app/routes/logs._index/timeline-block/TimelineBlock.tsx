import { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { Icon, links as iconLinks } from "~/components/icon/Icon";
import { IconNames } from "~/enums/icons";
import styles from './TimelineBlock.css';
import { useFetcher } from "@remix-run/react";
import { RequestMethods } from "~/enums/requests";
import { APIRoutes } from "~/enums/routes";
import { DateTime } from "luxon";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...buttonLinks(),
    ...dividerLinks(),
    ...flexBoxLinks(),
    ...iconLinks(),
    ...textLinks(),
];

interface TimelineBlockProps {
    times: string[];
    name: string;
    userId: string;
}

export const TimelineBlock = ({ times, name, userId }: TimelineBlockProps) => {
    const submitter = useFetcher();
    const [isExpanded, setIsExpanded] = useState(false);
    let visibleTimes = isExpanded ? times : [times[0], times.at(-1)] as string[];

    const timeAsDate = (time: string) => {
        // Time is in "9:30 AM" format
        return DateTime.fromFormat(time, 'h:mm a').toISO() as string;
    }

    return (
        <div className="TimelineBlock">
            <FlexBox col gap="md" width="full">
                <FlexBox col gap="xs" width="full">
                    <FlexBox justify="between" align="center" width="full">
                        <Text size="xs" color="muted" uppercase weight="black">{name}</Text>
                        <Button
                            icon={isExpanded ? IconNames.CollapseVertical : IconNames.ExpandVertical}
                            variant='base'
                            size="xs"
                            iconSide='left'
                            color='muted'
                            iconColor='muted'
                            borderRadius="sm"
                            iconSize='xs'
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Collapse' : 'Expand'}
                        </Button>
                    </FlexBox>
                    <Divider />
                </FlexBox>
                <FlexBox as="ul" col gap="lg" width="full">
                    {visibleTimes.map(time => (
                        <submitter.Form
                            method={RequestMethods.POST}
                            action={APIRoutes.FOOD_LOGS}
                        >
                            <input type="hidden" name="userId" value={userId} />
                            <input type="hidden" name="logTime" value={timeAsDate(time)} />
                            <Button
                                variant="base"
                                size="lg"
                                borderRadius="md"
                            >
                                <FlexBox as='li' key={time} gap="xl" align="center" justify="between" width="full">
                                    <FlexBox as="span" gap="md" align="center">
                                        <div className="time-dot" />
                                        <Text size="sm" color="muted">{time}</Text>
                                    </FlexBox>
                                    <FlexBox gap="md" align="center">
                                        <Text size="sm" color="soft">Log Meal</Text>
                                        <Icon name={IconNames.PlusIcon} size="sm" color="soft" />
                                    </FlexBox>
                                </FlexBox>
                            </Button>
                        </submitter.Form>
                    ))}
                </FlexBox>
            </FlexBox>
        </div>
    );
}