import { Form } from "@remix-run/react";
import { startCase } from "lodash-es";
import Skeleton from "react-loading-skeleton";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { Repeater } from "~/components/repeater/Repeater";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import { APIRoutes } from "~/enums/routes";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
    ...dividerLinks(),
    ...buttonLinks(),
    ...flexBoxLinks(),
    ...textLinks(),
];

interface FoodLogItemsProps {
    logItems: IFoodLogItemWithFoodItem[];
    isLoading: boolean;
}

export const FoodLogItemList = ({ logItems, isLoading }: FoodLogItemsProps) => {
    const hasLogItems = Boolean(logItems?.length);
    if (!hasLogItems && !isLoading) {
        return <Text align="center">Your food logs will show up here...</Text>;
    }
    return (
        <FlexBox as="section" col gap="md" width="full" padBottom='1/3'>
            {logItems?.map((logItem, i) => (
                <FoodLogItem
                    key={logItem.id}
                    logItem={logItem}
                    isFirst={i === 0}
                />
            ))}
            {isLoading && (
                <Repeater count={6}>
                    {hasLogItems && <Divider />}
                    <FlexBox gap="md" width="full">
                        <Skeleton height="2rem" width="80px" />
                        <Skeleton height="2rem" width="100px" />
                        <Skeleton height="2rem" containerClassName="skeleton-flex-grow" />
                        <Skeleton height="2rem" width="60px" />
                    </FlexBox>
                </Repeater>
            )}
        </FlexBox>
    );
}

const FoodLogItem = ({ logItem, isFirst }: { logItem: IFoodLogItemWithFoodItem, isFirst: boolean; }) => {
    const quantity = logItem.quantity;
    const unit = logItem.unit.toLowerCase();
    const unitText = unit === 'none' ? '' : ` ${unit}`;
    const name = startCase(logItem.foodItem.name);
    const preparation = logItem.preparation.toLowerCase();

    return (
        <>
            {!isFirst && <Divider />}
            <FlexBox align="center" justify="between" width="full">
                <FlexBox gap="md" align="center">
                    <Text weight="bold" lineHeight="none">
                        {name}
                    </Text>
                    <Text>{` • `}</Text>
                    <Text lineHeight="none">
                        {quantity}{unitText}
                    </Text>
                    <Text>{` • `}</Text>
                    <Text lineHeight="none">
                        {preparation}
                    </Text>
                </FlexBox>

                <Form method={RequestMethods.DELETE} action={`${APIRoutes.FOOD_ITEM_LOGS}/${logItem.id}`} navigate={false}>
                    <input type="hidden" name="id" value={logItem.id} />
                    <Button
                        icon={IconNames.TrashIcon}
                        iconColor="destructive"
                        borderRadius="sm"
                        size="sm"
                        variant="muted"
                    />
                </Form>
            </FlexBox>
        </>
    );
}