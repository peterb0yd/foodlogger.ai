import { Form } from "@remix-run/react";
import { startCase } from "lodash-es";
import Skeleton from "react-loading-skeleton";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { Repeater } from "~/components/repeater/Repeater";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import { APIRoutes } from "~/enums/routes";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { List, links as listLinks } from "../list/List";
import { LinksFunction } from "@remix-run/node";
import { ITemplateWithNestedItems } from "~/api/modules/template/template.interfaces";
import { ITemplateFoodItem } from "~/api/modules/template-food-log-item/template-food-log-item.interfaces";

export const links: LinksFunction = () => [
    ...buttonLinks(),
    ...flexBoxLinks(),
    ...textLinks(),
    ...listLinks(),
];

interface FoodItemListProps {
    items: IFoodLogItemWithFoodItem[] | ITemplateWithNestedItems[];
    isLoading?: boolean;
    canDelete?: boolean;
}

export const FoodItemList = ({ items, isLoading, canDelete }: FoodItemListProps) => {
    const hasItems = Boolean(items?.length);
    if (!hasItems && !isLoading) {
        return <Text align="center" color="soft">Your food logs will show up here...</Text>;
    }
    return (
        <FlexBox col gap="sm" width="full">
            <List variant="spacious">
                {items?.map((item, i) => (
                    <FoodListItem
                        key={item.id}
                        item={item as IFoodLogItemWithFoodItem | ITemplateFoodItem}
                        isFirst={i === 0}
                        canDelete={canDelete}
                    />
                ))}
            </List>
            {isLoading && (
                <List variant="gap-tight" bg="none">
                    <Repeater count={3}>
                        <List.Item>
                            <FlexBox gap="md" width="full">
                                <Skeleton height="2rem" width="80px" />
                                <Skeleton height="2rem" width="100px" />
                                <Skeleton height="2rem" containerClassName="skeleton-flex-grow" />
                                <Skeleton height="2rem" width="60px" />
                            </FlexBox>
                        </List.Item>
                    </Repeater>
                </List>
            )}
        </FlexBox>
    );
}

interface FoodListItemProps {
    item: IFoodLogItemWithFoodItem | ITemplateFoodItem;
    isFirst: boolean;
    canDelete?: boolean;
}

const FoodListItem = ({ item, isFirst, canDelete }: FoodListItemProps) => {
    const quantity = item.quantity;
    const unit = item.unit.toLowerCase();
    const unitText = unit === 'none' ? '' : ` ${unit}`;
    const foodName = 'foodItem' in item ? item.foodItem?.name : item.name;
    const name = startCase(foodName);
    const preparation = item.preparation.toLowerCase();

    return (
        <>
            <List.Item padX="input">
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

                {canDelete && (
                    <Form method={RequestMethods.DELETE} action={`${APIRoutes.FOOD_ITEM_LOGS}/${item.id}`} navigate={false}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button
                            icon={IconNames.Trash}
                            iconColor="destructive"
                            borderRadius="sm"
                            size="sm"
                            variant="muted"
                        />
                    </Form>
                )}
            </List.Item >
        </>
    );
}