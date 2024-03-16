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
import { useTimelineContext } from "../Timeline";
import { IFoodLogWithNestedFoods } from "~/api/modules/food-log/food-log.interfaces";
import { timeStringAsDateISO } from "~/utils/datetime";
import { startCase } from "lodash-es";

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
}

export const TimelineBlock = ({ times, name }: TimelineBlockProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { userId, foodLogs } = useTimelineContext();
    const actionText = isExpanded ? 'Collapse' : 'Expand';

    return (
        <div className="TimelineBlock">
            <FlexBox col gap="md" width="full">
                <FlexBox col gap="xs" width="full">
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
                            onClick={() => setIsExpanded(!isExpanded)}
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
                    setIsExpanded={setIsExpanded}
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
    setIsExpanded: (expanded: boolean) => void;
}

// Component that shows content dependent on collapsed or expanded state
const BlockContent = ({ times, foodLogs, userId, name, isExpanded, setIsExpanded }: BlockContentProps) => {
    if (isExpanded) {
        return <ExpandedSection times={times} foodLogs={foodLogs} userId={userId} />
    }
    return <CollapsedSection name={name} onClick={() => setIsExpanded(true)} />;
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
            <Text size="sm" color="primary" weight="bold">{`Add ${name} Meal or Snack`}</Text>
            <Icon name={IconNames.PlusIcon} size="sm" color="primary" />
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
        const foodLog = foodLogs.find(log => log.logTimeFormatted === time);
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


interface AddOrEditFoodLogProps {
    time: string;
    foodLog: IFoodLogWithNestedFoods | null;
}


// Displays a time-block with a button to add a food log 
// or a summary of a saved food log and a button to edit it
const AddOrEditFoodLog = ({ time, foodLog }: AddOrEditFoodLogProps) => {
    const submitter = useFetcher();
    const { userId } = useTimelineContext();

    if (foodLog) {
        let foodSummary = 'No foods added yet...';
        if (Boolean(foodLog.foods.length)) {
            const foodNames = foodLog.foods.map(food => startCase(food.name));
            foodSummary = foodNames.join(', ');
        }
        return (
            <Button
                variant="base"
                size="lg"
                borderRadius="md"
                name="EditFoodLog"
                href={`/logs/${foodLog.id}`}
                width="full"
            >
                <FlexBox as='li' key={time} gap="xl" align="center" justify="between" width="full">
                    <FlexBox col gap="sm" align="start" width="full">
                        <Text size="sm" color="muted">{time}</Text>
                        <Text customWidth="250px" align="left" size="sm" truncate>{foodSummary}</Text>
                    </FlexBox>
                    <FlexBox gap="md" align="center" justify="end" width="full">
                        <Text size="sm" color="primary" weight="bold">Edit Meal</Text>
                        <Icon name={IconNames.PencilIcon} size="sm" color="primary" />
                    </FlexBox>
                </FlexBox>
            </Button>
        );
    }

    return (
        <submitter.Form
            method={RequestMethods.POST}
            action={APIRoutes.FOOD_LOGS}
        >
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="logTime" value={timeStringAsDateISO(time)} />
            <Button
                variant="base"
                size="lg"
                borderRadius="md"
                name="AddFoodLog"
            >
                <FlexBox as='li' key={time} gap="xl" align="center" justify="between" width="full">
                    <FlexBox as="span" gap="md" align="center">
                        <div className="time-dot" />
                        <Text size="sm" color="muted">{time}</Text>
                    </FlexBox>
                    <FlexBox gap="md" align="center">
                        <Text size="sm" color="soft" weight="bold">Log Meal</Text>
                        <Icon name={IconNames.ChevronRight} size="sm" color="soft" />
                    </FlexBox>
                </FlexBox>
            </Button>
        </submitter.Form>
    );
}