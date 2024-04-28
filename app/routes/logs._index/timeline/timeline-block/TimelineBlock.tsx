import { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { Icon, links as iconLinks } from "~/components/icon/Icon";
import { IconNames } from "~/enums/icons";
import styles from './TimelineBlock.css?url';
import { useSearchParams } from "@remix-run/react";
import { useTimelineContext } from "../Timeline";
import { IFoodLogWithNestedFoods } from "~/api/modules/food-log/food-log.interfaces";
import { AddOrEditFoodLog, links as addEditButtonLinks } from "./AddOrEditFoodLog";
import Skeleton from "react-loading-skeleton";
import numToWords from 'number-to-words';
import { startCase } from "lodash-es";
import { DateTime } from "luxon";
import { TIMESTRING_FORMAT } from "~/utils/datetime";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...buttonLinks(),
    ...dividerLinks(),
    ...flexBoxLinks(),
    ...iconLinks(),
    ...textLinks(),
    ...addEditButtonLinks(),
];

interface TimelineBlockProps {
    times: string[];
    name: string;
}

const getDateAsTimestring = (date: Date | string) => {
    return DateTime.fromJSDate(new Date(date)).toLocal().toFormat(TIMESTRING_FORMAT);
}

export const TimelineBlock = ({ times, name }: TimelineBlockProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const nameParam = searchParams.get(name.toLowerCase());
    const [isExpanded, setIsExpanded] = useState(nameParam === 'true');
    const { userId, isLoading } = useTimelineContext();
    const actionText = isExpanded ? 'Collapse' : 'Expand';

    const toggleExpand = () => {
        const newVal = !isExpanded;
        setIsExpanded(newVal);
        setSearchParams(prev => {
            prev.set(name.toLowerCase(), String(newVal));
            return prev;
        }, {
            preventScrollReset: true,
        });
    }

    if (isLoading) {
        return (
            <Skeleton height={200} width="100%" />
        );
    }

    return (
        <div className="TimelineBlock">
            <FlexBox col gap="md" width="full">
                <FlexBox as="header" col gap="xs" width="full">
                    <FlexBox justify="between" align="center" gap="xs" width="full">
                        <Text size="xs" color="muted" uppercase weight="black">{name}</Text>
                        <Button
                            icon={isExpanded ? IconNames.ChevronUp : IconNames.ChevronDown}
                            variant='base'
                            size="xs"
                            iconSide='left'
                            color='muted'
                            iconColor='muted'
                            borderRadius="sm"
                            iconSize='sm'
                            onClick={toggleExpand}
                        >
                            <Text size="sm" color="muted">{actionText}</Text>
                        </Button>
                    </FlexBox>
                    <Divider />
                </FlexBox>
                <BlockContent
                    times={times}
                    userId={userId}
                    name={name}
                    isExpanded={isExpanded}
                    toggleExpand={toggleExpand}
                />
            </FlexBox>
        </div>
    );
}


interface BlockContentProps {
    times: string[];
    name: string;
    userId: string;
    isExpanded: boolean;
    toggleExpand: () => void;
}

// Component that shows content dependent on collapsed or expanded state
const BlockContent = ({ userId, times, name, isExpanded, toggleExpand }: BlockContentProps) => {
    if (isExpanded) {
        return (
            <ExpandedSection
                times={times}
                userId={userId}
            />
        );
    }
    return (
        <CollapsedSection
            name={name}
            times={times}
            onClick={toggleExpand}
        />
    );
}


interface CollapsedSectionProps {
    name: string;
    times: string[];
    onClick: () => void;
}

const CollapsedSection = ({ name, times, onClick }: CollapsedSectionProps) => {
    const { foodLogs } = useTimelineContext();
    const blockLogs = foodLogs.filter(log => {
        const hasFoodItems = Boolean(log.foods?.length);
        const loggedAtTimestring = getDateAsTimestring(log.loggedAt);
        return hasFoodItems && times.includes(loggedAtTimestring);
    });
    const countWords = numToWords.toWords(blockLogs.length);
    const mealText = blockLogs.length === 1 ? 'meal' : 'meals';
    return (
        <Button
            variant="muted"
            size="xl"
            width="full"
            borderRadius="md"
            onClick={onClick}
        >
            <FlexBox col gap="md">
                <FlexBox gap="md" align="center" justify="between" width="full">
                    <Text size="lg" color="primary">{`Add ${name} Meal or Snack`}</Text>
                    <Icon name={IconNames.Plus} size="md" color="primary" />
                </FlexBox>
                {Boolean(blockLogs?.length) && (
                    <Text
                        size="sm"
                        color="muted"
                    >
                        {`${startCase(countWords)} ${mealText} logged for the ${name.toLowerCase()}.`}
                    </Text>
                )}
            </FlexBox>
        </Button>
    );
}

interface ExpandedSectionProps {
    times: string[];
    userId: string;
}

const ExpandedSection = ({ userId, times }: ExpandedSectionProps) => {
    const { foodLogs } = useTimelineContext();

    const findFoodLogForTime = (time: string) => {
        const foodLog = foodLogs.find(log => {
            const loggedAtTimestring = getDateAsTimestring(log.loggedAt);
            return loggedAtTimestring === time;
        });
        return foodLog ?? null;
    }

    return (
        <FlexBox as="ul" col gap="lg" width="full">
            {times.map(time => (
                <AddOrEditFoodLog
                    key={time}
                    userId={userId}
                    time={time}
                    foodLog={findFoodLogForTime(time)}
                />
            ))}
        </FlexBox>
    );
}