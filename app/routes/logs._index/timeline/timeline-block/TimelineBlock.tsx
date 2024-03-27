import { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { Icon, links as iconLinks } from "~/components/icon/Icon";
import { IconNames } from "~/enums/icons";
import styles from './TimelineBlock.css';
import { useSearchParams } from "@remix-run/react";
import { useTimelineContext } from "../Timeline";
import { IFoodLogWithNestedFoods } from "~/api/modules/food-log/food-log.interfaces";
import { AddOrEditFoodLog, links as addEditButtonLinks } from "./AddOrEditFoodLog";
import Skeleton from "react-loading-skeleton";

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

export const TimelineBlock = ({ times, name }: TimelineBlockProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const nameParam = searchParams.get(name.toLowerCase());
    const [isExpanded, setIsExpanded] = useState(nameParam === 'true');
    const { userId, foodLogs, isLoading } = useTimelineContext();
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
                    foodLogs={foodLogs}
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
    foodLogs: IFoodLogWithNestedFoods[];
    userId: string;
    name: string;
    isExpanded: boolean;
    toggleExpand: () => void;
}

// Component that shows content dependent on collapsed or expanded state
const BlockContent = ({ times, foodLogs, userId, name, isExpanded, toggleExpand }: BlockContentProps) => {

    if (isExpanded) {
        return <ExpandedSection times={times} foodLogs={foodLogs} userId={userId} />
    }
    return <CollapsedSection name={name} onClick={toggleExpand} />;
}


interface AddFoodLogToBlockProps {
    name: string;
    onClick: () => void;
}

const CollapsedSection = ({ name, onClick }: AddFoodLogToBlockProps) => (
    <Button
        variant="muted"
        size="xl"
        width="full"
        borderRadius="md"
        onClick={onClick}
    >
        <FlexBox gap="md" align="center" justify="center" width="full">
            <Text size="lg" color="primary">{`Add ${name} Meal or Snack`}</Text>
            <Icon name={IconNames.PlusIcon} size="md" color="primary" />
        </FlexBox>
    </Button>
);

interface ExpandedSectionProps {
    times: string[];
    foodLogs: IFoodLogWithNestedFoods[];
    userId: string;
}

const ExpandedSection = ({ times, foodLogs, userId }: ExpandedSectionProps) => {

    const findFoodLogForTime = (time: string) => {
        const foodLog = foodLogs.find(log => log.loggedAtFormatted === time);
        return foodLog ?? null;
    }

    return (
        <FlexBox as="ul" col gap="lg" width="full">
            {times.map(time => (
                <AddOrEditFoodLog
                    key={time}
                    time={time}
                    foodLog={findFoodLogForTime(time)}
                />
            ))}
        </FlexBox>
    );
}