

import { useFetcher } from "@remix-run/react";
import { startCase } from "lodash-es";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { Text, links as textLinks } from "~/components/text/Text";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Icon, links as iconLinks } from "~/components/icon/Icon";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import { APIRoutes } from "~/enums/routes";
import { timeStringAsIso } from "~/utils/datetime";
import { useTimelineContext } from "../Timeline";
import { IFoodLogWithNestedFoods } from "~/api/modules/food-log/food-log.interfaces";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
    ...buttonLinks(),
    ...textLinks(),
    ...flexboxLinks(),
    ...iconLinks(),
];

interface AddOrEditFoodLogProps {
    time: string;
    foodLog: IFoodLogWithNestedFoods | null;
}

// Displays a time-block with a button to add a food log 
// or a summary of a saved food log and a button to edit it
export const AddOrEditFoodLog = ({ time, foodLog }: AddOrEditFoodLogProps) => {
    const fetcher = useFetcher();
    const { userId } = useTimelineContext();

    // Edit an existing food log
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
                <LogContent
                    showEditContent={Boolean(foodLog.foods?.length)}
                    time={time}
                    foodSummary={foodSummary}
                />
            </Button>
        );
    }

    // Add a new food log
    return (
        <fetcher.Form
            method={RequestMethods.POST}
            action={APIRoutes.FOOD_LOGS}
        >
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="logTime" value={timeStringAsIso(time)} />
            <Button
                variant="base"
                size="lg"
                borderRadius="md"
                name="AddFoodLog"
            >
                <LogContent time={time} />
            </Button>
        </fetcher.Form>
    );
}

interface LogContentProps {
    showEditContent?: boolean;
    time: string;
    foodSummary?: string;
}

const LogContent = ({ showEditContent, time, foodSummary }: LogContentProps) => {
    if (showEditContent) {
        return <EditFoodLogContent time={time} foodSummary={foodSummary!} />;
    }
    return <AddFoodLogContent time={time} />;
}

// Default display when no food log is saved or no food items are added
const AddFoodLogContent = ({ time }: { time: string }) => (
    <FlexBox as='li' key={time} gap="xl" align="center" justify="between" width="full">
        <FlexBox as="span" gap="lg" align="center">
            <div className="time-dot" />
            <Text size="sm" color="muted">{time}</Text>
        </FlexBox>
        <FlexBox gap="md" align="center">
            <Text size="sm" color="soft" weight="bold">Log Meal</Text>
            <Icon name={IconNames.ChevronRight} size="sm" color="soft" />
        </FlexBox>
    </FlexBox>
)

// Display when a food log is saved and food items are added
const EditFoodLogContent = ({ time, foodSummary }: { time: string, foodSummary: string }) => (
    <FlexBox as='li' key={time} gap="sm" align="center" justify="between" width="full">
        <FlexBox col gap="sm" align="start" width="full">
            <Text size="sm" color="muted">{time}</Text>
            <Text width="full" align="left" size="sm" truncate>{foodSummary}</Text>
        </FlexBox>
        <FlexBox gap="md" align="center" justify="end" width="full">
            <Text size="sm" color="primary" weight="bold">Edit Meal</Text>
            <Icon name={IconNames.PencilIcon} size="sm" color="primary" />
        </FlexBox>
    </FlexBox>
)